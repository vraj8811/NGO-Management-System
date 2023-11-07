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

                <div style={{ display: 'flex', justifycontent: 'center', padding: '30px' }}>

                    <div >
                        {/* <div style={{ display: 'flex', justifycontent: 'center', padding: '30px' }}><br />
                            <button className='btn btn-outline-success btn-lg' onClick={addToCartHandler}>Click to register</button>
                        </div> */}
                        <label>Rate it:</label>
                        <select name="rate" value={rate} className='form-control' onChange={onRateChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <br />
                        <label>Feedback Message:</label><br />
                        <textarea type='textarea' name='message' rows='3' cols='40' className='form-control'
                            value={feedback} placeholder="Please give your feedback" onChange={onFeedbackChange} /><br />
                        <br></br>
                        <button type="submit" className='form-control btn btn-outline-success' onClick={addToFeedback}>Submit  </button>
                        {/* </form> */}
                    </div>
                </div>
            )
        } else {
            return (
                <div ><br />
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                        <button className='btn btn-outline-success btn-lg' onClick={addToCartHandler}>Click to register</button>
                    </div>
                    <br></br>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                        <div >
                            <h4>Do you have any suggestions for the NGO? </h4><br />
                            <textarea type='textarea' name='suggestion' rows='3' cols='40' className='form-control'
                                value={suggestion} placeholder="Please give your suggestion" onChange={onSuggestionChange} /><br />
                            <button type="submit" className='form-control btn btn-outline-success' onClick={addToSuggestion}>Submit  </button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <Navbar />

            <br />
            <h1 style={{ display: 'flex', justifycontent: 'center' }}>{Event.name}</h1>
            <br />
            <div style={{ display: 'flex', justifycontent: 'center' }}>
                <div style={{ marginRight: '100px' }}>
                    <img src={Event.images} alt={Event.images} style={{ height: '200px' }}></img><br />
                </div>
                <div>
                    <label style={{ paddingBottom: '10px' }}>Event Name : {Event.name} </label><br />
                    <label style={{ paddingBottom: '10px' }}>Event organizer : {Event.organizer} </label><br />
                    <label style={{ paddingBottom: '10px' }}>Event category : {Event.category} </label><br />
                    <label style={{ paddingBottom: '10px' }}>Date : {Event.edate} </label><br />
                    <label style={{ paddingBottom: '10px' }}>Time : {Event.etime} </label><br />
                    <label style={{ paddingBottom: '10px' }}>Address : {Event.address} ,{Event.city}, {Event.state} </label><br />
                    <label style={{ paddingBottom: '10px' }}>NGO's Email ID : {Event.email} </label><br />
                    <label style={{ paddingBottom: '10px' }}>NGO's Contact No. : {Event.contact} </label><br />
                    <label style={{ width: "400px", paddingBottom: '10px' }}>Description : {Event.description} </label><br />

                </div>
                <div style={{ marginLeft: '20px' }}>
                    <Googlemap />
                </div>
            </div>
            {feedbackform()}
            <br />

            <br />
            <Footer />

        </>
    );

};

export default Detailevent