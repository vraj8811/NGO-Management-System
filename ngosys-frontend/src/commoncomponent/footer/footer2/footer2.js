import React from 'react';
import img3 from "../../../firstpage/images/NGO_MANAGE.png";
import img1 from "../../../firstpage/images/output-onlinepngtools.png"
import "./footer2.css";

const Footer = () => {
    return (
        <div>
            
        <footer2>
            <div class="logo">
                <img src={img1} alt="logo"></img>
        </div>
        <p>
            Copyright © 2010-2022 NGO Manage Company S.L. All rights reserved.
        </p>
        </footer2>
        </div>
    );
};

export default Footer;