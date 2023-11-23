import React, { useState } from "react";
import "./loginvol.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbar";
import img1 from "../../firstpage/images/logart.png"
import Footer from "../../commoncomponent/footer/footer2/footer2";


const Loginvol = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: "",
        passwd: "",

    })



    const handleChange = (e) => {
        const { name, value } = e.target

        setUser({
            ...user,
            [name]: value
        })

    }

    const loginVol = () => {
        if (emailErrorstatus === "false") {
            console.log("logged in")
            axios.post("http://localhost:9002/loginvol", user)
                .then(res => {
                    localStorage.setItem("currentUser", JSON.stringify(res.data));

                    const vol = JSON.parse(localStorage.getItem("currentUser"));

                    if (vol.message === "Login Successful") {
                        alert("Login Successful.")
                        history.push("/homepage")

                    } else if (vol.message === "Password incorrect") {
                        alert(vol.message)
                    } else {
                        alert(vol.message)
                    }

                })
        } else {

        }

    }

    const [emailError, setEmailError] = useState('')
    const [emailErrorstatus, setEmailErrorstatus] = useState('')

    const validateEmail = (e) => {

        let email = e.target.value
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(e)
        if (re.test(email)) {
            setEmailError('Valid Email :)')
            setEmailErrorstatus("false");
            handleChange(e);
        } else {
            setEmailError('Enter valid Email!')
            setEmailErrorstatus("true");

        }
    }

    return (

        <>
            <logpage>
                <logvol>
                <a onClick={() => history.push("/")} style={{cursor:'pointer'}}>&lt;&lt; <b>Back</b></a>
                        <div className="rightvol">
                            <mainvol>
                                <h1 id="heading">Login As Volunteer</h1>
                                <div className="fields">
                                    <label> Email: </label>
                                    <div class="inputD">
                                    <input type="text" name="email" value={user.email} onChange={handleChange} onInput={(e) => validateEmail(e)} placeholder="Enter E-mail"></input>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                        marginLeft: '5%',
                                    }}>{emailError}</span>
                                    </div>
                                </div>
                                <div className="fields">
                                    <label> Password: </label>
                                    <input type="password" name="passwd" value={user.passwd} onChange={handleChange} placeholder="Enter Password"></input>
                                </div>
                                <button id="volL" onClick={loginVol} style={{width: '100%'}}> Login </button>
                                <div><h7>Or</h7></div>
                                <text>Don't have Account?</text>
                                <a id="reglinkvol" onClick={() => history.push("/registervol")} title="click here to Sign up"> Sign up here </a>
                            </mainvol>
                        </div>
                </logvol>
            </logpage>
            <br />
        </>

    )
}

export default Loginvol