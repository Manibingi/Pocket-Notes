import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import CreateGroup from "./components/CreateGroup.jsx";

const localStorage_data = "";
function App() {
  const [openCreate, setOpenCreate] = useState(false);
  const [groupName, setGroupName] = useState(() => {
    const storedList = localStorage.getItem(localStorage_data);
    return storedList ? JSON.parse(storedList) : [];
  });

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());
  console.log(screenSize);

  const handleInput = (name, color, y) => {
    const newNote = { name, color, y };
    const updatedNotes = [...groupName, newNote];
    setGroupName(updatedNotes);
    localStorage.setItem(localStorage_data, JSON.stringify(updatedNotes));
  };

  const handleCreate = () => {
    setOpenCreate(!openCreate);
  };

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);
    localStorage.setItem(localStorage_data, JSON.stringify(groupName));
  }, [groupName]);

  return (
    <>
      <Home click={handleCreate} arr={groupName} size={screenSize.width} />
      {openCreate && (
        <div className="create">
          <CreateGroup click={handleCreate} add={handleInput} />
        </div>
      )}
    </>
  );
}

export default App;
