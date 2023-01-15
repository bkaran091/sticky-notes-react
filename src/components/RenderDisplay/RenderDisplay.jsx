import React from "react";

const RenderDisplay = (props) => {
  const { myNote, style, children, edit, remove } = props;

  return (
    <div ref={myNote} className="note" style={style}>
      <p style={{ paddingBottom: 40 }}>{children}</p>
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
