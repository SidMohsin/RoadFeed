import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/StoreContext';
import axios from 'axios';

const AdministrationPage = () => {
    const { admins, AdminDetails } = useContext(Context);
    const [delet,setdelet] = useState(false)
    useEffect(() => {
        const fetchdata = async () => {
            await AdminDetails();
        }
        fetchdata();
    }, [delet])
    const navigate = useNavigate();
    const handleEdit = (id) => {
        alert(`Edit admin with ID: ${id}`);
    };
    const handleDelete = async(id) => {
        try {
            const resp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/Delete`, { id },{withCredentials:true})
            console.log(resp)
            if (resp.data.code <= 210) {
                alert(`${resp.data.status}`)
            } else {
                alert(`Error : ${resp.data.status}`)
            }
            setdelet(!delet)

        } catch (e) {

        }
    };


    const handleAddAdmin = () => {
        navigate('/signup')
    };

    return (
        <div className="container-admin">
            <div className="header-container">
                <h2>Administration</h2>
                <button className="add-button" onClick={handleAddAdmin}>Add Administrator</button>
            </div>
            <div className="content ">
                {
                    admins.length === 0 ?
                        "No other user" :

                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin) => (
                                        <tr key={admin._id}>
                                            <td>{admin.Name}</td>
                                            <td>{admin.Email}</td>
                                            <td>*********</td>
                                            <td>
                                                <button className="edit-button" onClick={() => handleDelete(admin._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </div>
    );
};

export default AdministrationPage;
