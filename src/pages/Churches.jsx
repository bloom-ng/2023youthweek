/* eslint-disable no-unused-vars */
import React from "react";
import ApiService from "../services/ApiService";

const Churches = () => {
  const [churches, setChurches] = React.useState([]);

  const getChurches = async () => {
    try {
      const response = await ApiService.ChurchList();
      console.log(response);
      setChurches(response);
    } catch (error) {
      console.error(error);
    }
  }
  const createChurch = async () => {
    try {
      const response = await ApiService.ChurchCreate();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  React.useState(() => {
    (async () => {
      await getChurches();
     })();
  }, []);
  return (
    <>
      <div className="rounded-lg border border-gray-200 px-8 my-4 w-full">
       <div className="flex items-start my-8">
        <h1 className="font-bold py-2 mr-8">Churches</h1>
        <button
        onClick={e => null }
          className=" hidden rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Add
        </button>
        </div> 

  
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  
                </th>
             
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {churches.map((church, index) => {
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {church.name}
                    </td>
                   
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button
                      className=" mt-4 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Delete
                    </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default Churches;
