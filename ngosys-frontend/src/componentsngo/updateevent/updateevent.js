import React, { useState } from "react"
import "../addevent/addevents.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Navbar from '../../commoncomponent/navbarngo/navbar';
import { Convert } from 'mongo-image-converter';

const Updateevents = () => {

     const user = JSON.parse(localStorage.getItem("currentUser"))
     console.log(user.user.NGOID)
     const eventdata = JSON.parse(localStorage.getItem("currentEvent"))

     const history = useHistory();



     const updateEvents = () => {
          const variables = {

               name: name,
               organizer: organizer,
               ngoid: user.user.NGOID,
               address: address,
               city: city,
               state: state,
               category: category,
               contact: contact,
               email: email,
               description: description,
               edate: edate,
               etime: etime,
               id: eventdata._id
          }
          console.log(variables)

          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          console.log(eventdata.edate)
          console.log(today.toISOString())

          const Data = JSON.stringify({ ...variables, Image });
          console.log(Data)
          if (emailErrorstatus === "false") {
               axios.post("http://localhost:9002/updateevents", { Data, "Content-Type": "application/json" })
                    .then(res => alert(res.data.message))
               history.push("/homepagengo")
          } else {

          }

     }
     const [name, setName] = useState("")
     const [organizer, setOrganizer] = useState("")
     const [edate, setEdate] = useState("")
     const [etime, setEtime] = useState("")
     const [address, setAddress] = useState("")
     const [city, setCity] = useState("")
     const [state, setState] = useState("")
     const [category, setCategory] = useState("")
     const [contact, setContact] = useState("")
     const [email, setEmail] = useState("")
     const [description, setDescription] = useState("")
     const [Image, setImage] = useState("")

     const onNameChange = (event) => {
          setName(event.currentTarget.value)
     }
     const onOrganizerChange = (event) => {
          setOrganizer(event.currentTarget.value)
     }
     const onEdateChange = (event) => {
          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          if (event.currentTarget.value > today.toISOString()) {
               setEdate(event.currentTarget.value)
          }
          else {
               alert("Please enter valid date")
          }
     }

     const onEtimeChange = (event) => {
          setEtime(event.currentTarget.value)
     }
     const onAddressChange = (event) => {
          setAddress(event.currentTarget.value)
     }
     const onCategoryChange = (event) => {
          setCategory(event.currentTarget.value)
     }
     const onCityChange = (event) => {
          setCity(event.currentTarget.value)
     }
     const onStateChange = (event) => {
          setState(event.currentTarget.value)
     }
     const onContactChange = (event) => {
          setContact(event.currentTarget.value)
     }
     const onEmailChange = (event) => {
          setEmail(event.currentTarget.value)
     }
     const onDescriptionChange = (event) => {
          setDescription(event.currentTarget.value)
     }

     const onImageChange = async (e) => {
          const convertedImage = await Convert(e);
          setImage(convertedImage)
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
               <div id="addEventDiv">
                    <Navbar />
                         <div className="addevents_box" >
                              <h1 className="headerAE">Update Event Details</h1>
                              <div className="fieldsAddEvent">
                                   <label htmlFor="file" className="labelAE"> Choose Image: </label>
                                   <input type="file" filename="Images" onChange={(e) => { onImageChange(e.target.files[0]) }} className="inputAE"></input>
                              </div>

                              <div className="fieldsAddEvent">
                                   <label className="labelAE"> Event Name: </label>
                                   <input type="text" name="name" value={name} placeholder={eventdata.name} onChange={onNameChange} className="inputAE"></input>
                              </div>
                              
                              <div className="fieldsAddEvent">
                                   <label className="labelAE"> Category: </label>
                                   <select name="category" value={category} placeholder={eventdata.category} onChange={onCategoryChange} className="inputAE">
                                        <option value="Human">Human</option>
                                        <option value="Animal">Animal</option>
                                        <option value="Birds">Birds</option>
                                        <option value="Social Services">Social Services</option>
                                        <option value="Nature">Nature</option>
                                        <option value="Other">Other</option>
                                   </select>
                              </div>
                              <div className="fieldsAddEvent">
                                   <label className="labelAE"> Organizer: </label>
                                   <input type="text" name="organizer" value={organizer} placeholder={eventdata.organizer} onChange={onOrganizerChange} className="inputAE"></input>
                              </div>
                              <div className="fieldsAddEvent">
                                   <label className="labelAE">Event Date:   </label>
                                   <TextField
                                        name="edate"
                                        type="date"
                                        value={edate}
                                        onChange={onEdateChange}
                                        InputLabelProps={{
                                             shrink: true,
                                        }}
                                        placeholder={eventdata.edate} className="inputAE"
                                   />
                              </div>
                              <div className="fieldsAddEvent">
                                   <label className="labelAE"> Time: </label>
                                   <input type="time" name="etime" value={etime} placeholder={eventdata.etime} onChange={onEtimeChange} className="inputAE"></input>
                              </div>

                              <div className="fieldsAddEvent" style={{ display: 'flex', justifyContent: 'center' }}>
                                   <label className="labelAE"> Venue: </label>
                                   <textarea name="address" value={address} placeholder={eventdata.address} onChange={onAddressChange} className="inputAE"/>
                              </div>
                              <div className="fieldsAddEvent">
                                   <label className="labelAE"> City: </label>
                                   <input type="text" name="city" value={city} placeholder={eventdata.city} onChange={onCityChange} className="inputAE"></input>
                              </div>
                              <div className="fieldsAddEvent">
                                   <label className="labelAE"> State: </label>
                                   <input type="text" name="state" value={state} placeholder={eventdata.state} onChange={onStateChange} className="inputAE"></input>
                              </div>


                              <div className="fieldsAddEvent">
                                   <label className="labelAE"> Contact: </label>
                                   <input type="text" name="contact" value={contact} placeholder={eventdata.contact} onChange={onContactChange} className="inputAE"></input>
                              </div>
                              <div className="fieldsAddEvent">
                                   <label className="labelAE"> E-mail: </label>
                                   <div className="emailF">
                                   <input type="text" name="email" value={email} placeholder={eventdata.email} onChange={onEmailChange} onInput={(e) => validateEmail(e)} className="inputAE" style={{width: '100%'}}></input>
                                   <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                   }}>{emailError}</span>
                                   </div>
                              </div>
                              <div className="fieldsAddEvent" style={{ display: 'flex', justifyContent: 'center' }}>
                                   <label className="labelAE"> Description: </label>
                                   <textarea name="description" value={description} placeholder={eventdata.description} onChange={onDescriptionChange} className="inputAE"/>
                              </div>
                              <div className="btn" onClick={updateEvents}> Update Event </div>
                         </div>
                    </div>
          </>
     )
}

export default Updateevents