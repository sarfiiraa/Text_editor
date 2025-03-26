import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./component/login";
import TextEditor from "./component/textEditor";
import FileList from "./component/fileList";
import { useState } from "react";
import Dashboard from "./component/dashboard";

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

  return (
    <>
      {/* <main className="App  relative"> */}
      <main>
      <Routes>
        {/* <Route path="/*" element={<Login />}/> */}
        <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} setToken={setToken} />}
        />
        <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} setToken={setToken} token={token} /> : <Navigate to="/" />} />
          
        <Route path="/textEditor" element={<TextEditor token={token}/>}/>
        <Route path="/files" element={<FileList token={token}/>}/>
        
        
      </Routes>
    </main>
    </>
  )
}

export default App
