import { useEffect } from "react";
import { createPortal } from "react-dom";
import ProtoTypes from "prop-types";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modalRoot");

export const Modal = ({onClose, largeImg}) => {
    useEffect(() => {
        //componentDidMount
        window.addEventListener("keydown", handleKeyDown);
        //componentWillUnmount
        return (() => {
            window.removeEventListener("keydown", handleKeyDown);
        });}
    );
    
    function handleKeyDown(e, handleKey = "Escape") {
        if (e.code === handleKey) {
            onClose();
        }
    }
    const handleBackDropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return(
        createPortal (
            <div className={styles.Overlay} onClick={handleBackDropClick}>
            <div className={styles.Modal}>
                <img src={largeImg} alt="Фото" />
            </div>
            </div>
            , modalRoot)
    );        
};

Modal.protoType = {
    onClose: ProtoTypes.func.isRequired
};