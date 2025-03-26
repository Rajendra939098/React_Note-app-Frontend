import React, { useState } from "react";
import NoteCardContainer from "../components/NoteCardContainer";
import Filter from "../components/Filter";

const HomePage = ({ notes,loading ,handleFilterText}) => {
  const [category, setCategory] = useState("all");

  console.log("HomePage received notes:", notes);  // Debugging

  const filteredNotes = category === "all" 
    ? notes 
    : notes.filter(note => note.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="home-page">
      
      {notes.length < 1 ? "" :<Filter setCategory={setCategory} handleFilterText={handleFilterText} />}
      <NoteCardContainer notes={filteredNotes} loading={loading} />
      
    </div>
  );
};

export default HomePage;
