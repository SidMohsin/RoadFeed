import React, { useContext, useEffect } from 'react';
import { Context } from '../Context/StoreContext';
import '../OlaMapsWebSDK/style.css';

const MapModel = () => {
    const { setShowModal, showModal, Marker, maps, HandleMapClick, CustomLoad, HandleDrag, MapRender, GetCurrentLocation, setCustomLoad } = useContext(Context);
    useEffect(() => {
        console.log(Marker)
        // Ensure the modal is open and maps object is available
        if (showModal && maps) {
            // Wait for the modal to fully render
            const timer = setTimeout(() => {
                const myMap = maps.init({
                    style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                    container: 'Map', // Ensure this matches the div ID
                    center: [Marker.lng, Marker.lat],
                    zoom: 16,
                });

                const data = maps.addMarker({ offset: [0, 0], anchor: 0, draggable: true })
                    .setLngLat([Marker.lng, Marker.lat])
                    .addTo(myMap);
                console.log(data)
                const handleMarkerDrag = (e) => {
                    setCustomLoad(!CustomLoad);
                    HandleDrag(e);
                };

                data.on('drag', handleMarkerDrag);
                myMap.on('click', (e) => HandleMapClick(e, myMap));

                // Clean up event listeners on component unmount
                return () => {
                    data.off('drag', handleMarkerDrag);
                    myMap.off('click');
                };
            }, 100); // Delay to ensure modal is rendered

            return () => clearTimeout(timer); // Clear timeout on cleanup
        } else {
            console.error("Map initialization error: maps object not available or modal not shown.");
        }
    }, [MapRender]);

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
                                    Modal title
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
                                        Latitude : {Marker.lat}
                                    </p>
                                    <p>
                                        Longitude : {Marker.lng}
                                    </p>

                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    Confirm
                                </button>
                                <button type="button" className="btn btn-primary" onClick={() => { GetCurrentLocation(); HandleMapClick() }}>
                                    Detect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MapModel;
