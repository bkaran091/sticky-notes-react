import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import "./Note.css";
import RenderDisplay from "../RenderDisplay/RenderDisplay";

const Note = (props) => {
  const {
    index,
    id,
    updateNote,
    removeNote,
    children,
    initialStyle,
    groups: existingGroups,
    addNotesToGroup,
    removeNotesFromAllGroups,
    changeStyle,
    zIndex,
    setZIndex,
    changeGroupId,
  } = props;

  const [note, setNote] = useState(children);
  const [editing, setEditing] = useState(false);
  const [style, setStyle] = useState(initialStyle);

  const myNote = useRef(null);

  const drag = (e, ui) => {
    let pos = $(myNote.current).position();
    setStyle({
      ...style,
      top: pos.top,
      left: pos.left,
    });
    changeStyle(id, {
      ...style,
      top: pos.top,
      left: pos.left,
    });

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
    if (group.length > 0) {
      let groupId = group[0].id;
      addNotesToGroup(groupId, id);
      changeGroupId(id, groupId);
    } else {
      changeGroupId(id, "board");
    }
  };

  const start = (e, ui) => {
    $(myNote.current).css("z-index", zIndex);
    setZIndex(zIndex + 1);
    removeNotesFromAllGroups(id);
  };

  useEffect(() => {
    let mine = myNote;

    if (mine) {
      $(mine.current).draggable({
        handle: "div",
        stop: drag,
        start: start,
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
    updateNote(index, note);
    setEditing(false);
  };

  return (
    <RenderDisplay
      myNote={myNote}
      style={style}
      children={children}
      edit={edit}
      remove={remove}
      setNote={setNote}
      note={note}
      editing={editing}
      save={save}
    />
  );
};

export default Note;
