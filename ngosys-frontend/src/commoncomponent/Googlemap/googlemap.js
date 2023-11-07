import React, { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Googlemap = () => {

    const [markerPosition, setMarkerPosition] = useState({});
    let finaladd;
    // // console.log(props.add)
    useEffect(() => {

    const event1 = JSON.parse(localStorage.getItem("currentEvent"))
    finaladd = event1.address + ', ' + event1.city + ', ' + event1.state + ', ' + 'India'


        Geocode.setApiKey("AIzaSyAebZz6bC_Fv_tidJUpztaNz7kCJUlvnhM");

        Geocode.fromAddress(finaladd).then(

            (response) => {
                // console.log(response.results);
                const { lat, lng } = response.results[0].geometry.location;
                // console.log(lat, lng);
                setMarkerPosition({ lat: lat, lng: lng })

            },
            (error) => {
                console.error(error);
            }
        );
    });

    return (
        <div>
            <div>
                {markerPosition.lat && <LoadScript googleMapsApiKey="AIzaSyAebZz6bC_Fv_tidJUpztaNz7kCJUlvnhM">
                    <GoogleMap

                        id="map"
                        zoom={15}
                        center={{
                            lat: parseFloat(markerPosition.lat),
                            lng: parseFloat(markerPosition.lng),
                        }}
                        mapContainerStyle={{
                            width: "300px",
                            height: "400px",
                        }}
                    >
                        <Marker position={markerPosition}></Marker>
                    </GoogleMap>
                </LoadScript>}
            </div>
        </div>
    );
};

export default Googlemap;