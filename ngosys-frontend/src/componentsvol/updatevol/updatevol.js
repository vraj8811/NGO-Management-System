import React, { useEffect, useState } from "react"
import "../../componentsngo/updatengo/updatengo.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbarvol/navbar";

const Updatevol = () => {
    const history = useHistory();
    const user1 = JSON.parse(localStorage.getItem("currentUser"))
    const vid = user1.user._id;
    console.log(user1.user._id)

    const [volData, setvolData] = useState({
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        pnumber: "",
        email: "",
      });

      useEffect(() => {
        // Fetch vol data based on donorId
        const fetchvolData = async () => {
          try {
            const response = await axios.get(`http://localhost:9002/getvol/${vid}`);
            const data = response.data; // Assuming the API returns donor data
            setvolData(data);
          } catch (error) {
            console.error("Error fetching vol data:", error.message);
          }
        };
    
        fetchvolData();
      }, [vid]);

    const registerVol = () => {
        const variables = {

            firstname: firstname,
            lastname: lastname,
            address: address,
            city: city,
            state: state,
            ID: user1.user._id,
            pnumber: pnumber,
            email: email,

        }

        if (emailErrorstatus === "false") {
            axios.post("http://localhost:9002/updatevol", variables)
                .then(res => alert(res.data.message));
                history.push("/homepage");
        } else {
            alert("please re-enter your Email ID")
        }
    }
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pnumber, setPnumber] = useState("")
    const [email, setEmail] = useState("")

    const onFirstNameChange = (event) => {
        setFirstName(event.currentTarget.value)
    }
    const onLastNameChange = (event) => {
        setLastName(event.currentTarget.value)
    }

    const onAddressChange = (event) => {
        setAddress(event.currentTarget.value)
    }

    const onCityChange = (event) => {
        setCity(event.currentTarget.value)
    }
    const onStateChange = (event) => {
        setState(event.currentTarget.value)
    }
    const onPnumberChange = (event) => {
        setPnumber(event.currentTarget.value)
    }
    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
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
            onEmailChange(e);
        } else {
            setEmailError('Enter valid Email!')
            setEmailErrorstatus("true");

        }
    }

    return (
        <>
            <div className="mainDivUP">
                <Navbar />
                <div className="UP_box">
                        <h1 class="headerUP">Update Profile</h1>
                        <div className="fieldsUP">
                            <label className="labelUP"> First Name: </label>
                            <input type="text" name="firstname" value={firstname} placeholder={volData.firstname} onChange={onFirstNameChange} className="inputUP"></input>
                        </div>
                        <div className="fieldsUP">
                            <label className="labelUP"> Last Name: </label>
                            <input type="text" name="lastname" value={lastname} placeholder={volData.lastname} onChange={onLastNameChange} className="inputUP"></input>

                        </div>
                        <div className="fieldsUP" style={{ display: 'flex', justifyContent: 'center' }}>
                            <label className="labelUP"> Address: </label>
                            <textarea name="address" value={address} placeholder={volData.address} onChange={onAddressChange} className="inputUP"></textarea>
                        </div>
                        <div className="fieldsUP">
                            <label className="labelUP"> City: </label>
                            <input type="text" name="city" value={city} placeholder={volData.city} onChange={onCityChange} className="inputUP"></input>
                        </div>
                        <div className="fieldsUP">
                            <label className="labelUP"> State: </label>
                            <input type="text" name="state" value={state} placeholder={volData.state} onChange={onStateChange} className="inputUP"></input>
                        </div>

                        <div className="fieldsUP">
                            <label className="labelUP"> Number: </label>
                            <input type="text" name="contact" value={pnumber} placeholder={volData.pnumber} onChange={onPnumberChange} className="inputUP"></input>
                        </div>
                        <div className="fieldsUP">
                            <label className="labelUP"> E-mail: </label>
                            <div className="emailF">
                                <input type="text" name="email" value={email} placeholder={volData.email} onChange={onEmailChange} onInput={(e) => validateEmail(e)} className="inputUP" style={{width: '100%'}}></input>
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>{emailError}</span>
                            </div>
                        </div>

                        <div className="btn" style={{ width: '30%', marginTop: '3%', marginBottom: '0%'}} onClick={registerVol}> Update Details </div>

                </div>

            </div>
        </>
    )
}

export default Updatevol