import React from "react";

const Filter = ({handleFilterText}) => {
  return (
    <div className="container" style={{width: "500px", margin: "20px auto"}}>
        <select className="form-select" aria-label="Default select example" onChange={(e)=>handleFilterText(e.target.value)} style={{height: "50px"}}>
          <option selected>All Notes</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>
  )
}
export default Filter;
