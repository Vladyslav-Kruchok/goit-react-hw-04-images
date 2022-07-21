import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";

export const Searchbar = ({onSubmit}) => {
    const [searchStr, setSearchStr] = useState("");
    
    const exportData = (e) => { 
        e.preventDefault();
        if (searchStr.trim() ==='') {
            alert('enter some value')
            return;
        }
        onSubmit(searchStr);
        resetCurrInput();
    };    
    const updateCurrState = (e) => {
        const { value } = e.currentTarget;
        setSearchStr(value);
    };
    function resetCurrInput(){
        setSearchStr("");
    };

    return(
        <header className={styles.searchbar}>
            <form className={styles.form} onSubmit = {exportData}>
                <button type="submit" className={styles.formButton}>
                    <span className={styles.formButtonLabel}>Search</span>
                </button>

                <input
                    className={styles.formInput}
                    type="text"
                    name="searchStr"
                    value={searchStr}
                    onChange={updateCurrState}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

Searchbar.protoType = {
    onSubmit: PropTypes.func.isRequired
};