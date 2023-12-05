import express, { Router } from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay"
import shortid from "shortid";

import Volunteer from "./models/Volunteer.js";
import NGO from "./models/NGO.js";
import Events from "./models/Events.js";
import Donor from "./models/Donor.js";
import Transection from "./models/Transection.js";

const app = express()
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/ngosysdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {

    console.log("DB connected")
});

//for payment
const razorpay = new Razorpay({
	key_id: 'rzp_test_J2At7yvYLkugJD',
	key_secret: 'mR8Rv51H0bnKeKXeYkrhcb8b'
})

//payment api
app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 1000
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

// Endpoint to save a transaction
app.post('/savetransaction', async (req, res) => {
    try {
        // Create a new transaction object based on the request body
        const newTransaction = new Transection(req.body);

        // Save the transaction to the database
        await newTransaction.save();

        // Send a success response
        res.status(200).json({ message: 'Transaction saved successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error saving transaction:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/loginvol", async (req, res) => {
    console.log("logged in as a volunteer")
    const { email, passwd } = req.body
    const user = await Volunteer.findOne({ email: email })


    if (user) {
        const isMatch = await bcrypt.compare(passwd, user.passwd)
        if (isMatch) {
            const token = await user.generateAuthToken();
            console.log(user.email)
            const final = user._id
            res.send({ message: "Login Successful", token, user })
            //token,user
        } else {
            res.send({ message: "Password incorrect" })
        }
    } else {
        res.send({ message: "User not Registered. Please Register" })
    }

});

app.post("/logindon", async (req, res) => {
    console.log("logged in as a donor")
    const { email, passwd } = req.body
    const user = await Donor.findOne({ email: email })


    if (user) {
        const isMatch = await bcrypt.compare(passwd, user.passwd)
        if (isMatch) {
            const token = await user.generateAuthToken();
            console.log(user.email)
            const final = user._id
            res.send({ message: "Login Successful", token, user })
            //token,user
        } else {
            res.send({ message: "Password incorrect" })
        }
    } else {
        res.send({ message: "User not Registered. Please Register" })
    }

});


app.post("/loginngo", async (req, res) => {

    const { email, passwd } = req.body
    const user = await NGO.findOne({ email: email })

    if (user) {
        const isMatch = await bcrypt.compare(passwd, user.passwd)

        // console.log(token);

        if (isMatch) {
            const token = await user.generateAuthToken();
            res.send({ message: "Login Successful", token, user })
            // user:user
        } else {
            res.send({ message: "Password incorrect" })
        }
    } else {
        res.send({ message: "User not Registered. Please Register" })
    }

})


app.post("/registervol", (req, res) => {

    const { firstname, lastname, address, city, state, gender, pnumber, email, passwd } = req.body
    Volunteer.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered. Please use another Email Id." })
        } else {
            const volunteer = new Volunteer({
                firstname,
                lastname,
                address,
                city,
                state,
                gender,
                pnumber,
                email,
                passwd
            })

            volunteer.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered. Please login now." })
                }

            })
        }
    })
});

app.post("/registerdon", (req, res) => {

    const { firstname, lastname, address, city, state, gender, pnumber, email, passwd } = req.body
    Donor.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered. Please use another Email Id." })
        } else {
            const donor = new Donor({
                firstname,
                lastname,
                address,
                city,
                state,
                gender,
                pnumber,
                email,
                passwd
            })

            donor.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered. Please login now." })
                }

            })
        }
    })
});

app.post("/registerngo", (req, res) => {


    const { name, address, city, state, NGOID, pnumber, email, passwd } = req.body
    NGO.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered. Please use another Email Id." })
        } else {
            const ngo = new NGO({
                name,
                address,
                city,
                state,
                NGOID,
                pnumber,
                email,
                passwd
            })

            ngo.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered. Please login now." })
                }

            })
        }
    })
})

app.post("/updatengo", (req, res) => {
    console.log("visited")

    var oldngostatus = NGO.findById(req.params.id);
    NGO.findOneAndUpdate(req.params.id ,
        {
            name: req.body.name || oldngostatus.name,
            address: req.body.address || oldngostatus.address,
            city: req.body.city || oldngostatus.city,
            state: req.body.state || oldngostatus.state,
            NGOID: req.body.NGOID || oldngostatus.NGOID ,
            pnumber: req.body.pnumber || oldngostatus.pnumber,
            email: req.body.email || oldngostatus.email

        },
        { new: true },
        (err, user) => {
            // console.log(user)
            if (req.body.email != null && req.body.email.length > 0 && req.body.email)
                if (err) return res.json({ success: false, err });
            res.status(200).json({ user, message: "Ngo Details Updated Successfully." })
        }
    )

})

app.post("/updatevol", (req, res) => {
    console.log("visited")

    var oldvolstatus = Volunteer.findById(req.body.ID)
    Volunteer.findOneAndUpdate({ _id: req.body.ID },
        {
            firstname: req.body.firstname || oldvolstatus.firstname,
            lastname: req.body.lastname || oldvolstatus.lastname,
            address: req.body.address || oldvolstatus.address,
            city: req.body.city || oldvolstatus.city,
            state: req.body.state || oldvolstatus.state,
            pnumber: req.body.pnumber || oldvolstatus.pnumber,
            email: req.body.email || oldvolstatus.email

        },
        { new: true },
        (err, user) => {
            // console.log(user)
            if (req.body.email != null && req.body.email.length > 0 && req.body.email)
                if (err) return res.json({ success: false, err });
            res.status(200).json({ user, message: "Volunteer Details Updated Successfully. " })
        }
    )

})

app.post("/updatedon", (req, res) => {
    console.log("visited")

    var olddonstatus = Donor.findById(req.body.ID)
    Donor.findOneAndUpdate({ _id: req.body.ID },
        {
            firstname: req.body.firstname || olddonstatus.firstname,
            lastname: req.body.lastname || olddonstatus.lastname,
            address: req.body.address || olddonstatus.address,
            city: req.body.city || olddonstatus.city,
            state: req.body.state || olddonstatus.state,
            pnumber: req.body.pnumber || olddonstatus.pnumber,
            email: req.body.email || oldvolstatus.email

        },
        { new: true },
        (err, user) => {
            // console.log(user)
            if (req.body.email != null && req.body.email.length > 0 && req.body.email)
                if (err) return res.json({ success: false, err });
            res.status(200).json({ user, message: "Donor Details Updated Successfully. " })
        }
    )

})

app.post("/addevents", (req, res) => {

    // console.log(req.body.D)
    const { name, organizer, ngoid, edate, etime, address, city, state, category, contact, email, description, Image } = JSON.parse(req.body.Data)


    const events = new Events({
        name,
        organizer,
        ngoid,
        edate,
        etime,
        address,
        city,
        state,
        category,
        contact,
        email,
        description,
        images: Image,
    })

    events.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "Event added successfully." })
        }

    })

})



//post event api for data of events in landingpage
app.post("/events", (req, res) => {

    let event = req.body.event ? req.body.event : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    let term = req.body.Searchterms;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    console.log(term);


    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            findArgs[key] = req.body.filters[key];

            console.log(findArgs)
        }
    }

    if (term) {
        Events
            .find(
                {
                    $and: [findArgs, { edate: { $gt: today.toISOString() } }, {
                        $or:
                            [{ name: { $regex: term } }, { city: { $regex: term } }, { category: { $regex: term } }, { state: { $regex: term } }, { organizer: { $regex: term } }]
                    }
                    ]
                }
            )
            .populate("organizer")
            .sort([[sortBy, event]])
            .skip(skip)
            .limit(limit)
            .exec((err, events) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, events, Postsize: events.length })
            })
    } else {
        Events
            .find({ $and: [findArgs, { edate: { $gt: today.toISOString() } }] })
            // .find({ edate: { $gt: today.toISOString() } })
            .populate("organizer")
            .sort([[sortBy, event]])
            .skip(skip)
            .limit(limit)
            .exec((err, events) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, events, Postsize: events.length })
            })
    }

});



//?id=${eventID}&type=single
//for sending data of perticular event for event details page
app.get("/events/events_by_id", (req, res) => {
    let type = req.query.type

    let eventId = req.query.id


    if (type === "array") {


    }

    Events.find({ '_id': { $in: eventId } })
        .populate('organizer')
        .exec((err, event) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(event);
        })


});

//used to create registered events page display
app.post("/events/revents_by_id", (req, res) => {
    let type = req.query.type

    let eventId = req.query.id


    if (type === "array") {
        let ids = req.query.id.split(',');
        eventId = []
        eventId = ids.map(item => {
            return item
        })

    }

    Events.find({ '_id': { $in: eventId } })
        .populate('organizer')
        .exec((err, event) => {
            if (err) return req.status(400).send(err);
            return res.status(200).json({ event, Postsize: event.length });
        })


});


//Used to create registered events
app.post("/addToCart/:id/:id1", (req, res) => {

    //Volunteer.findById("621f88c1c54ccf79d12d76b6")
    Volunteer.findById(req.params.id1).then(
        (user) => {
            // console.log(userInfo.email)
            Events.findById(req.params.id)
            let duplicate = false;
            user.cart.forEach((cartInfo) => {

                if (cartInfo.id == req.params.id) {
                    duplicate = true;
                }

            })
            if (duplicate) {
                res.send({ user, message: "Already registered for this event." })
            } else {
                Volunteer.findOneAndUpdate({ _id: req.params.id1 },
                    {
                        $push: {
                            cart: {
                                id: req.params.id,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, user) => {
                        // console.log(user)
                        if (err) return res.json({ success: false, err });
                        Events.findOneAndUpdate({ _id: req.params.id },
                            {
                                $push: {
                                    participants: {
                                        id: req.params.id1,
                                        firstname: req.body.firstname,
                                        lastname: req.body.lastname,
                                        email: req.body.email,
                                        pnumber: req.body.pnumber,
                                        date: Date.now()
                                    }
                                }
                            },
                            { new: true },
                            (err, user1) => {
                                // console.log(user)
                                if (err) return res.json({ success: false, err });


                                res.status(200).json({ user, message: "Successfully Registered." })
                            }
                        )
                    }

                )


            }

        })

})

// Remove Reg Event 
app.post("/removeregevent/:eid/:volid", (req, res) => {

    Volunteer.findById(req.params.volid).then(
        (userInfo) => {
            Volunteer.findOneAndUpdate(
                { _id: req.params.volid },
                {
                    "$pull":
                        { "cart": { "id": req.params.eid } }
                },
                { new: true },
                (err, user) => {
                    let cart = user.cart;
                    let array = cart.map(item => {
                        return item.id
                    })
                    Events.findOneAndUpdate(
                        { _id: req.params.eid },
                        {
                            "$pull":
                                { "participants": { "id": req.params.volid } }
                        },
                        { new: true },

                        (err, user1) => {
                            // console.log(user)
                            if (err) return res.json({ success: false, err });


                            Events.find({ '_id': { $in: array } })
                                .populate('organizer')
                                .exec((err, cart) => {
                                    return res.status(200).json({ user, cart, message: "Registration canceled successfully, please reload. " })
                                })
                        })
                }
            )

        })
})

//update event api

app.post("/updateevents", (req, res) => {
    console.log("visited")

    const { id, name, organizer, edate, etime, address, city, state, category, contact, email, description, Image } = JSON.parse(req.body.Data)
    // console.log(name)
    // console.log(id)
    // console.log(description)
    var oldeventstatus = Events.findById(id)
    // console.log(oldeventstatus.images)
    Events.findOneAndUpdate({ _id: id },
        {
            name: name || oldeventstatus.name,
            organizer: organizer || oldeventstatus.organizer,
            edate: edate || oldeventstatus.edate,
            etime: etime || oldeventstatus.etime,
            address: address || oldeventstatus.address,
            city: city || oldeventstatus.city,
            state: state || oldeventstatus.state,
            category: category || oldeventstatus.category,
            contact: contact || oldeventstatus.contact,
            email: email || oldeventstatus.email,
            description: description || oldeventstatus.description,
            images: Image || oldeventstatus.images

        },
        { new: true },
        (err, user) => {
            // console.log(user
            if (err) return res.json({ success: false, err });
            res.status(200).json({ user, message: "Event details Updated Successfully." })
        }
    )

})

//Used to display events of NGO on their page

app.get("/ngoevents/:ngoid", (req, res) => {


    Events.find({ ngoid: req.params.ngoid })
        .populate("organizer")
        .exec((err, event) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, event, Postsize: event.length })
        })
    Events.find({ ngoid: req.params.ngoid })
        .then
});

//Adding Feedback to the feedback array in Events 
app.post("/addToFeedback/:eventid/:userid", (req, res) => {
    // console.log("Hello")

    Events.findById(req.params.eventid).then(
        (event) => {


            Events.findOneAndUpdate({ _id: req.params.eventid },
                {
                    $push: {
                        feedback: {
                            id: req.params.userid,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            rate: req.body.rate,
                            message: req.body.feedback,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, event) => {
                    // console.log(event)
                    if (err) return res.json({ success: false, err });
                    res.status(200).json({ event, message: "Feedback Submitted Successfully." })
                }
            )
        }

    )

})

//Removing Feedback from the Feedback array
app.post("/removefeedback/:eventId", (req, res) => {

    Events.findById(req.params.eventId).then(
        (userInfo) => {
            Events.findOneAndUpdate(
                { _id: req.params.eventId },
                {
                    "$pull":
                        { "feedback": { "id": req.body.id, "date": req.body.date, "message": req.body.message } }
                },
                { new: true },
                (err, user) => {
                    let feedback = user.feedback;
                    let array = feedback.map(item => {
                        return item.id
                    })
                    Events.find({ 'id': { $in: array } })
                        .populate('organizer')
                        .exec((err, feedback) => {
                            return res.status(200).json({ user, feedback, mess: "Feedback Removed Successfully, please refresh to view the changes." })
                        })
                }
            )

        })
})

//Suggestion form api
app.post("/addToSuggestion/:eventid/:userid", (req, res) => {
    // console.log("Hello")

    Events.findById(req.params.eventid).then(
        (event) => {

            Events.findOneAndUpdate({ _id: req.params.eventid },
                {
                    $push: {
                        suggestion: {
                            id: req.params.userid,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            suggestion: req.body.suggestion,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, event) => {
                    // console.log(event)
                    if (err) return res.json({ success: false, err });
                    res.status(200).json({ event, message: "Suggestion Submitted Successfully. " })
                }
            )
        }

    )

})

//to display list of ngo for the donor
app.get('/getallngo',async (req, res) => {
    try {
      const ngo = await NGO.find();
      res.json(ngo);
      //res.json(req.user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  });

// Endpoint to retrieve all transactions for a specific NGO
app.get('/transactions/:ngoID', async (req, res) => {
    const ID = req.params.ngoID;

    try {
        // Find all transactions for the specified NGO ID
        const transactions = await Transection.find({ ngoid: ID }).populate('donorid').populate('ngoid');
        //console.log(transactions);

        // Send the transactions as a response
        res.json(transactions);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error retrieving transactions:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/transactions', async (req, res) => {
    const { ngoID, donorID, amount, date, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  
    try {
      // Create a new transaction object
      const transaction = new Transection({
        ngoid: ngoID,
        donorid: donorID,
        amount,
        date,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      });
  
      // Save the transaction to the database
      await transaction.save();
  
      // Send a success response
      res.status(201).json({ message: 'Transaction successfully inserted' });
    } catch (error) {
      // Handle errors and send an error response
      console.error('Error inserting transaction:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Endpoint to retrieve all transactions for a specific NGO
app.get('/transactionsdon/:donID', async (req, res) => {
    const ID = req.params.donID;

    try {
        // Find all transactions for the specified NGO ID
        const transactions = await Transection.find({ donorid: ID }).populate('donorid').populate('ngoid');
        //console.log(transactions);

        // Send the transactions as a response
        res.json(transactions);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error retrieving transactions:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/getdonor/:id", async (req, res) => {
    try {
      const donorId = req.params.id;
      const donor = await Donor.findById(donorId);
  
      if (!donor) {
        return res.status(404).json({ message: "Donor not found" });
      }
  
      // You can adjust the response structure based on your needs
      const donorData = {
        firstname: donor.firstname,
        lastname: donor.lastname,
        address: donor.address,
        city: donor.city,
        state: donor.state,
        pnumber: donor.pnumber,
        email: donor.email,
      };
  
      res.json(donorData);
    } catch (error) {
      console.error("Error fetching donor data:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/getvol/:id", async (req, res) => {
    try {
      const volID = req.params.id;
      const vol = await Volunteer.findById(volID);
  
      if (!vol) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
  
      // You can adjust the response structure based on your needs
      const volData = {
        firstname: vol.firstname,
        lastname: vol.lastname,
        address: vol.address,
        city: vol.city,
        state: vol.state,
        pnumber: vol.pnumber,
        email: vol.email,
      };
  
      res.json(volData);
    } catch (error) {
      console.error("Error fetching Volunteer data:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/getngo/:id", async (req, res) => {
    try {
      const ngoId = req.params.id;
      const ngo = await NGO.findById(ngoId);
  
      if (!ngo) {
        return res.status(404).json({ message: "NGO not found" });
      }
  
      // You can adjust the response structure based on your needs
      const ngoData = {
            name: ngo.name,
            address: ngo.address,
            city: ngo.city,
            state: ngo.state,
            NGOID: ngo.NGOID,
            pnumber: ngo.pnumber,
            email: ngo.email,
      };
  
      res.json(ngoData);
    } catch (error) {
      console.error("Error fetching NGO data:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

app.listen(9002, () => {
    console.log("Started at 9002 port")
});