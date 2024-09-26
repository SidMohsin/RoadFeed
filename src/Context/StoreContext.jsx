import React, { createContext, useState } from 'react';
import {OlaMaps} from '../OlaMapsWebSDK/olamaps-js-sdk.es'
import axios from 'axios';
export const Context = createContext(null);

const StoreContext = ({ children }) => {
    const [feedback,setfeedback] = useState([]);
    // Response msg 
    const [resmsg,setresmsg] = useState({code:400,msg:""})
    const [ShowMap, setShowmap] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [Marker, setMarker] = useState({
        lat: 0, lng: 0, status: false, mark: false
    });
    const [MapRender, setMapRender] = useState(false);
    const [Load, setLoad] = useState(true);
    const [CustomLoad, setCustomLoad] = useState(false);
    const GetCurrentLocation = () => {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Success callback function
                        const lati = position.coords.latitude;
                        const longi = position.coords.longitude;
                        setMarker({ lat: lati, lng: longi });
                        setMapRender(!MapRender);
                        resolve(true); // Successfully retrieved position
                    },
                    (error) => {
                        // Error callback function
                        console.error("Error getting location: ", error);
                        resolve(false); // Failed to retrieve position
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                resolve(false); // Geolocation not supported
            }
        });
    }
    const maps = new OlaMaps({
        apiKey: process.env.REACT_APP_OLA_API,
    })
    const HandleMapClick = (e, myMap) => {
        if (Marker.mark === false) {
            const data = maps.addMarker({ offset: [0, 0], anchor: 0, draggable: true }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(myMap)
            setMarker({ mark: data });
        } else {
            console.log("Already");
        }
    }
    const HandleDrag = (e) => {
        setMarker({ lat: e.target._lngLat.lat, lng: e.target._lngLat.lng })
        // setCustomLoad(!CustomLoad)
    }
    const fetchFeedback = async()=>{
        try{
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/feedback/all`).then((res)=>{
                if(res.data.code <=210){
                    setfeedback(res.data.data);
                }else{
                    setresmsg(res.data.msg);
                }
                console.log(res);
            }).catch((e)=>{
                console.log(e);
            })
            console.log(feedback)

        }catch(e){
            console.log("Http error failed")
        }
    }
    const values = {
        ShowMap,
        setShowmap,
        showModal, setShowModal,
        Marker, setMarker,
        GetCurrentLocation,
        Load, setLoad,
        maps,
        HandleMapClick,
        HandleDrag,
        CustomLoad, setCustomLoad,
        MapRender, setMapRender,
        resmsg,setresmsg,
        feedback,setfeedback,
        fetchFeedback
    };
    
    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    );
};

export default StoreContext;
