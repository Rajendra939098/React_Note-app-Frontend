import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { toast } from 'react-toastify';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios.get("http://127.0.0.1:8000/notes/")
      .then(res => {
        console.log("Fetched Notes:", res.data);
        setNotes(Array.isArray(res.data) ? res.data : []);
        setIsLoading(false)
      })
      .catch(err => console.log("Error fetching notes:", err.message));
  }, []);

  const addNote=(data)=>{
    axios.post('http://127.0.0.1:8000/notes/',data)
    .then(res =>{
      setNotes([...notes, res.data]);
      toast.success('A new note has been added');
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err.message)
    })
  }

  return (
    <Router>
      <Navbar /> {/* Navbar will be displayed on all pages */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage notes={notes} loading={isLoading} />} />
          <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
          <Route path='/notes/:slug' element={<NoteDetailPage/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
