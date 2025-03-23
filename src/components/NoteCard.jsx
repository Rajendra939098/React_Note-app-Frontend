import React from 'react';
import { FaNoteSticky } from "react-icons/fa6";
import { MdMarkunread } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FormatDate } from './FormatDate';

const NoteCard = ({ note }) => {
  console.log("Rendering NoteCard:", note); // Debugging

  if (!note || Object.keys(note).length === 0) {
    return <p>Invalid Note Data</p>;
  }

  const getshortnote=(text)=>{
    if (!text) return "";
    const words=text.split(" ");
    return words.length >20 ? words.slice(0,20).join(" ")+"...":text;
  }

  const color=note.category == 'BUSINESS' ? 'blue' : note.category == 'PERSONAL' ? 'green' : 'purple'

  return (
    <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <span className="side-stick" style={{ backgroundColor: color }}></span>
        <FaNoteSticky style={{ marginLeft: "auto", color: color }} />
        <Link to={`/notes/${note.slug}`} style={{ textDecoration: 'none', color: 'black' }}>
          <h5 className="note-title text-truncate w-75 mb-0">{note.title}</h5>
        </Link>
        <p className="note-date font-12 text-muted">{FormatDate(note.created)}</p>
        <div className="note-content">
          <p className="note-inner-content text-muted">{getshortnote(note.body)}</p>
        </div>
        <div className="note-content">
          <p className="note-inner-content text-muted">{note.content}</p>
        </div>
        <div className="d-flex align-items-center">
          <Link to={`/notes/${note.slug}`}>
            <MdMarkunread style={{ fontSize: "25px", cursor: "pointer", color: color}} />
          </Link>
          <span className="mr-1"><i className="fa fa-trash remove-note"></i></span>
          <div className="ml-auto">
            <small className='text-muted'>{note.category}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
