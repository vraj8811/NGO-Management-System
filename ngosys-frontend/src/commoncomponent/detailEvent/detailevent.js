import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../commoncomponent/navbarvol/navbar";
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import "./detailevents.css"
import Footer from '../footer/footer2/footer2';
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Googlemap from '../Googlemap/googlemap';


const Detailevent = () => {
    const [feedback, setFeedback] = useState("")
    const onFeedbackChange = (event) => {
        // console.log(event.currentTarget.value)
        setFeedback(event.currentTarget.value)

    }

    const [rate, setRate] = useState("")
    const onRateChange = (event) => {
        // console.log(event.currentTarget.value)
        setRate(event.currentTarget.value)
    }

    const [suggestion, setSuggestion] = useState("")
    const onSuggestionChange = (event) => {
        console.log(event.currentTarget.value)
        setSuggestion(event.currentTarget.value)

    }

    const { eventId } = useParams();

    const user = JSON.parse(localStorage.getItem("currentUser"))

    let finaladd;
    const [Event, setEvent] = useState([])
    const [markerPosition, setMarkerPosition] = useState({})
    const [ADD, setADD] = useState("")

    useEffect(() => {

        axios.get(`http://localhost:9002/events/events_by_id?id=${eventId}&type=single`)
            .then(res => {
                setEvent(res.data[0])
                localStorage.setItem("currentEvent", JSON.stringify(res.data[0]))

            })
    }, [])

    const addToCartHandler = () => {
        console.log("Hello");
        const variables = {
            firstname: user.user.firstname,
            lastname: user.user.lastname,
            email: user.user.email,
            pnumber: user.user.pnumber
        }

        axios.post(`http://localhost:9002/addToCart/${eventId}/${user.user._id}`, variables)

            .then(res => {
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                console.log(res.data)
                alert(res.data.message)

            })

    }
    const addToFeedback = () => {
        console.log("Hello")
        const variables = {
            feedback: feedback,
            rate: rate,
            firstname: user.user.firstname,
            lastname: user.user.lastname
        }
        console.log(variables)
        axios.post(`http://localhost:9002/addToFeedback/${eventId}/${user.user._id}`, variables)
            .then(res =>
                alert(res.data.message))


    }

    const addToSuggestion = () => {
        console.log("Hello")
        const variables = {
            suggestion: suggestion,
            firstname: user.user.firstname,
            lastname: user.user.lastname
        }
        console.log(variables)
        axios.post(`http://localhost:9002/addToSuggestion/${eventId}/${user.user._id}`, variables)
            .then(res =>
                alert(res.data.message))


    }

    const feedbackform = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        if (Event.edate < today.toISOString()) {
            return (

                <div style={{ display: 'flex', justifycontent: 'center', flexDirection: 'column', textJustify:"center"}}>
                        <h5 style={{marginBottom: '0.50%'}}>Give Rating</h5>
                        <select name="rate" value={rate} className='form-control' onChange={onRateChange} style={{width: '5%'}}>
                            <option value="1" style={{textAlign: 'center'}}>1</option>
                            <option value="2" style={{textAlign: 'center'}}>2</option>
                            <option value="3" style={{textAlign: 'center'}}>3</option>
                            <option value="4" style={{textAlign: 'center'}}>4</option>
                            <option value="5" style={{textAlign: 'center'}}>5</option>
                        </select>
                        <h5 style={{marginTop: '1.5%'}}>Give Feedback</h5>
                        <textarea type='textarea' name='message' rows='3' cols='40' className='form-control'
                            value={feedback} placeholder="Please give your feedback" onChange={onFeedbackChange} style={{width: '30%', marginTop: '0%'}} />
                        <button type="submit" className='form-control btn ' onClick={addToFeedback} style={{width: '10%'}}>Submit  </button>
                    </div>
            )
        } else {
            return (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <h4>Do you have any suggestion for the NGO?</h4>
                            <textarea type='textarea' name='suggestion' rows='3' cols='40' className='form-control'
                                value={suggestion} placeholder="Please give your suggestion" onChange={onSuggestionChange}  style={{width: '30%'}}/>
                            <button type="submit" className='form-control btn btn-outline-success' onClick={addToSuggestion} style={{width: '10%'}}>Submit </button>
                    </div>
                </div>
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
            <div className='mainDivDE'>
                <Navbar />
                <div className="container edetails my-5" style={{boxShadow: "0px 0px 6px 2px #4262ff"}}>
                    <h1 style={{marginBottom: '1%', fontWeight: 'bold'}}>{Event.name}</h1>
                        <div style={{marginBottom: '2%'}}>
                            <img src={Event.images} alt={Event.images} style={{ height: '250px', borderRadius: '200px', width: '250px' }}></img><br />
                        </div>
                        <div className='innerF'>
                            <label><b>Event organizer:</b> {Event.organizer} </label>
                            <label><b>Event category:</b> {Event.category} </label>
                            <label><b>Date & Time:</b> {formatDate(Event.edate)} {Event.etime} </label>
                            <label><b>Address:</b> {Event.address} ,{Event.city}, {Event.state} </label>
                            <label><b>NGO's Contact Info.:</b> {Event.email}<br/>{Event.contact}</label>
                            <label><b>Description:</b> {Event.description} </label>
                        </div>
                        <button className='btn mb-4' onClick={addToCartHandler}>Register</button>
                </div>
                {feedbackform()}
            </div>
        </>
    );

};

export default Detailevent