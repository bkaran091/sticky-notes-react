import React from "react";
import "./RenderForm.css";
const RenderForm = (props) => {
  const { myNote, style, setNote, note, save } = props;
  return (
    <div ref={myNote} className="note" style={style}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="form-control"
      ></textarea>
      <button
        className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"
        onClick={() => save()}
      >
        save
      </button>
    </div>
  );
};

export default RenderForm;
