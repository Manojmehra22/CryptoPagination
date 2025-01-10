import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPosts, postsPerPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return <button key={index}>{page}</button>;
      })}
    </div>
  );
};

export default Pagination;
