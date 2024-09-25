import React, { useContext, useState } from 'react';
import { Context } from '../Context/StoreContext';
import axios from 'axios'
import MapModel from './MapModel';
const FeedbackForm = () => {
  const { setShowModal, GetCurrentLocation, setMapRender, MapRender, Marker } = useContext(Context);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Number: 0,
    City: "",
    State: "",
    Category: "Pothole",
    Severity: "Low",
    Description: "",
    Image: null
  });

  const HandleLocationClick = async () => {
    await GetCurrentLocation();
    setMapRender(!MapRender);
  }
  const handleShow = () => setShowModal(true);
  // State for storing image preview URL
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, Image: file });

    // Generate image preview URL
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();


    try {
      const response = await axios.get(`https://api.olamaps.io/places/v1/reverse-geocode`, {
        params: {
          latlng: `${Marker.lat},${Marker.lng}`,
          api_key: process.env.REACT_APP_OLA_PLACE,
        },
      });
      if (response.data.status === 'ok') {
        let address = response.data.results[0].formatted_address;
        const parts = address.split(',').map(part => part.trim());
        // Extract city, state, country, and pincode
        formData.City = parts[parts.length - 4]; // Second last part
        formData.State = parts[parts.length - 3]; // Last part before pincode
      }
      // Append each form field to the FormData object
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append('Latitude', Marker.lat);
      formDataToSend.append('Longitude', Marker.lng);
      // Log the FormData object for debugging (this won't show the contents directly, but it's a good practice)
      console.log('Form Submitted:', Array.from(formDataToSend.entries()));
      // Send the FormData object using axios without wrapping it in an additional object
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/formsubmit`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(res.data.code<=210){
        console.log("Form Submitted");
      }else{
        console.log('Error in submitting form');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form-wrapper" id="feedback">
      <MapModel />
      <h2 className="form-title">Submit Feedback on Road Conditions</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="Input-Container">
          <label className="label" htmlFor="Name">Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            className="input"
          />
        </div>

        {/* Email Field */}
        <div className="Input-Container">
          <label className="label" htmlFor="Email">Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
            className="input"
          />
        </div>

        {/* Number Field */}
        <div className="Input-Container">
          <label className="label" htmlFor="Number">Number</label>
          <input
            type="number"
            name="Number"
            value={formData.Number}
            onChange={handleInputChange}
            placeholder="Your Mobile No :"
            required
            className="input"
          />
        </div>

        {/* Category Field */}
        <div className="Input-Container">
          <label className="label" htmlFor="Category">Category</label>
          <select name="Category" id="category" className="select" defaultValue={'Potholes'} onChange={handleInputChange}>
            <option value="Pothole" >Pothole</option>
            <option value="Cracks">Cracks</option>
            <option value="Blocked-road">Blocked Road</option>
            <option value="Flooding">Flooding</option>
            <option value="Traffic-signs">Missing/Damaged Traffic Signs</option>
            <option value="Street-lights">Street Lights Issue</option>
          </select>
        </div>
        <div className="Input-Container">
          <label className="label" htmlFor="Severity" >Severity</label>
          <select name="Saverity" id="Saverity" className="select" defaultValue={"Low"} onChange={handleInputChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Description Field */}
        <div className="Input-Container">
          <label className="label" htmlFor="Description">Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            placeholder="Describe the issue..."
            className="textarea"
            cols={10}
          />
        </div>

        {/* Image Upload Field */}
        <div className="Input-Container-Image">
          <label className="label">Upload Image</label>
          <input type="file" name="Image" onChange={handleImageChange} className="input" required />

          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Selected" width="200px" height="auto" />
            </div>
          )}
        </div>
        <div className="Input-Container-map">
          <div className='Input-Container-latLng'>
            <div className='Input-Container'>
              <label className="label">Latitude</label>
              <input type="number" name="Latitude" value={Marker.lat} className="input" readOnly />
            </div>
            <div className='Input-Container'>

              <label className="label">Longitude</label>
              <input type="number" name="Longitude" value={Marker.lng} className="input" readOnly />
            </div>
            <div>

              <button type="button" className="btn btn-toggle-map" onClick={() => { handleShow(); HandleLocationClick(); }}>
                Location
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">Submit Report</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
