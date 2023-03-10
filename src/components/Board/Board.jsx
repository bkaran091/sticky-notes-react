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
    if (notesArray) {
      setNotesArray(notesArray);
    }
    if (groups) {
      setGroups(groups);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("notesArray", JSON.stringify(notesArray));
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [notesArray, groups]);

  const addGroup = (text) => {
    let arr = [...groups];
    arr.push({
      id: uuid(),
      text: `Group ${arr.length + 1}`,
      notesId: [],
      isChecked: true,
    });
    setGroups(arr);
  };

  const addNotesToGroup = (groupId, noteId) => {
    let arr = [...groups];
    arr.forEach((element) => {
      if (element.id == groupId) {
        element.notesId.push(noteId);
      }
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

  const changeGroupId = (noteId, groupId) => {
    let arr = [...notesArray];
    arr.forEach((element) => {
      if (element.id == noteId) {
        element.groupId = groupId;
      }
    });
    setNotesArray(arr);
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
      groupId: ["board"],
    });
    setNotesArray(arr);
  };

  const updateNote = (id, text) => {
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
        //check if note.groupId is checked in groups
        let isNoteInGroup = false;
        for (let i = 0; i < groups.length; i++) {
          if (groups[i].id == note.groupId && groups[i].isChecked) {
            isNoteInGroup = true;
            break;
          }
        }
        if (!isNoteInGroup && note.groupId != "board") {
          return null;
        }
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
            changeGroupId={changeGroupId}
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
          localStorage.clear();
          setNotesArray([]);
          setGroups([]);
        }}
      >
        Clear Board
      </button>
      <div className="checkbox-container">
        {groups.map((element, i) => {
          return (
            <div className="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                defaultChecked={element.isChecked}
                onChange={(e) => {
                  let arr = [...groups];
                  arr[i].isChecked = e.target.checked;
                  setGroups(arr);
                }}
              />
              <label for="checkbox">{element.text}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
