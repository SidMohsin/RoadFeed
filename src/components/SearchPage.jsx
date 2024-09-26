import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/StoreContext';

const SearchPage = () => {
    const [searchBy, setSearchBy] = useState('phone');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const { feedback,fetchFeedback } = useContext(Context);
    useEffect(() => {
        const fetchdata = async()=>{
            await fetchFeedback();
        }
        fetchdata();
    }, [])
    // Handle search logic based on the dropdown value
    const handleSearch = () => {
        let result = [];

        if (searchBy === 'phone') {
            result = feedback.filter(feedback => feedback?.Number.toString() === searchTerm);
        } else if (searchBy === 'email') {
            result = feedback.filter(feedback => feedback.Email === searchTerm);
        } else if (searchBy === 'feedbackId') {
            result = feedback.filter(feedback => feedback._id === searchTerm);
        }
        if(result.length===0){
            alert(`No data found with ${searchTerm}`)
        }
        setFilteredFeedbacks(result);
    };

    return (
        <div className="search-container">
            <h2>Search Feedbacks</h2>
            <div className="search-form">
                {/* <label>Search by: </label> */}
                <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="input-field">
                    <option value="phone">Phone Number</option>
                    <option value="email">Email</option>
                    <option value="feedbackId">Feedback ID</option>
                </select>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Enter ${searchBy === 'phone' ? 'Phone Number' : searchBy === 'email' ? 'Email' : 'Feedback ID'}`}
                    className="input-field"
                />

                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            {filteredFeedbacks.length > 0 ? (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact No.</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedbacks.map(feedback => (
                            <tr key={feedback._id}>
                                <td>{feedback.Name}</td>
                                <td>{feedback.Number}</td>
                                <td>{feedback.Email}</td>
                                <td>{feedback.City}, {feedback.State}</td>
                                <td>{feedback.Status}</td>
                                <td>
                                    <Link to={`/feedback/details/${feedback._id}`}>
                                        <button className="visit-button">View Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-results">No feedbacks found</div>
            )}
        </div>
    );
};

export default SearchPage;
