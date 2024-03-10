import axios from "axios";
import { useState, useEffect } from "react";
import link from "../Image/link.png";

function TouristList() {
  const [searchInput, setSearchInput] = useState("");
  const [placeList, setPlaceList] = useState([]);

  const getInfo = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${searchInput}`
      );
      console.log(result);
      setPlaceList(result.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, [searchInput]);

  return (
    <div className="app-container">
      <div className="heading-bar">
        <p className="title-name">เที่ยวไหนดี</p>
      </div>
      <div className="input-container">
        <label className="search-label" htmlFor="search-input">
          ค้นหาที่เที่ยว
        </label>
        <input
          className="input-bar"
          id="search-input"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
        />
      </div>

      {placeList.map((list, index) => {
        return (
          <div key={index} className="place-container">
            <div className="img-container">
              <img className="main-photo" src={list.photos[0]} />
            </div>
            <div className="contect-container">
              <ul className="list-container">
                <li className="place-title">
                  <a className="title-list-style" href={list.url}>
                    {list.title}
                  </a>
                </li>
                <li className="place-description">
                  {list.description.slice(0, 100)} ...
                </li>
                <li className="more-info">
                  <a className="url-style" href={list.url}>
                    อ่านต่อ
                  </a>
                </li>
                <li className="category-tag">
                  หมวด
                  {list.tags.map((tag, index) => {
                    return (
                      <p
                        className="tag-search"
                        key={index}
                        onClick={() => {
                          setSearchInput(tag);
                        }}
                      >
                        {tag}
                      </p>
                    );
                  })}
                </li>
              </ul>
              <div className="photo-copy-container">
                <div className="photo-container">
                  {list.photos
                    .filter((img, index) => index !== 0)
                    .map((img, index) => (
                      <img key={index} className="photo" src={img} />
                    ))}
                </div>
                <div onClick={() => navigator.clipboard.writeText(list.url)}>
                  <img className="copy-link" src={link} alt="copy link" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TouristList;
