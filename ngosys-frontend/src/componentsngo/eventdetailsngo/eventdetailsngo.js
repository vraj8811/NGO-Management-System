import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Navbar from '../../commoncomponent/navbarngo/navbar';
import { useParams } from 'react-router-dom';
import "./eventdetailsngo.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
                    <button className="btn mb-4" onClick={updateEvent} >Update Event</button>
                </>
            )
        }
    }

    function formatDate(date){
        const createdDate = new Date(date);
        let d = createdDate.getDate();
        let m = createdDate.getMonth()+1;
        let y = createdDate.getFullYear();
        return d+'/'+m+'/'+y;
    }

    return (
        <>
            <div className="mainDivED">
            <Navbar />
                <div className="container edetails my-5" style={{boxShadow: "0px 0px 6px 2px #4262ff"}}>
                <h1 style={{marginBottom: '1%', fontWeight: 'bold'}}>{Event.name}</h1>
                    <div style={{marginBottom: '2%'}}>
                        <img src={Event.images} alt={Event.images} style={{ height: '250px', borderRadius: '200px', width: '250px' }}></img><br />
                    </div>
                    <div className="innerF">
                        <label><b>Event organizer:</b> {Event.organizer} </label>
                        <label><b>Event category:</b> {Event.category} </label>
                        <label><b>Date & Time:</b> {formatDate(Event.edate)} {Event.etime} </label>
                        <label><b>Address:</b> {Event.address} ,{Event.city}, {Event.state} </label>
                        <label><b>NGO's Contact Info.:</b> {Event.email}<br/>{Event.contact}</label>
                        <label><b>Description:</b> {Event.description} </label>
                    </div>
                    {updatebutton()}
                </div>

                <div className="container my-3 suggesBox">
                <h3 style={{fontWeight: "bold", marginTop:"2%"}}>Suggestions</h3>
                <div className="row suggesRow" style={{marginTop: '0.5%'}}>
                {
                        Suggest.map(suggest =>
                            <div className="col-4 suggesCard">
                                <Card
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: "",
                                        boxShadow: '0px 0px 6px 1px #4262ff'
                                    }}
                                >
                                    <CardContent style={{ paddingBottom: '0%', textAlign: 'center'}}>
                                        <Typography
                                            color="textSecondary"
                                        >
                                            {suggest.suggestion}
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{ paddingBottom: '3%'}}>
                                        <h6>- {suggest.firstname} {suggest.lastname}</h6>
                                    </CardActions>
                                </Card>
                                <br/>
                            </div>
                        )}
                </div>
                </div>

                <div className="container my-5 px-5 tFlex">
                    <h3 style={{fontWeight: "bold", marginTop:"2%"}}>Registered Volunteers</h3>
                    <table className="table" style={{textAlign: 'center'}}>
                        <tr className="thead table-dark" style={{backgroundColor: 'black'}}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {
                            Participants.map(parti =>
                                <tbody className="tbody">
                                    <tr >
                                        <td>{parti.firstname} {parti.lastname}</td>
                                        <td>{parti.email}</td>
                                        <td>{parti.pnumber}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            )}
                    </table>
                </div>
            </div>
        </>
    );
};

export default Detaileventngo;