import React, { useState } from "react";
import "./loginngo.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbar";
// {setLoginNGO}
const Loginngo = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: "",
        passwd: "",

    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const loginNgo = () => {
        if (emailErrorstatus === "false") {
            axios.post("http://localhost:9002/loginngo", user)
                .then(res => {
                    localStorage.setItem("currentUser", JSON.stringify(res.data));

                    const ngo = JSON.parse(localStorage.getItem("currentUser"));

                    if (ngo.message === "Login Successful") {
                        alert("Login Successful.")
                        history.push("/homepagengo")

                    } else if (ngo.message === "Password incorrect") {
                        alert(ngo.message)
                    } else {
                        alert(ngo.message)
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
                <logngo>
                    <a onClick={() => history.push("/")} style={{cursor:'pointer'}}>&lt;&lt; <b>Back</b></a>
                        <div className="rightngo">
                            <mainngo>
                                <h1 id="heading">Login As NGO</h1>
                                <div className="fields">
                                    <label>Email:</label>
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
                                    <label>Password:</label>
                                    <input type="password" name="passwd" value={user.passwd} onChange={handleChange} placeholder="Enter Password"></input>
                                </div>
                                <button onClick={loginNgo} id="ngoL" style={{width: '100%'}}> Login </button>
                                <div><h7>Or</h7></div>
                                <text>Don't have an Account?</text>
                                <a id="reglinkngo" onClick={() => history.push("/registerngo")} title="Click here to Sign up"> Sign up here </a>
                            </mainngo>
                        </div>          
                </logngo>
                <br />
            </logpage>
        </>

    )
}

export default Loginngo