import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Navbar from '../../commoncomponent/navbarngo/navbar';
import { useParams } from 'react-router-dom';
import "./eventdetailsngo.css"
import Footer from '../../commoncomponent/footer/footer2/footer2';
import Googlemap from '../../commoncomponent/Googlemap/googlemap';

const Detaileventngo = () => {
    const history = useHistory();
    const { eventId } = useParams();
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [Participants, setParticipants] = useState([])
    const [Event, setEvent] = useState([])
    const [Feed, setFeed] = useState([])
    const [Suggest, setSuggest] = useState([])
    let event_Id = JSON.parse(sessionStorage.getItem("eventdetails_id"));


    useEffect(() => {
        // console.log(user.user._id);


        axios.get(`http://localhost:9002/events/events_by_id?id=${eventId}&type=single`)
            .then(res => {
                localStorage.setItem("currentEvent", JSON.stringify(res.data[0]))
                setEvent(res.data[0])

                var feed = []
                let i = 0;
                for (i = 0; i < res.data[0].feedback.length; i++) {
                    feed.push(res.data[0].feedback[i])
                }
                setFeed(feed);
                var parti = []
                for (i = 0; i < res.data[0].participants.length; i++) {
                    parti.push(res.data[0].participants[i])
                }
                setParticipants(parti)

                var suggest = []
                for (i = 0; i < res.data[0].suggestion.length; i++) {
                    suggest.push(res.data[0].suggestion[i])
                }

                console.log(suggest)
                setSuggest(suggest)
            })

    }, [])

    const removeEvent = (id) => {

        axios.post(`http://localhost:9002/removefeedback/${eventId}`, id)
            .then(res => { window.location.reload(); })

    }
    const updateEvent = () => {
        const eventdata = localStorage.getItem("currentEvent")
        //    console.log(eventdata)
        history.push("/updateevent")
    }

    const updatebutton = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        if (Event.edate > today.toISOString()) {
            return (
                <>
                    <br />
                    <button className="btn btn-outline-warning" onClick={updateEvent} >Update Event</button>
                </>
            )
        }
    }

    return (
        <>
            <Navbar />
            <div >

                <br />
                <h1 style={{ display: 'flex', justifycontent: 'center' }}>{Event.name}</h1>
                <br />
                <div style={{ display: 'flex', justifycontent: 'center', color: 'brown' }}>
                    <div style={{ marginRight: '100px' }}>
                        <img src={Event.images} alt={Event.images} style={{ height: '200px', borderRadius: '10px' }}></img><br />
                    </div>
                    <div >
                        <label style={{ paddingBottom: '10px' }}>Event Name : {Event.name} </label><br />
                        <label style={{ paddingBottom: '10px' }}>Event organizer : {Event.organizer} </label><br />
                        <label style={{ paddingBottom: '10px' }}>Event category : {Event.category} </label><br />
                        <label style={{ paddingBottom: '10px' }}>Date : {Event.edate}</label><br />
                        <label style={{ paddingBottom: '10px' }}>Time : {Event.etime} </label><br />
                        <label style={{ paddingBottom: '10px' }}>Address : {Event.address} ,{Event.city}, {Event.state} </label><br />
                        <label style={{ paddingBottom: '10px' }}>NGO's Email ID : {Event.email} </label><br />
                        <label style={{ paddingBottom: '10px' }}>NGO's Contact No. : {Event.contact} </label><br />
                        <label style={{ width: "400px", paddingBottom: '10px' }}>Description : {Event.description} </label><br />

                        {updatebutton()}
                        <br />
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <Googlemap />
                    </div>
                </div>

                <h3>Suggestions:</h3>
                <table className="table ">
                    <tr className="tableheader">
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Suggestion</th>


                    </tr>
                    {
                        Suggest.map(suggest =>
                            <tbody className="tablebody">
                                <tr >
                                    <td>{suggest.firstname}</td>
                                    <td>{suggest.lastname}</td>
                                    <td style={{ maxWidth: '300px' }}>{suggest.suggestion}</td>
                                </tr>
                            </tbody>
                        )}
                </table>
                <br></br>


                <h3>Feedbacks:</h3>
                <table className="table ">
                    <tr className="tableheader">
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Feedback</th>
                        <th scope="col">Remove</th>

                    </tr>
                    {
                        Feed.map(feed =>
                            <tbody className="tablebody">
                                <tr >
                                    <td>{feed.firstname}</td>
                                    <td>{feed.lastname}</td>
                                    <td>{feed.rate}</td>
                                    <td style={{ maxWidth: '500px' }}>{feed.message}</td>
                                    <td><button className="btn btn-outline-danger" onClick={() => removeEvent(feed)} >Remove</button></td>
                                </tr>
                            </tbody>
                        )}
                </table>
                <br></br>

                <h3>List of Registered Participants:</h3>
                <table className="table ">
                    <tr className="tableheader">
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email-Id</th>
                        <th scope="col">Phone Number</th>

                        {/* <th scope="col">For more details</th> */}


                    </tr>
                    {
                        Participants.map(parti =>
                            <tbody className="tablebody">
                                <tr >
                                    <td>{parti.firstname}</td>
                                    <td>{parti.lastname}</td>
                                    <td>{parti.email}</td>
                                    <td style={{ maxWidth: '500px' }}>{parti.pnumber}</td>
                                </tr>
                            </tbody>
                        )}
                </table>
                <br />
            </div>
            <Footer />
        </>
    );
};

export default Detaileventngo;