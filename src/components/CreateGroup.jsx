import React, { useState } from "react";
import style from "./CreateGroup.module.css";

export default function CreateGroup({ click, add }) {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const [nameError, setNameError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  //   Create Button functionality
  const handleClick = () => {
    if (name === "") {
      setNameError(true);
    } else if (color === "") {
      setColorError(true);
    } else {
      let y = handleShortName();
      add(name, color, y);
      click(false);
    }
  };

  //   Short Name
  const handleShortName = () => {
    let short = name.split(" ");
    let str = "";
    if (short.length >= 2) {
      short.forEach((element) => {
        str += element[0];
      });
    } else {
      str = short[0][0];
    }
    return str.slice(0, 2).toUpperCase();
  };

  //   Color Change
  const handleColorChange = (color) => {
    setColor(color);
    setColorError(false);
  };

  return (
    <div>
      <div className={style.container} onClick={() => click(false)}>
        <div className={style.section} onClick={(e) => e.stopPropagation()}>
          <div className={style.heading}>Create New group</div>
          <div className={style.name}>
            <label>Group Name</label>
            <input
              type="text"
              placeholder="Enter group name"
              onChange={handleChange}
              value={name}
            />
          </div>
          <div className={style.error}>
            {nameError && (
              <p className={style.errorMsg}>*Please Enter Group name</p>
            )}
          </div>

          {/* Colors */}
          <div className={style.choseColors}>
            <div className={style.color}>Choose colour</div>
            <div className={style.chose}>
              {colors.map((item, index) => (
                <div
                  key={index}
                  className={`${style.circle} ${
                    selectedColor === index ? style.selected : ""
                  }`}
                  style={{ backgroundColor: colors[index] }}
                  onClick={() => {
                    setSelectedColor(index);
                    handleColorChange(colors[index]);
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className={style.errorColor}>
            {colorError && (
              <p className={style.errorMsg}>*Please Choose Color</p>
            )}
          </div>
          <div className={style.create}>
            <button className={style.createBtn} onClick={handleClick}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
