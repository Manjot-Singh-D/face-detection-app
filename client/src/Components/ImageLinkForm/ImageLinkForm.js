import React from "react";
import "tachyons";
import "./ImageLinkForm.css";

const ImageLinkForm = (props) => {
  return (
    <div>
      <p className="f3">Enter the link of picture to detect the face</p>
      <div className="form center shadow-3 pa4 w-60">
        <input
          onChange={props.onImageUrlChange}
          className="shadow-2 tc br pa3 center w-80"
          type="text"
          value={props.imageInput}
        />
        <button
          onClick={props.onImageSubmit}
          className="center shadow-2 pa3 dib pointer link grow"
        >
          Detect
        </button>
        <br />
      </div>
    </div>
  );
};

export default ImageLinkForm;
