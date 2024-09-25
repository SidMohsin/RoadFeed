import React, { useContext, useState } from 'react';
import { Context } from '../Context/StoreContext';

const FeedbackForm = () => {
  const {ShowMap,setShowMap} = useContext(Context);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Number: 0,
    City: "",
    State: "",
    Latitude: -1,
    Longitude: -1,
    Description: "",
    image: null
  });

  // State for storing image preview URL
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const HandlemapModel = () => {
    setShowMap(true)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    // Generate image preview URL
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Implement the API to submit the feedback and image to the server
  };

  return (
    <div className="form-wrapper" id="feedback">
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
          <select name="Category" id="category" className="select">
            <option value="pothole">Pothole</option>
            <option value="cracks">Cracks</option>
            <option value="blocked-road">Blocked Road</option>
            <option value="flooding">Flooding</option>
            <option value="traffic-signs">Missing/Damaged Traffic Signs</option>
            <option value="street-lights">Street Lights Issue</option>
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
            required
            className="textarea"
            cols={10}
          />
        </div>

        {/* Image Upload Field */}
        <div className="Input-Container-Image">
          <label className="label">Upload Image</label>
          <input type="file" name="image" onChange={handleImageChange} className="input" />

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
              <input type="number" name="Latitude" onChange={handleImageChange} className="input" readOnly />

            </div>
            <div className='Input-Container'>

              <label className="label">Longitude</label>
              <input type="number" name="Longitude" onChange={handleImageChange} className="input" readOnly />
            </div>
          </div>
          <button className='' onClick={HandlemapModel}>Detect Location</button>
        </div>

        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
