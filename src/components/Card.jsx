import React from "react";
import style from "./Card.module.css";

export default function Card({ textArr }) {
  return (
    <>
      <div>
        {textArr.map((item, index) => (
          <div className={style.card} key={index}>
            <span>{item.textArea}</span>
            <div className={style.dateInfo}>
              <span>{item.date}</span>
              <span>•</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
