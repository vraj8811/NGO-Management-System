import React, { useState } from "react"
import "../addevent/addevents.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Navbar from '../../commoncomponent/navbarngo/navbar';
import { Convert } from 'mongo-image-converter';
import Footer from "../../commoncomponent/footer/footer2/footer2";

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
               <div id="back">
                    <Navbar />
                    <div className="addevents" style={{ display: 'flex', justifyContent: 'center' }}>

                         <br></br>

                         <div className="addevents_box" >
                              <h1 style={{ display: 'flex', justifyContent: 'center' }}>Update Event Details</h1>
                              <h4 style={{ display: 'flex', justifyContent: 'center' }}>Please fill the fields you wish to edit:</h4>
                              <br></br>

                              <div className="fields">
                                   <label htmlFor="file"> Choose Images: </label>
                                   <input type="file" filename="Images" style={{ width: '250px' }} onChange={(e) => { onImageChange(e.target.files[0]) }}></input>
                              </div>

                              <div className="fields" >

                                   <label> Event Name: </label>
                                   <input type="text" name="name" value={name} placeholder={eventdata.name} onChange={onNameChange}></input>
                              </div>
                              <br />
                              <div className="fields">
                                   <label> Category: </label>
                                   <select name="category" value={category} placeholder={eventdata.category} onChange={onCategoryChange}>
                                        <option value="Human">Human</option>
                                        <option value="Animal">Animal</option>
                                        <option value="Birds">Birds</option>
                                        <option value="Social Services">Social Services</option>
                                        <option value="Nature">Nature</option>
                                        <option value="Other">Other</option>
                                   </select>

                                   {/* <input type="text"  ></input> */}

                              </div> <br />
                              <div className="fields">

                                   <label style={{ marginLeft: '-190px' }}> NGOID: </label>
                                   <label> {user.user.NGOID}</label>

                              </div>
                              <div className="fields">
                                   <label> Organizer: </label>
                                   <input type="text" name="organizer" value={organizer} placeholder={eventdata.organizer} onChange={onOrganizerChange}></input>
                              </div>
                              <br />
                              <div style={{
                                   margin: 'auto',
                                   display: 'block',
                                   width: 'fit-content'
                              }}
                              >
                                   <label style={{ paddingRight: '10px' }}>Event Date:   </label>
                                   <TextField
                                        name="edate"
                                        type="date"
                                        value={edate}
                                        onChange={onEdateChange}
                                        InputLabelProps={{
                                             shrink: true,
                                        }}
                                        placeholder={eventdata.edate}
                                   />
                              </div>
                              <div className="fields">
                                   <label> Time: </label>
                                   <input type="time" name="etime" value={etime} placeholder={eventdata.etime} onChange={onEtimeChange}></input>
                              </div>

                              <div className="fields" style={{ display: 'flex', justifyContent: 'center' }}>
                                   <label > Address: </label>
                                   <textarea name="address" value={address} placeholder={eventdata.address} onChange={onAddressChange} />
                              </div>
                              <div className="fields">
                                   <label> City: </label>
                                   <input type="text" name="city" value={city} placeholder={eventdata.city} onChange={onCityChange}></input>
                              </div>
                              <div className="fields">
                                   <label> State: </label>
                                   <input type="text" name="state" value={state} placeholder={eventdata.state} onChange={onStateChange} ></input>
                              </div>


                              <div className="fields">
                                   <label> Contact: </label>
                                   <input type="text" name="contact" value={contact} placeholder={eventdata.contact} onChange={onContactChange}></input>
                              </div>
                              <div className="fields">
                                   <label> E-mail: </label>
                                   <input type="text" name="email" value={email} placeholder={eventdata.email} onChange={onEmailChange} onInput={(e) => validateEmail(e)}></input>
                                   <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                   }}>{emailError}</span>
                                   <br />
                                   <span style={{
                                        fontWeight: 'bold',
                                        color: 'green',
                                   }}>Please enter your new or old Email ID. </span>
                              </div>
                              <div className="fields" style={{ display: 'flex', justifyContent: 'center' }}>
                                   <label> Description: </label>
                                   <textarea name="description" value={description} placeholder={eventdata.description} onChange={onDescriptionChange} />
                              </div>
                              <br />
                              <div className="btn btn-outline-success btn-lg " style={{ width: '200px' }} onClick={updateEvents}> Update Event </div>
                         </div>

                    </div>
                    <br />
               </div>
               <Footer />
          </>
     )
}

export default Updateevents