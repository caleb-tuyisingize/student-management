import React from 'react';

const Pagination = ({ totalPosts, postPerPage, paginate }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <>
      <center>
        {pages.map((page, index) => {
          return (
            <p className="pag" key={index} onClick={() => paginate(page)}>
              {page}
            </p>
          );
        })}
      </center>
    </>
  );
};

export default Pagination;
