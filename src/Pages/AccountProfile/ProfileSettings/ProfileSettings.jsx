import { useState, useEffect } from "react";
import "./ProfileSettings.css";
import {UpdateUserData} from '../../../Services/constants'
const url = "https://www.canva.com/ai/code/thread/71507b40-d862-4984-bdac-9eea6e186924";

const ProfileSettings = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact_number: "",
        birth_date: "",
        Gender: "",
    });

    useEffect(() => {
        // اجيب البيانات من localStorage
        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            console.log(parsedUser);
            setUserData(parsedUser);
            setFormData({
                firstName: parsedUser.name?.split(" ")[0] || "",
                lastName: parsedUser.name?.split(" ")[1] || "",
                email: parsedUser.email || "",
                contact_number: parsedUser.contact_number || "",
                birth_date: parsedUser.birth_date || "",
                Gender: parsedUser.Gender || "",
            });
        } 
    }, []);

    const handleChanges = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedData = {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            contact_number: formData.contact_number,
            birth_date: formData.birth_date,
            Gender: formData.Gender,
        };
        const isEqual = JSON.stringify(userData) === JSON.stringify(updatedData);
        if (isEqual) {
            alert("No Changes Made");
            setLoading(false);
            return;
        }
        try {
           
                localStorage.setItem("userData", JSON.stringify(updatedData));
                
                const response = await fetch(
                    UpdateUserData,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    }
                );

                const signal = await response.json();
                console.log(signal);
                if (signal.status === "success") {
                    alert("Profile Updated Successfully");
                    setUserData(updatedData);
                } else {
                    alert("Error Updating Profile");
                }
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="profileSettingsContain">
                <h2>Profile Settings</h2>
                
                    
                    <form onSubmit={handleSubmit}>
                    <div className="personal_information">
                    <h3>Personal Information</h3>
                        <div className="form-row">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter First Name"
                                value={formData.firstName}
                                name="firstName"
                                onChange={(e) => handleChanges(e)}
                            />

                            {/* 
                                    Optional chaining (?.) prevents crash during first render.
                                    Component renders before useEffect loads data from localStorage,
                                    so userData.name is initially undefined. The ?. operator safely
                                    handles this by returning undefined instead of throwing an error.
                                    Once useEffect runs and updates state, component re-renders with actual data. */}
                        </div>

                        <div className="form-row">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Last Name"
                                value={formData.lastName}
                                name="lastName"
                                onChange={(e) => handleChanges(e)}
                            />
                        </div>

                        <div className="form-row">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email Address"
                                value={formData.email}
                                name="email"
                                onChange={(e) => handleChanges(e)}
                            />
                        </div>

                        <div className="form-row">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Enter Phone Number"
                                value={formData.contact_number}
                                name="contact_number"
                                onChange={(e) => handleChanges(e)}
                            />
                        </div>

                        <div className="form-row">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                value={formData.birth_date}
                                name="birth_date"
                                onChange={(e) => handleChanges(e)}
                            />
                        </div>

                        <div className="form-row">
                            <label>Gender</label>
                            <select
                                className="form-control"
                                value={formData.Gender}
                                name="Gender"
                                onChange={(e) => handleChanges(e)}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        </div>

                        <div className="preferences mt-4">
                            <h3>Preferences</h3>
                            
                            <div className="form-group">
                                <label>Language</label>
                                <select className="form-control">
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="German">German</option>
                                </select>

                                <label>Currency</label>
                                <select className="form-control">
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="JPY">JPY</option>
                                </select>
                            </div>
                        </div>
                        <div className="submitBtn d-flex justify-content-end w-100">
                            <button className="btn btn-primary w-25 " disabled={loading} type="submit" >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            
        </>
    );
};
export default ProfileSettings;
