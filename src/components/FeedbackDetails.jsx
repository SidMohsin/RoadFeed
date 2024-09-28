// src/components/SpecfeedbackDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../Context/StoreContext';
import MapAdmin from './MapAdmin';
import axios from 'axios';

const SpecfeedbackDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false)

  const { feedback, fetchFeedback,AdminAuth } = useContext(Context);
  const [Specfeedback, setSpecfeedback] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = async (event) => {
    setStatus(event.target.value);
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/edit/${Specfeedback._id}`, { msg: event.target.value }, { withCredentials: true });
    console.log(res)
    if (res.data.code <= 210) {
      alert('Status Updated ' + event.target.value);
    } else {
      alert('Failed');

    }
  };
  useEffect(() => {
    const fetchfeedback = async () => {
      await fetchFeedback().then((res) => {
        setSpecfeedback(feedback.find(fb => fb._id === id));
      });
    };

    if (feedback.length === 0) {
      fetchfeedback();
    } else {
      setSpecfeedback(feedback.find(fb => fb._id === id));
    }

  }, [id, feedback]);

  if (Specfeedback === null) {
    return <h2>Specfeedback not found</h2>;
  }

  return (
    <>
      <div className="details-container">
        <h2>Details</h2>
        <div className="info-container">
          <div className="details-left">
            <p><strong>Name:</strong> {Specfeedback?.Name}</p>
            <p><strong>Email:</strong> {Specfeedback?.Email}</p>
            <p><strong>Contact No.:</strong> {Specfeedback?.Number}</p>
            <p><strong>City:</strong> {Specfeedback?.City}</p>
            <p><strong>State:</strong> {Specfeedback?.State}</p>
            <p><strong>Latitude:</strong> {Specfeedback?.Latitude}</p>
            <p><strong>Longitude:</strong> {Specfeedback?.Longitude}</p>
          </div>
          <div className="details-right">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${Specfeedback?.Image}` || 'https://via.placeholder.com/150'}
              alt={`Specfeedback from ${Specfeedback?.Name}`} />
            <p><strong>Description:</strong> {Specfeedback?.Description}</p>
          </div>
        </div>
        <div className="button-container">
          <div className='d-flex Status-change'>
            <p>Current Stage</p>
            {AdminAuth? 
            <select value={status} onChange={handleChange}>
              <option value="">{Specfeedback?.Status}</option>
              <option value="Approved">Approved</option>
              <option value="Work in Progress">Work in Progress</option>
              <option value="Completed">Completed</option>
            </select>
            :
            Specfeedback?.Status
            }
          </div>
          <button to={""} className="map-button" onClick={() => setShowModal(true)}>View Map</button>
        </div>

      </div>
      <MapAdmin showModal={showModal} Lat={Specfeedback?.Latitude} Lng={Specfeedback?.Longitude} setShowModal={setShowModal} />
    </>
  );
};

export default SpecfeedbackDetails;
