import React, { useEffect, useState } from "react";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";
import Clarifai from "clarifai";
import axios from "axios";

const app = new Clarifai.App({ apiKey: "08ea6eb09e49438c9b73de18bdcb1707" });

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});

  useEffect(() => {
    const url = window.location.href;
    const params = url.split("/");
    const uuid = params[params.length - 1];
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/${uuid}`).then((res) => {
      setUserDetails(res.data[0]);
    });
  }, []);
  const handleLogout = () => {
    window.location.href = "/";
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * width,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  const displayFaceBox = (box) => {
    setBox(box);
  };
  const onImageUrlChange = (e) => {
    setImageInput(e.target.value);
  };
  const onImageSubmit = (e) => {
    e.preventDefault();
    setImageUrl(imageInput);
    if (imageInput !== "") {
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, imageInput)
        .then((response) => displayFaceBox(calculateFaceLocation(response)))
        .catch((err) => console.log(err));
    }
  };
  if (!userDetails) {
    // <LoadingPage />;
    return null;
  } else {
    return (
      <div className="h-100">
        <Navigation page={"dashboardPage"} handleLogout={handleLogout} />
        <div className="h-100">
          <Logo />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: "0.1px",
            }}
          >
            <p
              style={{
                color: "black",
                fontSize: "2rem",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Hello {userDetails.name}
            </p>
            <p style={{ color: "#044654" }}>Hope you enjoy here!!</p>
          </div>

          <ImageLinkForm
            onImageUrlChange={onImageUrlChange}
            imageInput={imageInput}
            onImageSubmit={onImageSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
      </div>
    );
  }
};
export default DashboardPage;
