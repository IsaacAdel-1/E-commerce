import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import "./ProfileSettings.css";
import { UpdateUserData } from "../../../Services/constants";

const ProfileSettings = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact_number: "",
        birth_date: "",
        Gender: "",
        language: "English",
        currency: "USD",
    });

    useEffect(() => {
        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUserData(parsedUser);
            setFormData({
                firstName: parsedUser.name?.split(" ")[0] || "",
                lastName: parsedUser.name?.split(" ")[1] || "",
                email: parsedUser.email || "",
                contact_number: parsedUser.contact_number || "",
                birth_date: parsedUser.birth_date || "",
                Gender: parsedUser.Gender || "Male",
                language: parsedUser.language || "English",
                currency: parsedUser.currency || "USD",
            });
        }
    }, []);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const getInitials = () => {
        const first = formData.firstName?.[0] || "";
        const last = formData.lastName?.[0] || "";
        return (first + last).toUpperCase() || "?";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact_number: formData.contact_number,
            birth_date: formData.birth_date,
            Gender: formData.Gender,
            language: formData.language,
            currency: formData.currency,
        };

        const isEqual = JSON.stringify(userData) === JSON.stringify(updatedData);
        if (isEqual) {
            alert("No changes made");
            setLoading(false);
            return;
        }

        try {
            localStorage.setItem("userData", JSON.stringify(updatedData));
            const response = await fetch(UpdateUserData, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            const signal = await response.json();
            if (signal.status === "success") {
                setUserData(updatedData);
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } else {
                alert("Error updating profile");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ps-page">
            <div className="ps-header">
                <h2>Profile Settings</h2>
                <p>Manage your personal information and preferences</p>
            </div>

            {/* Avatar Card */}
            <div className="ps-card ps-avatar-row">
                <div className="ps-avatar">{getInitials()}</div>
                <div className="ps-avatar-info">
                    <h3>{formData.firstName} {formData.lastName}</h3>
                    <p>{formData.email}</p>
                </div>
                <button type="button" className="ps-avatar-btn">
                    <span className="ps-icon">📷</span>
                    Change photo
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="ps-card">
                    <div className="ps-card-title">Personal Information</div>
                    <div className="ps-form-grid">
                        <div className="ps-form-group">
                            <label>First name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter first name"
                                value={formData.firstName}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="ps-form-group">
                            <label>Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                value={formData.lastName}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="ps-form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="ps-form-group">
                            <label>Phone number</label>
                            <input
                                type="tel"
                                name="contact_number"
                                placeholder="+1 000 000 0000"
                                value={formData.contact_number}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="ps-form-group">
                            <label>Date of birth</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="ps-form-group">
                            <label>Gender</label>
                            <select
                                name="Gender"
                                value={formData.Gender}
                                onChange={handleChanges}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="ps-card">
                    <div className="ps-card-title">Preferences</div>
                    <div className="ps-form-grid">
                        <div className="ps-form-group">
                            <label>Language</label>
                            <select name="language" value={formData.language} onChange={handleChanges}>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Spanish">Spanish</option>
                                <option value="German">German</option>
                            </select>
                        </div>
                        <div className="ps-form-group">
                            <label>Currency</label>
                            <select name="currency" value={formData.currency} onChange={handleChanges}>
                                <option value="USD">USD — US Dollar</option>
                                <option value="EUR">EUR — Euro</option>
                                <option value="GBP">GBP — British Pound</option>
                                <option value="JPY">JPY — Japanese Yen</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="ps-footer">
                    <span className="ps-secure-note"><FaLock /> Your data is encrypted and secure</span>
                    <button className="ps-save-btn" type="submit" disabled={loading}>
                        {loading ? "Saving..." : saved ? "✓ Saved!" : "Save changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;