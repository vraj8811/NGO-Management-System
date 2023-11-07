import React from "react";
import "./firstpage.css" 
import img1 from "./images/output-onlinepngtools.png";
import img2 from "./images/art.png";
import img3 from "./images/NGO_MANAGE.png";
import { useHistory } from "react-router-dom";
const Firstpage =() =>
{
    const history=useHistory();
    return(
        
           <header>
        <section class="mainheaderfg">
            <div class="logo">
            <a href="/"><img src={img1} alt="logo"></img></a>
            </div>
        
        <nav>
            <a href="/">Home</a>
            <a href="/contactus">Contact Us</a>
            <a href="/aboutus">About us</a>
        </nav>
        </section>

        <main>
            <section class="left">
                <h4> WE ARE HERE TO HELP YOU VOLUNTEER FOR AN EVENT.</h4>
                <h1> A COMMON PLATFORM FOR ALL NGOs TO GET VOLUNTEERS. </h1>
                <h2>HOW YOU WANT TO LOG IN ?</h2>
                <button onClick={() => history.push("/loginngo")} style={{color:'#020049'}}> NGO</button>
            <button onClick={() => history.push("/loginvol")} style={{color:'#020049'}}> Volunteer</button>
            </section>
    
            <section class="right">
                <figure>
                    <img src={img2} alt="ilustration" height="400px" width="650px"></img>
                </figure>
            </section>
        </main>

        <footer>
            <div class="logo">
                <img src={img3} alt="logo"></img>
        </div>
        <p>
            Copyright © 2010-2022 NGO Manage Company S.L. All rights reserved.
        </p>
        </footer>

    </header>

    
    )
}

export default Firstpage