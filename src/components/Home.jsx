import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Notes from "./Notes";
import HomeRight from "./HomeRight";

export default function Home({ click, arr, size }) {
  const [openNotes, setOpenNotes] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isActive, setIsActive] = useState([]);
  const [ActiveNotes, setActiveNotes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => {
    click(true);
  };

  const handleTitleClick = (name, titleColor, title) => {
    setIsActive({ name, titleColor, title });
    setOpenNotes(true);
  };

  const handleSaveNote = (updatedNotes) => {
    if (isActive) {
      localStorage.setItem(isActive.name, JSON.stringify(updatedNotes));
    }
    setActiveNotes(updatedNotes);
  };

  useEffect(() => {
    if (isActive) {
      const savedNotes = JSON.parse(localStorage.getItem(isActive.name)) || [];
      setActiveNotes(savedNotes);
    }
  }, [isActive]);

  return (
    <>
      {size < 989 ? (
        <div className={styles.page}>
          {/* Left Container */}
          <div className={`${styles.left} ${isMobile ? styles.display : ""}`}>
            <h1 className={styles.heading}>Pocket Notes</h1>
            <div className={styles.container}>
              <div className={styles.list}>
                <ul>
                  {arr.map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedButton === index ? styles.selected : ""
                      }`}
                    >
                      <li
                        onClick={() => {
                          setIsMobile(!isMobile);
                          setOpenNotes(true);
                          setSelectedButton(index);
                          handleTitleClick(item.name, item.color, item.y);
                        }}
                      >
                        <span style={{ backgroundColor: item.color }}>
                          {item.y}
                        </span>
                        {item.name}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.add}>
              <button className={styles.addBtn} onClick={handleClick}>
                +
              </button>
            </div>
          </div>

          {/* Right Container */}

          {isMobile && (
            <div className={`${isMobile ? "" : styles.rightside}`}>
              {openNotes && (
                <Notes
                  titleArr={isActive}
                  store={handleSaveNote}
                  storeNotes={ActiveNotes}
                  isMobile={isMobile}
                  setIsMobile={setIsMobile}
                  size={size}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.page}>
          {/* Left Container */}
          <div className={styles.left}>
            <h1
              className={styles.heading}
              onClick={() => {
                setOpenNotes(false);
              }}
            >
              Pocket Notes
            </h1>
            <div className={styles.container}>
              <div className={styles.list}>
                <ul>
                  {arr.map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedButton === index ? styles.selected : ""
                      }`}
                    >
                      <li
                        onClick={() => {
                          setSelectedButton(index);
                          handleTitleClick(item.name, item.color, item.y);
                        }}
                      >
                        <span style={{ backgroundColor: item.color }}>
                          {item.y}
                        </span>
                        {item.name}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.add}>
              <button className={styles.addBtn} onClick={handleClick}>
                +
              </button>
            </div>
          </div>

          {/* Right Container */}

          {!openNotes ? (
            <HomeRight />
          ) : (
            <Notes
              titleArr={isActive}
              store={handleSaveNote}
              storeNotes={ActiveNotes}
            />
          )}
        </div>
      )}
    </>
  );
}
