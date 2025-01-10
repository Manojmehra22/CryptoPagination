import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import CryptoList from "./Components/CryptoList";
import Pagination from "./Components/Pagination";

const App = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        // console.log(response?.data);
        setCoinsData(response?.data);
      });
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = coinsData?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="app">
      <h1>Crypto Studio</h1>
      <CryptoList coinsData={currentPosts} />
      <Pagination
        totalposts={coinsData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
