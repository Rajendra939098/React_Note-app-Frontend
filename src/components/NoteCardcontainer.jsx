import React from 'react';
import NoteCard from './NoteCard';
import Loader from './Loader';

const NoteCardContainer = ({ notes = [],loading }) => {
  console.log("NoteCardContainer received notes:", notes); // Debugging

  if (!Array.isArray(notes) || notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <div className="container">
      <div className="note-has-grid row">
        {loading && <Loader loading={loading}/>}
        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NoteCardContainer;
