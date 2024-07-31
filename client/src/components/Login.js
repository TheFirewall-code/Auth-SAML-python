import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const loginWithOkta = () => {
        window.location.href = "http://localhost:8000/auth/login";
    };

    const loginWithUsernamePassword = (e) => {
        e.preventDefault();
        // Perform login with username and password
        console.log("Logging in with", { username, password });
        // Replace the following line with your login logic
        alert(`Logging in with username: ${username}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8">

            <div className="flex flex-col items-center justify-center bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-thin mb-4">Login</h2>
                <form onSubmit={loginWithUsernamePassword} className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-md mb-2 font-light bg-blue-600 w-full py-2 text-white hover:bg-blue-800"
                    >
                        Login with Username and Password
                    </button>
                    <p className="font-thin text-center mb-2">or</p>
                    <button
                    onClick={loginWithOkta}
                    className="text-md font-light bg-blue-600 w-full py-2 text-white hover:bg-blue-800"
                >
                    Login with Okta
                </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
