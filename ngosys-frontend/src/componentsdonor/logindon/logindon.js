import React, { useState } from "react";
import "./logindon.css"
import axios from "axios"
import { useHistory } from "react-router-dom";

const Logindon = () => {
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

    const logindon = () => {
        if (emailErrorstatus === "false") {
            console.log("logged in")
            axios.post("http://localhost:9002/logindon", user)
                .then(res => {
                    localStorage.setItem("currentUser", JSON.stringify(res.data));

                    const don = JSON.parse(localStorage.getItem("currentUser"));

                    if (don.message === "Login Successful") {
                        alert("Login Successful.")
                        history.push("/homepagedonor")

                    } else if (don.message === "Password incorrect") {
                        alert(don.message)
                    } else {
                        alert(don.message)
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
                <logdon>
                <a onClick={() => history.push("/")} style={{cursor:'pointer'}}>&lt;&lt; <b>Back</b></a>
                        <div className="rightdon">
                            <maindon>
                                <h1>Login As Donor</h1>
                                <field className="fields">
                                    <label>Email: </label>
                                    {/* <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email address"></input>   */}
                                    <div class="inputD">
                                    <input id="emailI" type="text" name="email" value={user.email} onChange={handleChange} onInput={(e) => validateEmail(e)} placeholder="Enter E-mail"></input>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{emailError}</span>
                                    </div>
                                </field>
                                <field className="fields">
                                    <label> Password: </label>
                                    <input id="pass" type="password" name="passwd" value={user.passwd} onChange={handleChange} placeholder="Enter Password"></input>
                                </field>
                                <button id="donL" onClick={logindon} style={{width: '100%'}}> Login </button><br />
                                <div style={{textAlign: 'center'}}><h7>or</h7></div>
                                <text>Don't have Account?</text>
                                <a id="reglinkdon" onClick={() => history.push("/registerdon")} title="click here to Sign up"> Sign up here </a>
                            </maindon>
                        </div>
                </logdon>
            </logpage>
            <br />
        </>

    )
}

export default Logindon