import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import axios from "axios";
import { auth } from "./fireBaseConfig"
import TextEditor from "./textEditor";
import Header from "./header";
import FileList from "./fileList";
// import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setUser, setToken, token }) => {

    const [activeComponent, setActiveComponent] = useState("editor");

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setToken(null);
    };

    return (
        // <div style={{ textAlign: "center", marginTop: "50px" }}>
        //     <h1>Welcome to Dashboard</h1>
        //     <p>User: {user.displayName}</p>
        //     <img src={user.photoURL} alt="Profile" width="50" height="50" />
        //     <p>Email: {user.email}</p>
        //     <p>Token: {token.substring(0, 20)}...</p> {/* Display part of the token */}
        // </div>
        <>
            {/* <Header user={user} handleLogout={handleLogout} />
            <TextEditor/> */}
            <Header 
                user={user} 
                handleLogout={handleLogout} 
                setActiveComponent={setActiveComponent} 
            />
            {activeComponent === "editor" ? <TextEditor user={user} token={token}/> : <FileList user={user} token={token}/>}
        </>
    );
};

export default Dashboard;