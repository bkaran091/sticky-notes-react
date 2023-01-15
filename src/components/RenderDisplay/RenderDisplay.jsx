import React from "react";
import "./RenderDisplay.css";

const RenderDisplay = (props) => {
  const {
    myNote,
    style,
    children,
    edit,
    remove,
    note,
    setNote,
    save,
    editing,
  } = props;

  return (
    <div ref={myNote} className="note"  style={style}>
      <div>
        <textarea
          value={note}
          disabled={!editing}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          className="form-control"
        />
        <div style={{ height: 80 }}></div>
        {editing ? (
          <span>
            <button onClick={() => save()}>save</button>
          </span>
        ) : (
          <span>
            <button onClick={() => edit()}>edit</button>

            <button onClick={() => remove()}>delete</button>
          </span>
        )}
      </div>
    </div>
  );
};

export default RenderDisplay;
