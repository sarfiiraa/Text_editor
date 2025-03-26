import { useState, useEffect } from "react";
import Header from "./header";
import axios from "axios";

const FileList=({user, token})=>{

    const[files, setFiles]=useState([]);


    useEffect(() => {
        if (user) {
            // axios.get(`http://localhost:8000/files/${user.email}`,{
                axios.get(`/files/${user.email}`,{
                headers: { authorization: `Bearer ${token}` }
            })
                .then(response => setFiles(response.data))
                .catch(error => console.error("Error fetching files:", error));
        }
    }, [user]);

    const handleDelete = async (fileId) => {
        try {
            // await axios.delete(`http://localhost:8000/delete/${fileId}`,{
                await axios.delete(`/delete/${fileId}`,{
                headers: { authorization: `Bearer ${token}` }
            }); // Adjust backend delete API
            setFiles(files.filter(file => file.fileId !== fileId)); // Remove deleted file from state
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };


    const styles = {
        container: {
            minWidth: "600px",
            margin: "100px auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fa",
        },
        heading: {
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
        },
        fileList: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        },
        fileItem: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        },
        fileLink: {
            textDecoration: "none",
            color: "#007bff",
            fontWeight: "bold",
        },
        deleteButton: {
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "3px",
            cursor: "pointer",
            transition: "background 0.3s ease",
        },
    };
    
    return (
        
        <div style={styles.container}>
            <h2 style={styles.heading}>Saved Letters</h2>
            <div style={styles.fileList}>
                {files.map(file => (
                    <div key={file.fileId} style={styles.fileItem}>
                        <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" style={styles.fileLink}>
                            {file.name}
                        </a>
                        <button onClick={() => handleDelete(file.fileId)} style={styles.deleteButton}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
    
}
export default FileList;