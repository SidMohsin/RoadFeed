import React, { useContext, useEffect } from 'react';
import { Context } from '../Context/StoreContext';
import '../OlaMapsWebSDK/style.css';

const MapAdmin = ({showModal,Lat,Lng,setShowModal}) => {
    const { maps } = useContext(Context);
    useEffect(() => {
        // Ensure the modal is open and maps object is available
        if (showModal && maps) {
            // Wait for the modal to fully render
            const timer = setTimeout(() => {
                const myMap = maps.init({
                    style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                    container: 'Map', // Ensure this matches the div ID
                    center: [Lng,Lat],
                    zoom: 14,
                });

                const data = maps.addMarker({ offset: [0, 0], anchor: 0, draggable: false })
                    .setLngLat([Lng,Lat])
                    .addTo(myMap);
                console.log(data)
                // Clean up event listeners on component unmount
                return () => {
                    myMap.off('click');
                };
            }, 100); // Delay to ensure modal is rendered

            return () => clearTimeout(timer); // Clear timeout on cleanup
        } else {
            console.error("Map initialization error: maps object not available or modal not shown.");
        }
    }, [showModal]);

    const handleClose = () => setShowModal(false);

    return (
        <>
            {showModal && (
                <div
                    className="modal show"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden={!showModal}
                    style={{ display: 'block' }} // Ensures the modal is displayed
                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Map
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={handleClose}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div id="Map" style={{ height: '400px' }}></div> {/* Set height for map */}
                            </div>
                            <div className="modal-footer">
                                <div className=''>
                                    <p>
                                        Latitude : {Lat}
                                    </p>
                                    <p>
                                        Longitude : {Lng}
                                    </p>

                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MapAdmin;
