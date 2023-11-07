import React from 'react';
import Navbar from '../navbar';
import emailjs from "emailjs-com";
import Footer from '../footer/footer1';
const Contactus = () => {
    function onFormSubmit(e) {
        e.preventDefault();

        emailjs.sendForm(
            'service_p5ff6vb',
            'template_ydofbeq',
            e.target,
            "PIOhpIvW-4RUu5A5a"
        )
            .then(res => {
                console.log(res);
                alert("Your feedback successfully Submitted..!!!")
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <Navbar />
            <br />
            <div className="">
                <box className="container" style={{ display: 'flex', justifyContent: 'center', alignitems: "center" }}>
                    <div style={{ marginRight: '50px' }}>
                        <a href='tel:9574226615'><button type='submit' value='Send' style={{ marginBottom: '20px', width: '300px' }} size='50px' className='form-control btn btn-outline-success'>Phone No: 9574226615</button></a><br />
                        <a href="mailto:ngomanage2022@gmail.com" target="_blank"><button type='submit' value='Send' style={{ marginBottom: '20px', width: '300px' }} size='50px' className='form-control btn btn-outline-success'>Email ID: ngomanage2022@gmail.com </button></a><br />
                        <a href="https://www.instagram.com/_arshadvhora_/" target="_blank"><button type='submit' value='Send' style={{ marginBottom: '20px', width: '300px' }} size='50px' className='form-control btn btn-outline-success'>Instagram: /ngo_manage</button></a><br />
                    </div>

                    <div className="d-flex" style={{ height: '500px' }}>
                        <div className="vr"></div>
                    </div>
                    <form style={{ marginLeft: '100px' }} onSubmit={onFormSubmit}>
                        <label>Full Name : </label>
                        <input type='text' name='name' className='form-control' /><br />
                        <label>Email ID : </label>
                        <input type='email' name='email' className='form-control' /><br />
                        <label>Subject:</label>
                        <input type='text' name='subject' className='form-control' /><br />
                        <label>Message:</label><br />
                        <textarea type='textarea' name='message' rows='3' cols='40' className='form-control' /><br />
                        <button type='submit' value='Send' size='50px' className='form-control btn btn-outline-success'>Submit  </button>
                    </form>
                </box>
            </div>
            <Footer/>

        </>
    );
};

export default Contactus;