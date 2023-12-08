
import React, { useState, useEffect } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbarvol/navbar";
import "./registeredevents.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
            <div className="container my-5 p-4">
                <div className="upFlex">
                <h2 style={{fontWeight: 'bold', margin: '1% 2%'}}>Upcoming Events</h2>
                <table className="table" style={{margin: '1% 0'}}>
                            <thead className="thead table-dark">
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Organizer</th>
                                    <th>Date</th>
                                    <th>City</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                        {
                        Event.map(event =>
                                <tr>
                                    <td><img src={event.images} alt={event.images} class="rounded" style={{ height: '80px', width: '100px'}}></img></td>
                                    <td><p style={{fontSize: '18px'}} className="py-3">{event.name}</p></td>
                                    <td><p style={{fontSize: '18px'}} className="py-3">{event.organizer}</p></td>
                                    <td><p style={{fontSize: '18px'}} className="py-3">{event.edate.substr(0, 10)}</p></td>
                                    <td><p style={{fontSize: '18px'}} className="py-3">{event.city}</p></td>
                                    <td style={{padding: '2.75% 0%'}}><button className="btn-outline-danger px-2 py-1" style={{color: 'red', background: 'none', borderRadius: '10%', border: '2px solid'}} onClick={() => removeEvent(event._id)} >Cancel</button><a href={`/Event/${event._id}`}><button className="btn-outline-info px-2 py-1" style={{background: 'none', borderRadius: '10%', marginLeft: '5%', border: '2px solid #4262ff', color: '#4262ff'}} >More</button></a></td>
                                </tr>
                            )}
                        </tbody>
                </table>

                </div>

                <div className="upFlex">
                    <h2 style={{fontWeight: 'bold', marginLeft: '2%', marginRight: '2%', marginTop: '3%', marginBottom: '1%'}}>Previous Events</h2>
                    <table className="table" style={{margin: '1% 0'}}>
                            <thead className="thead table-dark">
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Organizer</th>
                                    <th>Date</th>
                                    <th>City</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                        {
                        LessEvent.map(event =>
                                <tr>
                                    <td><img src={event.images} alt={event.images} class="rounded" style={{ height: '80px', width: '100px' }}></img></td>
                                    <td><p style={{fontSize: '18px'}} className="py-3">{event.name}</p></td>
                                    <td><p style={{fontSize: '18px'}} className="py-3">{event.organizer}</p></td>
                                    <td><p style={{fontSize: '18px'}} className="py-3">{event.edate.substr(0, 10)}</p></td>
                                    <td><p style={{fontSize: '18px'}} className="py-3">{event.city}</p></td>
                                    <td style={{padding: '2.75% 0%'}}><a href={`/Event/${event._id}`}><button className="btn-outline-info px-2 py-1" style={{background: 'none', borderRadius: '10%', marginLeft: '5%', border: '2px solid #4262ff', color: '#4262ff'}} >More</button></a></td>
                                </tr>
                            )}
                        </tbody>
                </table>
                </div>
            </div>
        </div>

    )
}

export default Registeredevents