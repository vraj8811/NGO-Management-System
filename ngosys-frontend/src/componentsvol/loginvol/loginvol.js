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
            <Navbar />
            <logpage className="loginvol">
                <br></br>

                {/* <h1>Login as a Volunteer</h1> */}
                <br></br>
                <logvol style={{ display: 'flex', justifyContent: 'center' }}>

                    <section className="Formlogvol" >
                        <section className="leftvol">
                            <img src={img1} alt="login picture" width="500px" />
                        </section>

                        <section className="rightvol">
                            <mainvol  >
                                <h1>Login as a Volunteer</h1><br />
                                <field className="fields">
                                    <label style={{ paddingRight: '10px' }}> Email id: </label>
                                    {/* <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email address"></input>   */}
                                    <input type="text" name="email" value={user.email} onChange={handleChange} onInput={(e) => validateEmail(e)} placeholder="Enter email address"></input>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>{emailError}</span>
                                </field><br />
                                <field className="fields">
                                    <label style={{ paddingRight: '10px' }}> Password: </label>
                                    <input type="password" name="passwd" value={user.passwd} onChange={handleChange} placeholder="Enter Your password"></input>
                                </field><br />
                                <button className="btn btn-outline-primary btn-lg" onClick={loginVol}> Login </button><br />
                                <h7>or</h7><br />
                                <text>Don't have Account?</text>
                                <a id="reglinkvol" onClick={() => history.push("/registervol")} title="click here to Sign up"> Sign up here </a>
                            </mainvol>
                        </section>
                    </section>
                </logvol>
            </logpage>
            <br />
            <Footer />
        </>

    )
}

export default Loginvol