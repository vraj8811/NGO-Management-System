import React, { useState, useEffect } from "react";
import moment from "moment";
import "../transection/transaction.css"
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from '../../commoncomponent/navbarngo/navbar';



const Transection = () => {
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
          const response = await fetch(`http://localhost:9002/transactions/${transid}`, {
            method: 'GET'
          });
          const data = await response.json();
          setTransList(data);
        } catch (error) {
          console.error(error.message);
        }
      };




    return (
        <div className="mainDivT">
            <Navbar/>
            <div className="container my-4 px-3" style={{paddingBottom: '2%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1 style={{fontWeight: 'bold', marginBottom: '1.5%'}}>Funds Donated</h1>
                    <h4 style={{fontWeight: 'bold', marginTop: '1.5%'}}>Available Fund: {user.user.fund}</h4>
                </div>
                {transList.length === 0 ? (
                    <h5 style={{textAlign: 'center'}}>No transaction history available.</h5>
                ) : (
                    <table className="table">
                        <thead className="thead table-dark">
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Donor Contact No.</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Transection ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transList.map((trans,index) => (
                                <tr key={trans._id}>
                                    <td>{index+1}</td>
                                    <td>{trans.donorid.firstname + ' ' + trans.donorid.lastname}</td>
                                    <td>{trans.donorid.email}</td>
                                    <td>{trans.donorid.pnumber}</td>
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

export default Transection
