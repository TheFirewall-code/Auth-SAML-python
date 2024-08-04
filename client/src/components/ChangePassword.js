import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const changePassword = async (e) => {
        e.preventDefault();

        // Frontend validation for password match
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        // Add more validation if needed (e.g., password strength)

        try {
            await axios.post('http://localhost:8000/auth/admin/change/pass', {
                password: newPassword
            });

            alert("Password changed successfully");
            navigate('/login'); // Redirect to login or another route as needed
        } catch (error) {
            console.error('Password change error:', error);
            alert("Failed to change password. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-thin mb-4">Change Password</h2>
                <form onSubmit={changePassword} className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-md mb-2 font-light bg-blue-600 w-full py-2 text-white hover:bg-blue-800"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
