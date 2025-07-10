import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pagination.css";
import CryptoCard from "./CryptoCard";

function Pagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.length / rowsPerPage);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log(response?.data);
        setData(response?.data);
      });
  }, []);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="crypto_list">
        {currentItems.map((coin, index) => {
          return (
            <CryptoCard
              key={index}
              image={coin.image}
              name={coin.name}
              price={coin.current_price}
            />
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
