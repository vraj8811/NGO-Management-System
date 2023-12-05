import React, { useState, useEffect, useReducer } from "react";
import "./homepage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd"
import Searchfeature from "./Components/search";
import Filter from "./Components/filter";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Homepage = () => {

    const history = useHistory();
    const [Events, setevents] = useState([]);
    // const [user, setuser] = useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [Skip, setskip] = useState(0);
    const [Limit, setlimit] = useState(4);
    const [Postsize, setPostsize] = useState(0);
    const [Searchterms, setSearch] = useState("");
    const [Filters, setFilters] = useState({
        category: [],
    })
    const category = [
        {
            "_id": "Human"
        },
        {
            "_id": "Animal",
        },
        {
            "_id": "Nature",
        },
        {
            "_id": "Birds",
        },
        {
            "_id": "Social Services",
        }
    ]


    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }

        // setuser(localStorage.getItem('currentUser'));
        console.log(user)
        getevent(variables)

    }, []);

    const getevent = (variables) => {
        axios
            .post('http://localhost:9002/events', variables)
            .then(res => {
                console.log(res)
                // setevents([...Events, ...res.data.events])
                // setPostsize(res.data.Postsize)

                if (res.data.success) {
                    if (variables.loadMore) {
                        setevents([...Events, ...res.data.events])
                    } else {
                        setevents(res.data.events)
                    }
                    setPostsize(res.data.Postsize)
                } else {
                    alert('Failed to fectch product datas')
                }

            })
    }

    //serach features
    const updateSearch = (newSearch) => {


        const variables = {
            skip: 0,
            limit: Limit,
            Searchterms: newSearch
        }
        setskip(0);
        setSearch(newSearch);

        // console.log(newSearch)

        getevent(variables)
    }

    //loadmore function
    const onloadmore = () => {

        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            SearchTerm: Searchterms
        }
        getevent(variables)
        setskip(skip)

        return (
            <br />
        )

    }

    //Filters handle

    const handleFilters = (filters, category) => {

        // console.log(filters)

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    //Display Filters

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getevent(variables)
        setskip(0)

    }

    //logout button
    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRegUser");
        history.push("/")
    }

    let count = 0;
    const rendercards = Events.map((event, index) => {

        return (
            <>
                <div class="col-4" style={{width: '330px'}}>
                    <Card
                        style={{
                            height: '100%',
                            backgroundColor: "",
                            boxShadow: '0px 0px 6px 1px #4262ff',
                            padding: '2%'
                        }}
                    >
                        <CardContent style={{ paddingBottom: '0%' }}>
                            <Typography
                                style={{ fontSize: 14, display: 'flex', justifyContent: 'center', marginBottom: '3%' }}
                                color="textSecondary"
                                gutterBottom
                            >
                                <img src={event.images} alt={event.images} class="rounded" style={{ height: '100px' }}></img>

                            </Typography>
                            <Typography variant="h6" component="h2" style={{ marginBottom: '3%', marginTop: '7%', alignContent: 'center', display: 'flex' }}>
                            {event.name}
                            </Typography>
                            <Typography
                                color="textSecondary"
                            >
                                Date: {event.edate.substr(0, 10)}
                            </Typography>
                            <Typography variant="body2" component="p" color="textSecondary">
                                Organizer Name: {event.organizer}
                            </Typography>
                            <Typography
                                color="textSecondary"
                            >
                                City: {event.city}
                            </Typography>
                        </CardContent>
                        <CardActions style={{ paddingBottom: '3%' }}>
                            <Button size="small" style={{ alignself: 'left' }}><a href={`/Event/${event._id}`}><button className="btn btn-outline-info" >More</button></a></Button>
                        </CardActions>
                    </Card>
                    <br/>
                </div>
              
            </>

        )

    }
    )

    return (
        <div className="homepagevol">
            <div class="mainheadervol">
                <nav>
                    <a href="/homepage" className="navLink">Home</a>
                    <a style={{ cursor: 'pointer' }} onClick={() => history.push("/registeredevents")} className="navLink">Registered Events</a>
                    <a onClick={() => history.push("/updatevol")} style={{ cursor: "pointer" }} className="navLink">Update Profile </a>
                    <button className="navLink" onClick={logout} style={{background: 'none', border: '0'}}>Logout</button>
                </nav>
            </div>
            <div className="bodyContainer">
                <div>
                    <h1 style={{ display: 'flex', justifyContent: 'center', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sansSerif", fontWeight: 600}}>List of Events</h1>
                    <Searchfeature
                        refreshFunction={updateSearch}
                    />
                </div>
                <Filter
                    handleFilters={filters => handleFilters(filters, "category")}
                />
                <div>
                    {Events.length === 0 ?
                        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                            <h2>No post yet....</h2>
                        </div> :
                        <div className="row" style={{justifyContent: 'center'}}>
                            {rendercards}
                        </div>
                    }

                </div>
            
                {Postsize >= Limit &&
                    <div>
                        <button className="btn" style={{width: '100%'}} onClick={onloadmore}>Load More</button>
                    </div>
                }
                <br />
            </div>
        </div>

    )
}

export default Homepage