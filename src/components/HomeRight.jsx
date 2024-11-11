import React from "react";
import styles from "./Home.module.css";
import img from "../assets/image.png";
import vector from "../assets/Vector.png";

export default function HomeRight() {
  return (
    <>
      <div className={styles.right}>
        <div className={styles.main}>
          <div className={styles.image}>
            <img src={img} alt="" height="300vh" width="300vw" />
          </div>
          <div className={styles.content}>
            <div className={styles.heading}>
              <h1>Pocket Notes</h1>
            </div>
            <div className={styles.para}>
              <p>
                Send and receive messages without keeping your phone online.{" "}
                <br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
          </div>
          <div className={styles.key}>
            <img src={vector} alt="Lock icon" className={styles.lockIcon} />
            <p className={styles.end}>end-to-end encrypted</p>
          </div>
        </div>
      </div>
    </>
  );
}
