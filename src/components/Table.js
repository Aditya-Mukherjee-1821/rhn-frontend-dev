import React from "react";

const Table = ({ data }) => {

  // Ensure `data` is valid before rendering
  if (!data) {
    return <p className="text-center mt-3">No data available</p>;
  }

  return (
    <div className="container d-flex justify-content-center my-4">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Pipe ID</th>
            <th scope="col">Mass Flow Rate (kg/s)</th>
          </tr>
        </thead>
        <tbody>
          {data.pipe_names.map((pipe, index) => {
          if(index % 2 == 0) return (
            <tr key={index}>
              <td>{pipe}</td>
              <td>
                {data.mdot_from[index] !== undefined
                  ? Math.abs(data.mdot_from[index])
                  : "N/A"}
              </td>
            </tr>)

            else if(pipe.includes("Pipe_E")) return (<tr key={index}>
                <td>{pipe}</td>
                <td>
                  {data.mdot_from[index] !== undefined
                    ? Math.abs(data.mdot_from[index])
                    : "N/A"}
                </td>
              </tr>)
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
