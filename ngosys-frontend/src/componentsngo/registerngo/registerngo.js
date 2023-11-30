import React, { useState } from "react"
import "./registerngo.css"
import axios from "axios"
import { useHistory } from "react-router-dom";

const Registerngo = () => {
     const history = useHistory();
     const [user, setUser] = useState({
          name: "",
          address: "",
          city: "",
          state: "",
          NGOID: "",
          pnumber: "",
          email: "",
          passwd: "",
          reenterpassword: ""
     })

     const handleChange = e => {
          const { name, value } = e.target
          setUser({
               ...user,
               [name]: value
          })
     }

     const registerNgo = () => {
          const { name, address, city, state, NGOID, pnumber, email, passwd, reenterpassword } = user
          if (emailErrorstatus === "false") {
          if (name && email && address && city && state && NGOID && pnumber && passwd) {
               if (passwd === reenterpassword) {

                    axios.post("http://localhost:9002/registerngo", user)
                         .then(res => alert(res.data.message))
                    history.push("/loginngo")
               }
               else {
                    alert("Passwords don't match")
               }
          }
          else {
               alert("Please check whether all the fields have been filled.")
          }
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
          <a onClick={() => history.push("/")} style={{cursor:'pointer'}}>&lt;&lt; <b>Home</b></a>
                    <div className="regngobox">
                         <div className="formB">
                              <h1>Register As NGO</h1>
                              <div className="fields">
                                   <label> NGO Name: </label>
                                   <input type="text" name="name" value={user.name} placeholder="Enter NGO name" onChange={handleChange}></input>
                              </div>

                              <div className="fields">
                                   <label> Address: </label>
                                   {/* <textarea rows="3" cols= "30" placeholder="Enter your address"></textarea> */}
                                   <textarea name="address" value={user.address} placeholder="Enter Address" onChange={handleChange}></textarea>
                              </div>
                              <div className="fields">
                                   <label> City: </label>
                                   <input type="text" name="city" value={user.city} placeholder="Enter City" onChange={handleChange}></input>
                              </div>
                              <div className="fields">
                                   <label> State: </label>
                                   <input type="text" name="state" value={user.state} placeholder="Enter State" onChange={handleChange} ></input>
                              </div>

                              <div className="fields">
                                   <label> UPI ID: </label>
                                   <input type="text" name="NGOID" value={user.NGOID} placeholder="Enter UPI ID" onChange={handleChange} ></input>
                              </div>
                              <div className="fields">
                                   <label> Contact Number: </label>
                                   <input type="text" name="pnumber" value={user.pnumber} placeholder="Enter Contact Number" onChange={handleChange}></input>
                              </div>
                              <div className="fields">
                                   <label> E-mail: </label>
                                   <input type="email" name="email" value={user.email} placeholder="Enter E-mail" onChange={handleChange} onInput={(e) => validateEmail(e)} ></input>
                                   <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                   }}>{emailError}</span>
                              </div>
                              <div className="fields">
                                   <label> Password: </label>
                                   <input type="password" name="passwd" value={user.passwd} placeholder="Enter Password" onChange={handleChange} ></input>
                              </div>
                              <div className="fields">
                                   <label>Confirm Password: </label>
                                   <input type="password" name="reenterpassword" value={user.reenterpassword} placeholder="Re-Enter Password" onChange={handleChange} ></input>
                              </div>
                              <button id="rNGO" onClick={registerNgo}> Register </button>
                              <div>OR</div>
                              <div>
                                   <text>Already have Account? </text>
                                   <a className="loglinkngo" onClick={() => history.push("/loginngo")} title="Click here to sign in" style={{ cursor: 'pointer' }}> Sign In here </a>
                              </div>
                         </div>
                    </div>
               </>
     )
}

export default Registerngo