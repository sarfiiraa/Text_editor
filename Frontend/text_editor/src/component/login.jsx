// Step 2: React Frontend Setup (React + Firebase Auth)
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";

import { auth } from "./fireBaseConfig"

import { useNavigate } from "react-router-dom";
import "./style.css"


const provider = new GoogleAuthProvider();

const Login = ({ setUser, setToken }) => {
    

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const token = await user.getIdToken();
            
            // Pass data to parent (App.js)
            setUser(user);
            setToken(token);
            
            console.log("Logged in user:", user);

            // Redirect to Dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    // const handleLogout = async () => {
    //     await signOut(auth);
    //     setUser(null);
    //     setToken(null);
    // };


    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            
            <>
                {/* <h1>Google Authentication with Firebase</h1>
                <button onClick={handleLogin}>Login with Google</button> */}
                <div class="container">
                    <div class="form-box">
                        <h2>Sign In</h2>
                        <p>Use your Google account to continue</p>
                        <button class="google-btn" onClick={handleLogin}>
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon"/>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Login;

