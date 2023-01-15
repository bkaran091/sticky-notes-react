import React from "react";

const RenderDisplay = (props) => {
  const { myNote, style, children, edit, remove, note, setNote, save } = props;

  return (
    <div ref={myNote} className="note" style={style}>
      <input
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
        className="form-control"
      />
      <div style={{ height: 80 }}></div>

      <span>
        <button
          onClick={() => edit()}
          className="btn btn-primary glyphicon glyphicon-pencil"
        >
          edit
        </button>

        <button
          onClick={() => remove()}
          className="btn btn-danger glyphicon glyphicon-trash"
        >
          delete
        </button>
      </span>
    </div>
  );
};

export default RenderDisplay;
