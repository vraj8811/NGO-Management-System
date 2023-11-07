
import React, { useState, useEffect } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbarvol/navbar";
import Footer from "../footer/footer2/footer2";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Registeredevents = () => {
    const history = useHistory();
    const [Event, setEvent] = useState([])
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const [LessEvent, setLessEvent] = useState([])
    // console.log(user.user._id)
    useEffect(() => {

        let cartItems = [];
        if (user.user && user.user.cart) {
            if (user.user.cart.length > 0) {
                user.user.cart.forEach(item => {
                    cartItems.push(item.id)
                });

                axios.post(`http://localhost:9002/events/revents_by_id?id=${cartItems}&type=array`).then(res => {


                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);

                    var oldevents = [];
                    var newevents = [];
                    let i = 0;
                    for (i = 0; i < res.data.event.length; i++) {
                        if (res.data.event[i].edate < today.toISOString()) {
                            oldevents.push(res.data.event[i]);
                        }
                        else {
                            newevents.push(res.data.event[i]);
                        }

                    }
                    setLessEvent(oldevents);
                    setEvent(newevents);

                })

            }
        }

    }, [user.user])


    const removeEvent = (id) => {
        console.log(user.user._id)
        console.log(id);
        axios.post(`http://localhost:9002/removeregevent/${id}/${user.user._id}`)
            .then(res => {
                localStorage.setItem("currentUser", JSON.stringify(res.data));


                console.log(res.data.user.cart)
                if (res.data.user.cart.length === 0) {
                    window.location.reload();
                    // console.log(Event)
                }

            })
    }

    return (

        <div className="registeredevents">
            <Navbar />
            <br />
            <br />
            <h1 style={{ display: 'flex', justifyContent: 'center', textDecoration: 'underline' }}>List of Events:</h1>
            <h2 style={{ display: 'flex', justifyContent: 'center', textDecoration: 'underline' }}>Here are your upcoming events:</h2>
            <div style={{ width: '90%', marginLeft: '3rem ', marginRight: '3rem ' }}>


                <div className="row">
                    {
                        Event.map(event =>

                            <div class="col-3 mx-auto ">

                                <Card
                                    style={{
                                        width: 320,
                                        height: 320,
                                        backgroundColor: "",

                                        boxShadow: '0px 0px 10px 5px rgb(123, 255, 211)'
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 14, display: 'flex', justifyContent: 'center' }}
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            <img src={event.images} alt={event.images} class="rounded" style={{ height: '100px' }}></img>

                                        </Typography>
                                        <Typography variant="h6" component="h2">
                                            Name: {event.name}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                        >
                                            Date: {event.edate.substr(0, 10)}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            NGO Name: {event.organizer}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                        >
                                            City: {event.city}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <button className="btn btn-outline-danger" onClick={() => removeEvent(event._id)} >cancel</button>
                                        <a href={`/Event/${event._id}`}><button className="btn btn-outline-info" style={{ marginLeft: '20px' }} >More</button></a>

                                    </CardActions>
                                </Card>
                                <br />
                                <br />

                            </div>
                        )}
                </div>
            </div >





            <h2 style={{ display: 'flex', justifyContent: 'center', textDecoration: 'underline' }}>Here are your previous events:</h2>

            <div style={{ width: '90%', marginLeft: '3rem ', marginRight: '3rem ' }}>
                <div className="row">
                    {
                        LessEvent.map(event =>

                            <div class="col-3 mx-auto ">
                                <Card
                                    style={{
                                        width: 320,
                                        height: 320,
                                        backgroundColor: "",

                                        boxShadow: '0px 0px 10px 5px rgb(123, 255, 211)'
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 14, display: 'flex', justifyContent: 'center' }}
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            <img src={event.images} alt={event.images} class="rounded" style={{ height: '100px' }}></img>

                                        </Typography>
                                        <Typography variant="h6" component="h2">
                                            Name: {event.name}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                        >
                                            Date: {event.edate.substr(0, 10)}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            NGO Name: {event.organizer}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                        >
                                            City: {event.city}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <button className="btn btn-outline-danger" onClick={() => removeEvent(event._id)} >cancel</button>
                                        <a href={`/Event/${event._id}`}><button className="btn btn-outline-info" style={{ marginLeft: '20px' }} >More</button></a>

                                    </CardActions>
                                </Card>
                                <br />
                                <br />

                            </div>
                        )}
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Registeredevents