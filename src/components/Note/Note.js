import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import "./Note.css";
import RenderForm from "../RenderForm/RenderForm";
import RenderDisplay from "../RenderDisplay/RenderDisplay";

const Note = (props) => {
  const { index, updateNote, removeNote, children, initialStyle } = props;

  const [note, setNote] = useState(children);
  const [editing, setEditing] = useState(false);
  const [style, setStyle] = useState(initialStyle);

  const myNote = useRef(null);

  const drag = (e, ui) => {
    let pos = $(myNote.current).position();
    console.log(pos);
    setStyle({
      ...style,
      top: pos.top,
      left: pos.left,
    });
    console.log("hello");

    let groups = $(".group");
    let group = $(".group").filter(function () {
      let pos = $(this).position();
      let width = $(this).width();
      let height = $(this).height();
      return (
        ui.position.left > pos.left &&
        ui.position.left < pos.left + width &&
        ui.position.top > pos.top &&
        ui.position.top < pos.top + height
      );
    });
    console.log(group.length);
    if (group.length > 0) {
      console.log(group);
      $(group).append(myNote.current);
      console.log("done");
    } else if (groups.has(myNote.current).length > 0) {
      $(myNote.current).appendTo(".board");
    }
  };

  useEffect(() => {
    let mine = myNote;
    if (mine) {
      $(mine.current).draggable({
        handle: "p",
        stop: drag,
      });
    }
  });

  const edit = () => {
    setEditing(true);
  };

  const remove = () => {
    removeNote(index);
  };

  const save = () => {
    console.log(note);
    updateNote(index, note);
    setEditing(false);
  };

  if (editing)
    return (
      <RenderForm
        myNote={myNote}
        style={style}
        setNote={setNote}
        note={note}
        save={save}
      />
    );
  else
    return (
      <RenderDisplay
        myNote={myNote}
        style={style}
        children={children}
        edit={edit}
        remove={remove}
      />
    );
};

export default Note;
