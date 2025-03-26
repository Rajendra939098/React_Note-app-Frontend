import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { toast } from 'react-toastify';
import EditNotePage from "./pages/EditNotePage";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [filterText,setFilterText]=useState("");
  const [searchText,setSearchText]=useState("");

  const handleFilterText=(val)=>{
    setFilterText(val)
  }

  const handleSearchText=(val)=>{
    setSearchText(val)
  }


const FilteredNote=
  filterText === "BUSINESS" ? notes.filter((note)=>note.category == 'BUSINESS') : filterText === 'PERSONAL' ? notes.filter((note)=>note.category == 'PERSONAL'): filterText === 'IMPORTANT' ? notes.filter((note)=>note.category == 'IMPORTANT'):notes;

  useEffect(() => {
    if (searchText.length < 3) return;
  
    axios.get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
      .then(res => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch(err => console.log(err.message));
  }, [searchText]);



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

  const Updatednote=(data,slug)=>{
      axios.put(`http://127.0.0.1:8000/notes/${slug}/`,data)
      .then(res=>{
        console.log(res.data)
        toast.success('Note Updated Sucess')
      })
      .catch(err=>{
        console.log(err.message)
      })
  }

  const DeleteNote=(slug)=>{
    axios.delete(`http://127.0.0.1:8000/notes/${slug}/`)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>(console.log(err.message)))
  }

  return (
    <Router>
      <Navbar searchText={searchText} handleSearchText={handleSearchText} /> {/* Navbar will be displayed on all pages */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage notes={FilteredNote} loading={isLoading} handleFilterText={handleFilterText} />} />
          <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
          <Route path="/edit-note/:slug" element={<EditNotePage Updatednote={Updatednote}/>}/>
          <Route path='/notes/:slug' element={<NoteDetailPage DeleteNote={DeleteNote}/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
