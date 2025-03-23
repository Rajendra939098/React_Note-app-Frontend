import React, { useState } from "react";
import NoteCardContainer from "../components/NoteCardContainer";
import Filter from "../components/Filter";

const HomePage = ({ notes,loading }) => {
  const [category, setCategory] = useState("all");

  console.log("HomePage received notes:", notes);  // Debugging

  const filteredNotes = category === "all" 
    ? notes 
    : notes.filter(note => note.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="home-page">
      <Filter setCategory={setCategory} />
      {filteredNotes.length > 0 ? (
        <NoteCardContainer notes={filteredNotes} loading={loading} />
      ) : (
        <p>No notes available.</p>  // Display message if no notes
      )}
    </div>
  );
};

export default HomePage;
