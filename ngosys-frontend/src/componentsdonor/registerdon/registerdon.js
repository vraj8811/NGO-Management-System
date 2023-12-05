import React, { useState } from "react"
import "./registerdon.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbar";
import img1 from "../../firstpage/images/logart.png"
import Footer from "../../commoncomponent/footer/footer2/footer2";

const Registerdon = () => {
     const history = useHistory();
     const [user, setUser] = useState({
          firstname: "",
          lastname: "",
          address: "",
          city: "",
          state: "",
          gender: "",
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

     const registerdon = () => {
          const { firstname, lastname, address, city, state, gender, pnumber, email, passwd, reenterpassword } = user
          if (emailErrorstatus === "false") {
               if (firstname && lastname && email && address && city && state && gender && pnumber && passwd) {
                    if (passwd === reenterpassword) {

                         axios.post("http://localhost:9002/registerdon", user)
                              .then(res => alert(res.data.message))
                         history.push("/logindon")
                    }
                    else {
                         alert("Passwords don't match.")
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
                    <div className="regdonbox">
                         <div className="formDonB">
                              <h1 id="heading">Register as a Donor</h1>
                              <div className="fieldsDon">
                                   <label> First name: </label>
                                   <input type="text" name="firstname" value={user.firstname} placeholder="Enter First name" onChange={handleChange} class="inputDonR"></input>
                              </div>
                              <div className="fieldsDon">
                                   <label> Last name: </label>
                                   <input type="text" name="lastname" value={user.lastname} placeholder="Enter Last name" onChange={handleChange} class="inputDonR"></input>
                              </div>
                              <div className="fieldsDon">
                                   <label> Address: </label>
                                   <textarea name="address" value={user.address} placeholder="Enter your address" onChange={handleChange}></textarea>
                              </div>
                              <div className="fieldsDon">
                                   <label> City: </label>
                                   <input type="text" name="city" value={user.city} placeholder="Enter your city" onChange={handleChange} class="inputDonR"></input>
                              </div>
                              <div className="fieldsDon">
                                   <label> State: </label>
                                   <input type="text" name="state" value={user.state} placeholder="Enter your state" onChange={handleChange} class="inputDonR"></input>
                              </div>
                              <div className="fieldsDon gender1" >
                                   <label className="gender2"> Gender: </label>
                                   <input type="radio" name="gender" value="male" onChange={handleChange}></input>
                                   <label style={{ paddingLeft: '5%' }}> Male </label>
                                   <input type="radio" name="gender" value="female" onChange={handleChange}></input>
                                   <label style={{ paddingLeft: '5%' }}> Female </label>
                              </div>
                              <div className="fieldsDon">
                                   <label> Number: </label>
                                   <input type="text" name="pnumber" value={user.pnumber} placeholder="Enter your phone number" onChange={handleChange} class="inputDonR"></input>
                              </div>
                              <div className="fieldsDon">
                                   <label> E-mail: </label>
                                   <div class="emailF">
                                   <input type='email' name="email" value={user.email} placeholder="Enter your E-mail" onChange={handleChange} onInput={(e) => validateEmail(e)} class="inputDonR" style={{width: '100%'}}></input>
                                   <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                   }}>{emailError}</span>
                                   </div>
                              </div>
                              <div className="fieldsDon">
                                   <label> Password: </label>
                                   <input type="password" name="passwd" value={user.passwd} placeholder="Enter your password" onChange={handleChange} class="inputDonR"></input>
                              </div>
                              <div className="fieldsDon">
                                   <label> Confirm Password: </label>
                                   <input type="password" name="reenterpassword" value={user.reenterpassword} placeholder="Re-Enter your password" onChange={handleChange} class="inputDonR"></input>
                              </div>
                              <div className="btn" id="rDon" onClick={registerdon}> Register </div>
                              <div>OR</div>
                              <div>
                                   <text>Already have Account? </text>
                                   <a className="loglinkdon" onClick={() => history.push("/logindon")} title="cliick here to sign in" style={{ cursor: 'pointer' }}> Sign In here </a>
                              </div>
                         </div>
                    </div>
          </>
     )
}

export default Registerdon