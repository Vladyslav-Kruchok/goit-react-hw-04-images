//#region IMPORT #
import { useState, useRef, useEffect } from "react";

import { Searchbar } from "../components/Searchbar";
import { Loader } from "../components/Loader";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

import { pixabayAPI } from "../api/pixabayAPI";

import styles from "./app.module.css";
//#endregion #

const PER_PAGE = 12;
const START_PAGE = 1;

export const App = () => {
  const [searchVal, setSearchVal] = useState(() => "");
  const [imgArr, setImgArr] = useState(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [showModalImg, setShowModalImg] = useState(() => false);
  const [page, setPage] = useState(() => START_PAGE);
  const [largeImg, setLargeImg] = useState(() => "");

  let perPage = useRef(PER_PAGE);
  let maxPage = useRef(START_PAGE);


//componentDidUpdate
  useEffect(() => {
    if (searchVal && page === 1) { 
      searchAPI(searchVal, perPage, START_PAGE);
    };
    if (searchVal && page > 1) {
      searchAPI(searchVal, perPage, page);
    };
  }, [searchVal, page]);

  function searchAPI(currVal, _perPage = perPage, _numbPage = page) {
    setIsLoading(true);
      const searchRes = pixabayAPI(currVal, _perPage.current, _numbPage);
      searchRes
        .then(value => {
          if (_numbPage > 1) {
            setImgArr((prevState) => {
              const newArr = [...prevState, ...value.respArr];
              if (maxPage.current === 1) {
                maxPage.current = Math.floor(value.maxPic / _perPage.current);
              }
              return newArr;
            });
          } else {
            setImgArr(value.respArr);
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
  }
  const getDataExtForm = (data) => { 
    setSearchVal(data);
  };
  const imgOnClick = (e) => {
    const imgId = e.target.id;
    const findImg = imgArr.find(({ id }) => id === Number(imgId));
    setLargeImg(findImg.largeImageURL);
    setShowModalImg(true);
  };
  const btnOnClick = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };
  const closeModal = () => {
    setIsLoading(false);
  };
  const imgArrlen = (imgArr.length !== "undefined ") ? imgArr.length : 0;
  return (
    <div className={styles.App}>
      <Searchbar onSubmit={getDataExtForm} />
      {(imgArr.length !== 0) && <ImageGallery imgArr={imgArr} onClick={imgOnClick} />}
      {isLoading && <Loader />}
      {(imgArrlen > 0 && page <= maxPage.current) && <Button text={"Load more"} onClick={btnOnClick} />}
      {showModalImg && <Modal onClose = {closeModal} largeImg = {largeImg}/>}
    </div>);
};