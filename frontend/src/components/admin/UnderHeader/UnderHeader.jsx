import React, { useState } from "react";
import "./UnderHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import AddNew from "../../../screens/Admin/AddNew/AddNew";

const UnderHeader = ({setAddShow}) => {
  const [searchString, setSearchString] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchString);
    // Thực hiện điều hướng đến URL với giá trị trong tag input
    const updatedURL = window.location.origin + window.location.pathname + `?searchString=${encodeURIComponent(searchString)}`;
    window.location.href = updatedURL

  };

  return (
    <div className="underHeader">
      <div className="underHeader_search">
       <form onSubmit={handleSubmit}>
          <input
            className="underHeader_search-input"
            placeholder="Search"  
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <button onClick={handleSubmit} className="underHeader_search-icon">
            <MdSearch />
          </button>
        </form>
      </div>
      <div className="">
        <button onClick={() => setAddShow(true)} className="underHeader_Link">Add New</button>
      </div>
    </div>
  );
};

export default UnderHeader;
