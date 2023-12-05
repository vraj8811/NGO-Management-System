import React, { useEffect, useState } from "react"
import "../updatengo/updatengo.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from '../../commoncomponent/navbarngo/navbar';
import Footer from "../../commoncomponent/footer/footer2/footer2";


const Updatengo = () => {
    const history = useHistory();
    const user1 = JSON.parse(localStorage.getItem("currentUser"))
    const ngoid = user1.user._id;

    const [ngoData, setNgoData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        NGOID: "",
        pnumber: "",
        email: "",
      });

      useEffect(() => {
        // Fetch donor data based on donorId
        const fetchngoData = async () => {
          try {
            const response = await axios.get(`http://localhost:9002/getngo/${ngoid}`);
            const data = response.data; // Assuming the API returns donor data
            setNgoData(data);
          } catch (error) {
            console.error("Error fetching donor data:", error.message);
          }
        };
    
        fetchngoData();
      }, [ngoid]);

    const registerNgo = () => {
        const variables = {

            name: name,
            address: address,
            city: city,
            state: state,
            NGOID: NGOID,
            pnumber: pnumber,
            email: email,

        }

        if (emailErrorstatus === "false") {
            axios.post("http://localhost:9002/updatengo", variables)
                .then(res => alert(res.data.message));
                history.push("/homepagengo");
        } else {
            alert("please re-enter your Email ID")
        }

    }
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pnumber, setPnumber] = useState("")
    const [email, setEmail] = useState("")
    const [NGOID, setNGOID] = useState("")


    const onNameChange = (event) => {
        setName(event.currentTarget.value)
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
    const onNGOIDChange = (event) => {
        setNGOID(event.currentTarget.value)
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
                    <div className="UP_box" >
                        <h1 class="headerUP">Update Profile</h1>
                        <div className="fieldsUP">
                            <label className="labelUP"> NGO Name: </label>
                            <input type="text" name="name" value={name} placeholder={ngoData.name} onChange={onNameChange} className="inputUP"></input>
                        </div>
                        <div className="fieldsUP">
                            <label className="labelUP"> Address: </label>
                            <textarea name="address" value={address} placeholder={ngoData.address} onChange={onAddressChange} className="inputUP"/>
                        </div>
                        <div className="fieldsUP">
                            <label className="labelUP"> City: </label>
                            <input type="text" name="city" value={city} placeholder={ngoData.city} onChange={onCityChange} className="inputUP"></input>
                        </div>
                        <div className="fieldsUP">
                            <label className="labelUP"> State: </label>
                            <input type="text" name="state" value={state} placeholder={ngoData.state} onChange={onStateChange} className="inputUP"></input>
                        </div>

                        <div className="fieldsUP">
                            <label className="labelUP"> Number: </label>
                            <input type="text" name="contact" value={pnumber} placeholder={ngoData.pnumber} onChange={onPnumberChange} className="inputUP"></input>
                        </div>

                        <div className="fieldsUP">
                            <label className="labelUP"> UPI ID: </label>
                            <input type="text" name="state" value={NGOID} placeholder={ngoData.NGOID} onChange={onNGOIDChange} className="inputUP"></input>
                        </div>


                        <div className="fieldsUP">
                            <label className="labelUP"> E-mail: </label>
                            <div className="emailF">
                            <input type="text" name="email" value={email} placeholder={ngoData.email} onChange={onEmailChange} onInput={(e) => validateEmail(e)} className="inputUP" style={{width: '100%'}}></input>
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{emailError}</span>
                            </div>
                        </div>
                        <div className="btn" style={{ width: '30%', marginTop: '3%', marginBottom: '0%'}} onClick={registerNgo}> Update Details </div>
                    </div>
            </div>
        </>
    )
}

export default Updatengo