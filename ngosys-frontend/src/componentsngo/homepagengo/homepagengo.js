import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepagengo.css"
import { useHistory } from "react-router-dom";
import img1 from "../../firstpage/images/output-onlinepngtools.png"
import Footer from "../../commoncomponent/footer/footer2/footer2";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const user = JSON.parse(localStorage.getItem("currentUser"))

const Homepagengo = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    // console.log(user.user.NGOID)
    const [Event, setEvent] = useState([])
    const [LessEvent, setLessEvent] = useState([])
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRegUser");
        history.push("/loginngo")
    }



    useEffect(() => {


        //
        axios.post(`http://localhost:9002/ngoevents/${user.user.NGOID}`).then(res => {

            setEvent(res.data.event)
            console.log(res.data.event)
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


    }, [])




    return (
        <div className="homepagengo" >

            <div class="mainheadervol">
                <div class="logo">
                <a href="/"><img src={img1} alt="logo"></img></a>
                </div>

                <nav>
                    <a href="/homepagengo">Home</a>
                    <a href="/contactus">Contact</a>
                    <a onClick={() => history.push("/updatengo")} style={{ cursor: "pointer" }}>Update Profile</a>
                    <a onClick={() => history.push("/addevents")} style={{ cursor: "pointer" }}>Add Event</a>
                    <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                </nav>
            </div>
            <div style={{ width: '90%', margin: '3rem auto' }}>

                <h1 style={{ display: 'flex', justifyContent: 'center' }}>Welcome, {user.user.name}!!!</h1>
                <br />
                <h1 style={{ display: 'flex', justifyContent: 'center', textDecoration: 'underline' }}>Here are your Upcoming events</h1>
                <br />

                <div className="row" >
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
                                            Organizer Name: {event.organizer}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                        >
                                            City: {event.city}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <a href={`/Eventngo/${event._id}`}><button className="btn btn-outline-info" >More</button></a>
                                    </CardActions>
                                </Card>
                                <br />
                                <br />

                            </div>


                        )}
                </div>


                <br />
                <h1 style={{ display: 'flex', justifyContent: 'center', textDecoration: 'underline' }}>Here are your Previous events</h1>
                <br />
                <br />
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
                                        <a href={`/Eventngo/${event._id}`}><button className="btn btn-outline-info" >More</button></a>
                                    </CardActions>
                                </Card>
                                <br />
                                <br />

                            </div>
                        )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepagengo