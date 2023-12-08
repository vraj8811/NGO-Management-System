import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbardon/navbar";
import "./viewtrans.css";

const Viewtrans = () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const history = useHistory();
    const [transList, setTransList] = useState([]);
    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRegUser");
        history.push("/")
    }

    useEffect(() => {
        fetchAllTrans(user.user._id);
    }, []);

    const fetchAllTrans = async (transid) => {
        try {
            const response = await fetch(`http://localhost:9002/transactionsdon/${transid}`, {
                method: 'GET'
            });
            const data = await response.json();
            setTransList(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="mainVTDiv">
            <Navbar/>

            <div className="container px-5 my-5">
                <h1 style={{fontWeight: 'bold', marginBottom: '1.5%', paddingTop: '2%'}}>Money Donations</h1>
                {transList.length === 0 ? (
                    <h5 style={{textAlign: 'center', paddingBottom: '2%'}}>No donation till now.</h5>
                ) : (
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>Index</th>
                                <th>NGO Name</th>
                                <th>NGO Email</th>
                                <th>NGO Phone Number</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Transection ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transList.map((trans, index) => (
                                <tr key={trans._id}>
                                    <td>{index + 1}</td>
                                    <td>{trans.ngoid.name }</td>
                                    <td>{trans.ngoid.email}</td>
                                    <td>{trans.ngoid.pnumber}</td>
                                    <td>{moment(trans.date).format('LL')}</td>
                                    <td>{trans.amount}</td>
                                    <td>{trans.razorpayPaymentId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Viewtrans
