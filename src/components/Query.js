import React from "react";

const Query = ({ modifications, setModifications, handleSubmit }) => {
  return (
    <div className="container d-flex justify-content-center my-4">
      <input
        type="number"
        value={modifications.demand_change}
        onChange={(e) => setModifications({ ...modifications, demand_change: Number(e.target.value) })}
        placeholder="Percentage increase"
        className="form-control mx-2"
      />

      <input
        type="text"
        onChange={(e) => setModifications({ ...modifications, remove_pipes: e.target.value.split(",") })}
        placeholder="Comma-separated Pipe IDs"
        className="form-control mx-2"
      />

      <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
    </div>
  );
};

export default Query;
