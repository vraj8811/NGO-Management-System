import React from "react";
import "./firstpage.css" 
import { useHistory } from "react-router-dom";
const Firstpage =() =>
{
    const history=useHistory();
    return(
        <div class="card">
            <div class="left">
                <h1>Connecting Hearts, Empowering Change: <br/>Uniting NGOs, Volunteers, and Donors on a Common Platform for a Better World.</h1>
                <h2>How do you want to login?</h2>
                <button onClick={() => history.push("/loginngo")} class="btn"> NGO</button>
                <button onClick={() => history.push("/loginvol")} class="btn"> Volunteer</button>
                <button onClick={() => history.push("/logindon")} class="btn"> Donor</button>
            </div>
        </div>
    )
}

export default Firstpage