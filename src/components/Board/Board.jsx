import React, { useState, useEffect } from "react";
import Group from "../Group/Group";
import Note from "../Note/Note";
import "./Board.css";
import uuid from "react-uuid";

const Board = () => {
  const [notesArray, setNotesArray] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [zIndex, setZIndex] = useState(100);

  useEffect(() => {
    const notesArray = JSON.parse(localStorage.getItem("notesArray"));
    const groups = JSON.parse(localStorage.getItem("groups"));
    debugger;
    if (notesArray) {
      setNotesArray(notesArray);
    }
    if (groups) {
      setGroups(groups);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(notesArray, groups);
    if (!isLoading) {
      localStorage.setItem("notesArray", JSON.stringify(notesArray));
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [notesArray, groups]);

  console.log("groups", groups);
  console.log("notesArray", notesArray);

  const addGroup = (text) => {
    let arr = [...groups];
    arr.push({ id: uuid(), text: text, notesId: [] });
    setGroups(arr);
  };

  const addNotesToGroup = (groupId, noteId) => {
    let arr = [...groups];
    arr.forEach((element) => {
      console.log("element", element, groupId, noteId);
      if (element.id == groupId) {
        element.notesId.push(noteId);
      }
      console.log("element", element);
    });
    setGroups(arr);
  };

  const removeNotesFromAllGroups = (noteId) => {
    let arr = [...groups];
    arr.forEach((element) => {
      element.notesId.forEach((note, index) => {
        if (note == noteId) {
          element.notesId.splice(index, 1);
        }
      });
    });
    setGroups(arr);
  };

  const randomBetween = (min, max) => {
    return min + Math.ceil(Math.random() * max);
  };

  const colors = ["#fdc5f5", "#f7aef8", "#b388eb", "#8093f1", "#72ddf7"];

  const addNote = (text) => {
    let arr = [...notesArray];
    arr.push({
      id: uuid(),
      text: text,
      style: {
        right: randomBetween(0, window.innerWidth / 2 - 150) + "px",
        top: randomBetween(0, window.innerHeight - 150) + "px",
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      },
    });
    setNotesArray(arr);
  };

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

  const changeStyle = (id, style) => {
    let arr = [...notesArray];
    arr.forEach((element) => {
      if (element.id == id) {
        element.style = style;
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
            id={note.id}
            key={note.id}
            note={note}
            updateNote={updateNote}
            removeNote={removeNote}
            initialStyle={note.style}
            changeStyle={changeStyle}
            groups={groups}
            addNotesToGroup={addNotesToGroup}
            removeNotesFromAllGroups={removeNotesFromAllGroups}
            zIndex={zIndex}
            setZIndex={setZIndex}
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
        Add Note
      </button>
      <button
        className="add-group-icon"
        onClick={() => addGroup("New Group 1!")}
      >
        Add Group
      </button>
      <button
        className="clear-board-icon"
        onClick={() => {
          //clear local storage
          localStorage.clear();
          //clear state
          setNotesArray([]);
          setGroups([]);
        }}
      >
        Clear Board
      </button>
    </div>
  );
};

export default Board;
