import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepagengo.css"
import { useHistory } from "react-router-dom";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
        history.push("/")
    }



    useEffect(() => {


        const fetcheventData = async () => {
            try {
                axios.get(`http://localhost:9002/ngoevents/${user.user.NGOID}`).then(res => {

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
            }
            catch (error) {
                console.error("Error fetching event data:", error.message);
            }
        };
        fetcheventData();
    }, [])




    return (
        <div className="homepagengo" >
            <div class="mainheaderngo">
                <nav>
                    <a href="/homepagengo" className="navLink">Home</a>
                    <a onClick={() => history.push("/addevents")} className="navLink">Add Event</a>
                    <a onClick={() => history.push("/transection")} className="navLink">Fund Donation</a>
                    <a onClick={() => history.push("/updatengo")} className="navLink">Update Profile</a>
                    <button className="navLink" onClick={logout} style={{background: 'none', border: '0'}}>Logout</button>
                </nav>
            </div>
            <div style={{ width: '90%', margin: '3rem auto' }}>
                <h1 style={{ display: 'flex', justifyContent: 'center', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sansSerif", fontWeight: 600 }}>Upcoming Events</h1>
                <div className="row" >
                    {
                        Event.map(event =>
                            <div class="col-3">
                                <Card
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: "",
                                        boxShadow: '0px 0px 6px 1px #4262ff'
                                    }}
                                >
                                    <CardContent style={{ paddingBottom: '0%' }}>
                                        <Typography
                                            style={{ fontSize: 14, display: 'flex', justifyContent: 'center', marginBottom: '3%' }}
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            <img src={event.images} alt={event.images} class="rounded" style={{ height: '100px' }}></img>

                                        </Typography>
                                        <Typography variant="h6" component="h2" style={{ marginBottom: '3%', marginTop: '7%', alignContent: 'center', display: 'flex' }}>
                                        {event.name}
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
                                    <CardActions style={{ paddingBottom: '3%' }}>
                                        <a href={`/Eventngo/${event._id}`}><button className="btn">More</button></a>
                                    </CardActions>
                                </Card>
                                <br/>
                            </div>
                        )}
                </div>
                <h1 style={{ display: 'flex', justifyContent: 'center', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sansSerif", fontWeight: 600}}>Previous Events</h1>
                <div className="row" style={{marginTop: '0%'}}>
                    {
                        LessEvent.map(event =>

                            <div class="col-3">
                                <Card
                                    style={{
                                        width: '300px',
                                        height: '100%',
                                        backgroundColor: "",
                                        boxShadow: '0px 0px 6px 1px #4262ff'
                                    }}
                                >
                                    <CardContent style={{ paddingBottom: '0%' }}>
                                        <Typography
                                            style={{ fontSize: 14, display: 'flex', justifyContent: 'center', marginBottom: '3%' }}
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            <img src={event.images} alt={event.images} class="rounded" style={{ height: '100px' }}></img>

                                        </Typography>
                                        <Typography variant="h6" component="h2" style={{ marginBottom: '3%', marginTop: '7%', alignContent: 'center', display: 'flex' }}>
                                        {event.name}
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
                                    <CardActions style={{ paddingBottom: '3%' }}>
                                        <a href={`/Eventngo/${event._id}`}><button className="btn" >More</button></a>
                                    </CardActions>
                                </Card>
                                <br/>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Homepagengo