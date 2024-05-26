import React, { useState, useEffect } from "react";
import "./App.css";
import typingBubble from "./typing-bubble.gif";
import messageSound from "./message-sent-sound.wav";
import messageTail from "./message-tail.png";
import { FaArrowCircleUp } from "react-icons/fa";

function App() {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submittedValues, setSubmittedValues] = useState([]);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const messageSoundEffect = new Audio(messageSound);
  useEffect(() => {
    messageSoundEffect.addEventListener("ended", () => {
      messageSoundEffect.currentTime = 0;
    });
  }, [messageSoundEffect]);

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() !== "") {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newSubmittedValue = inputValue;
    if (inputValue !== "") {
      setSubmittedValues((prevValues) => [...prevValues, newSubmittedValue]);
      messageSoundEffect.play();
    }

    setInputValue("");
    setIsTyping(false);

    setTimeout(() => {
      setSubmittedValues((prevValues) =>
        prevValues.filter((value) => value !== newSubmittedValue)
      );
    }, 10000);
  };

  return (
    <div className="h-screen w-screen bg-[#00A537] flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center gap-x-3 gap-y-2">
        <input
          type="text"
          placeholder="Name"
          onChange={handleInputName}
          className="rounded-full px-3 bg-transparent border border-white text-white text-center"
        ></input>
        <div className="cursor-pointer relative bg-transparent border border-white rounded-full">
          <div className="absolute inset-0 text-white align-middle text-center">Upload Profile Picture</div>
          <input type="file" onChange={handleInputProfilePic} className="opacity-0 w-[200px]"></input>
        </div>
      </div>

      <div className="h-4/5 w-[500px] flex flex-col justify-between">
        <div className="relative flex justify-end flex-col h-[90%] p-10">
          <div className="relative">
            {submittedValues.length > 0 && (
              <p className="text-xs ml-3 -my-[6px] text-gray-500">{name}</p>
            )}
            {submittedValues &&
              submittedValues.map((value, index) => (
                <>
                  <div
                    key={index}
                    className="bg-white rounded-2xl w-fit max-w-[350px] h-auto px-4 py-1 my-2"
                  >
                    <p>{value}</p>
                    <img
                      src={messageTail}
                      alt=""
                      className="w-4 absolute -left-1 bottom-2"
                    />
                  </div>
                </>
              ))}
          </div>
          <div>
            {isTyping && (
              <img src={typingBubble} alt="typing-bubble" className="w-12" />
            )}
          </div>
          {submittedValues.length > 0 && (
            <div className="w-10 h-10 absolute -left-2 bottom-[45px]">
              <img
                src={profilePic}
                alt="profilePic"
                className="w-full h-full rounded-full"
              />
            </div>
          )}
        </div>
        <div className="h-[10%] p-3 flex justify-center items-center">
          <form
            onSubmit={handleFormSubmit}
            className="border-zinc-200 border-2 rounded-full flex items-center justify-between w-4/5 h-4/5"
          >
            <label className="w-full">
              <input
                type="text"
                id="message"
                className="px-2 rounded-full bg-[#00000000] outline-none w-full"
                autoComplete="off"
                value={inputValue}
                onChange={handleInputChange}
              ></input>
            </label>
            {/* <button
              type="submit"
              className="text-[#0C7DFF] text-3xl ml-2 mr-[2px] align-middle rounded-full hover:text-[#0261CE]"
            >
              <FaArrowCircleUp />
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
