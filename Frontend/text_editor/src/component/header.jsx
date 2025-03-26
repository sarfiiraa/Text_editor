import React from "react";


const Header = ({ user, handleLogout, setActiveComponent }) => {


    return (
        <header style={styles.header}>
            <h2 style={styles.logo}>My App</h2>
            <nav style={styles.nav}>
                {/* <a href="/files" style={styles.link}>Files</a>
                <a href="/textEditor" style={styles.link}>Text Editor</a> */}
                {/* <a href="/textEditor" style={styles.link} onClick={() => setActiveComponent("editor")}>Text Editor</a>
                <a href="/files" style={styles.link} onClick={() => setActiveComponent("files")}>Files</a> */}
                <h6 style={styles.link} onClick={() => setActiveComponent("editor")}>Text Editor</h6>
                <h6 style={styles.link} onClick={() => setActiveComponent("files")}>Files</h6>
            </nav>
            {user && (
                <div style={styles.userInfo}>
                    <img src={user.photoURL} alt="Profile" style={styles.profileImage} />
                    <span style={styles.userName}>Welcome, {user.displayName}</span>
                    <button onClick={handleLogout} style={styles.logoutButton}>Sign Out</button>
                </div>
            )}
        </header>
    );
};

// const styles = {
//     header: {
//         // position: "fixed",
//         // top: 0,
//         // left: 0,
//         // width: "100%",
//         // backgroundColor: "#282c34",
//         // color: "white",
//         // display: "flex",
//         // justifyContent: "space-between",
//         // alignItems: "center",
//         // padding: "10px 20px",
//         // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//         // zIndex: 1000,
//         position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             backgroundColor: "#333",
//             color: "white",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             padding: "10px 20px",
//             boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             zIndex: 1000, // Ensures it stays above other content
//     },
//     logo: {
//         fontSize: "20px",
//         fontWeight: "bold",
//     },
    // nav: {
    //     display: "flex",
    //     gap: "20px",
    // },
//     link: {
//         color: "white",
//         textDecoration: "none",
//         fontSize: "16px",
//         fontWeight: "bold",
//     },
//     userInfo: {
//         display: "flex",
//         alignItems: "center",
//         gap: "15px",
//     },
//     profileImage: {
//         width: "40px",
//         height: "40px",
//         borderRadius: "50%",
//     },
//     userName: {
//         fontSize: "14px",
//     },
//     logoutButton: {
//         backgroundColor: "#ff4b5c",
//         color: "white",
//         border: "none",
//         padding: "8px 15px",
//         cursor: "pointer",
//         borderRadius: "5px",
//         fontSize: "14px",
//     },
// };

const styles = {
    header: {
        // display: "flex",
        // justifyContent: "space-between",
        // alignItems: "center",
        // padding: "10px 20px",
        // backgroundColor: "#333",
        // color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1px 20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000, // Ensures it stays above other content
        height: "8vh"
    },
    logo: {
        margin: 0,
        color: "white"
    },
    nav: {
        display: "flex",
        gap: "20px",
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginRight:"6vh"
    },
    profileImage: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
    },
    userName: {
        fontSize: "16px",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
        marginRight: "10px",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Header;
