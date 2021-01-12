import React from "react";

const CautionError = (props) => {
  return (
    <div
      style={{
        display: props.data.visible ? "flex" : "none",
        alignItems: "end",
        flexDirection: "row",
        background: "#ed80a1",
        justifyContent: "space-between",
        width: "300px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "10px",
        paddingRight: "20px",
      }}
    >
      <p style={{ color: "#fff", fontSize: "1.2rem" }}>{props.data.message}</p>
      <p
        style={{ color: "#fff", fontSize: "1.2rem", cursor: "pointer" }}
        onClick={props.removeError}
      >
        x
      </p>
    </div>
  );
};
export default CautionError;
