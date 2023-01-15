import React, { useState } from "react";
import Group from "../Group/Group";
import Note from "../Note/Note";
import "./Board.css";

const Board = () => {
  const [notesArray, setNotesArray] = useState([]);
  const [groups, setGroups] = useState([]);

  const addGroup = (text) => {
    let arr = [...groups];
    arr.push({ id: Math.random(), text: text });
    setGroups(arr);
  };

  const randomBetween = (min, max) => {
    return min + Math.ceil(Math.random() * max);
  };

  const addNote = (text) => {
    let arr = [...notesArray];
    arr.push({
      id: Math.random(),
      text: text,
      style: {
        right: randomBetween(0, window.innerWidth / 2 - 150) + "px",
        top: randomBetween(0, window.innerHeight - 150) + "px",
        transform: "rotate( " + randomBetween(-15, 15) + "deg)",
      },
    });
    setNotesArray(arr);
  };

  console.log("notesArray", notesArray);

  const updateNote = (id, text) => {
    console.log("updateNote", id, text);
    let arr = [...notesArray];
    arr.forEach((element) => {
      if (element.id === id) {
        element.text = text;
      }
    });
    setNotesArray(arr);
  };

  const removeNote = (id) => {
    let arr = [...notesArray];
    arr.forEach((element, index) => {
      if (element.id === id) {
        arr.splice(index, 1);
      }
    });
    setNotesArray(arr);
  };

  return (
    <div className="board">
      {notesArray.map((note, index) => {
        return (
          <Note
            index={note.id}
            key={note.id}
            note={note}
            updateNote={updateNote}
            removeNote={removeNote}
            initialStyle={note.style}
          >
            {note.text}
          </Note>
        );
      })}
      <div className="group-container">
        {groups.map((element, i) => {
          return <Group key={element.id} index={i} id={element.id} />;
        })}
      </div>

      <button className="add-note-icon" onClick={() => addNote("New Note!")}>
        +
      </button>
      <button
        className="add-group-icon"
        onClick={() => addGroup("New Group 1!")}
      >
        ++
      </button>
    </div>
  );
};

export default Board;
