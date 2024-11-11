import React, { useState, useEffect } from "react";
import style from "./Notes.module.css";
import enter from "../assets/Enter.png";
import enterActive from "../assets/enterActive.png";
import Card from "./Card";

export default function Notes({
  titleArr,
  store,
  storeNotes,
  isMobile,
  setIsMobile,
  size,
}) {
  const [textArea, setTextArea] = useState("");
  const [textArr, setTextArr] = useState(storeNotes);

  // Load notes when savedNotes changes
  useEffect(() => {
    setTextArr(storeNotes);
  }, [storeNotes]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(textArr));
  }, [textArr]);

  const handleChange = (e) => {
    setTextArea(e.target.value);
  };

  const handleEnter = () => {
    const { date, time } = getDateTime();
    const newNote = { textArea, date, time };
    const newItems = [...textArr, newNote];
    setTextArr(newItems);
    store(newItems);
    setTextArea("");
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (textArea.trim()) {
        handleEnter();
      }
    }
  };

  // Date and Time
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getDateTime = () => {
    const data = new Date();
    const date = data.getDate();
    const month = months[data.getMonth()];
    const year = data.getFullYear();
    const min =
      data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
    const hours = data.getHours();
    const ampm =
      hours < 12
        ? `${hours}:${min} AM`
        : `${hours - 12}:${min} PM` || (hours === 12 && `${hours}:${min} PM`);
    return { date: `${date} ${month} ${year}`, time: ampm };
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.heading}>
          {size < 989 && (
            <div className={style.button}>
              <button onClick={() => setIsMobile(!isMobile)}>←</button>
            </div>
          )}
          <div
            className={style.circle}
            style={{ backgroundColor: `${titleArr.titleColor}` }}
          >
            {titleArr.title}
          </div>
          <div className={style.name}>{titleArr.name}</div>
        </div>
        <div className={style.cardSection}>
          <Card textArr={textArr} />
        </div>
        <div className={style.footer}>
          <textarea
            placeholder="Enter your text here..........."
            onChange={handleChange}
            onKeyDown={handleEnterKey}
            value={textArea}
          ></textarea>
          {textArea === "" ? (
            <img
              src={enter}
              alt=""
              height="30px"
              width="30px"
              style={{ cursor: "not-allowed" }}
            />
          ) : (
            <img
              src={enterActive}
              alt=""
              height="30px"
              width="30px"
              onClick={handleEnter}
              onKeyDownCapture={handleEnterKey}
            />
          )}
        </div>
      </div>
    </>
  );
}
