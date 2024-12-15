import React, { useState } from "react";
import Pen from "../../assets/penis.png";
import pewSound from "../../assets/pew.mp3";
const getRandomEdgePosition = () => {
  const screenHeight = window.innerHeight;
  return {
    left: 0,
    top: Math.random() * screenHeight
  };
};
export const Button = ({
  buttonText = "Click to Animate",
  buttonStyle = {}
}) => {
  const [showImages, setShowImages] = useState([]);
  const handleClick = () => {
    const id = Date.now();
    const startPosition = getRandomEdgePosition();
    const newImage = {
      id,
      startPosition
    };
    setShowImages(prev => [...prev, newImage]);
    const audio = new Audio(pewSound);
    audio.play();
    setTimeout(() => {
      setShowImages(prev => prev.filter(img => img.id !== id));
    }, 15000);
  };
  const waveAnimation = {
    position: "absolute",
    height: "100px",
    animation: "waveEffect 2s ease-in-out infinite, moveAcross 5s linear forwards"
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick,
    style: {
      ...buttonStyle,
      padding: "20px",
      fontSize: "24px"
    }
  }, buttonText), showImages.map(img => /*#__PURE__*/React.createElement("img", {
    key: img.id,
    src: Pen,
    alt: "Pen",
    style: {
      ...img.startPosition,
      ...waveAnimation
    }
  })), /*#__PURE__*/React.createElement("style", null, `
          @keyframes waveEffect {
            0% {
              transform: translateY(0) rotate(-25deg);
            }
            25% {
              transform: translateY(-50px) rotate(-25deg);
            }
            50% {
              transform: translateY(0) rotate(25deg);
            }
            75% {
              transform: translateY(50px) rotate(25deg);
            }
            100% {
              transform: rotate(-25deg);
            }
          }

          @keyframes moveAcross {
            0% {
              left: 0;
            }
            50% {
              left: 50%;
              opacity: 0.5;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }
        `));
};