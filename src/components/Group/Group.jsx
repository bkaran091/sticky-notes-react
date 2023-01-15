import React from "react";
import "./Group.css";

const Group = (props) => {
  const { index, id } = props;
  return (
    <div className="group" id={id}>
      <p>{`Group ${index}`}</p>
    </div>
  );
};

export default Group;
