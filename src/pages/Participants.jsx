/* eslint-disable no-unused-vars */
import React from "react";
import ApiService from "../services/ApiService";
import {
  GroupTypes,
  ParticipantTypes,
  getGroupType,
  getParticipantType,
} from "../utils/Types";

const Participants = () => {
  const [participants, setParticipants] = React.useState([]);
  const [churches, setChurches] = React.useState([]);
  const [pagination, setPagination] = React.useState({ links: {}, meta: {} });
  const [type, setType] = React.useState(null);
  const [group, setGroup] = React.useState(null);

  const getParticipants = async (url) => {
    try {
      const response = await ApiService.ParticipantsList(url);
      console.log(response);
      setPagination({ links: response.links, meta: response.meta });
      setParticipants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getChurches = async () => {
    try {
      const response = await ApiService.ChurchList();
      console.log(response);
      setChurches(response);
    } catch (error) {
      console.error(error);
    }
  };

  const filter = async () => {
    await getParticipants(
      `https://api.csmcgethsemanehq.com/api/youthweek/participants/${type}/${group}`
    );
  };

  React.useState(() => {
    (async () => {
      await getParticipants();
      await getChurches();
    })();
  }, []);
  return (
    <>
      <div className="rounded-lg border border-gray-200 px-8 my-4 w-full">
        <h1 className="font-bold my-8">Participants</h1>
        <div className="mb-12">
          <p></p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            <div className="sm:col-span-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Type
              </label>
              <div className="mt-2">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={null}>All</option>
                  {ParticipantTypes.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Group
              </label>
              <div className="mt-2">
                <select
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={null}>All</option>
                  {GroupTypes.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Churches
              </label>
              <div className="mt-2">
                <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option>All</option>
                  {churches.map((church) => (
                    <option key={church.id} value={church.id}>
                      {church.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={() => filter()}
            className=" mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Phone
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Group
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Type
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {participants.map((participant, index) => {
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {participant.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {participant.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {participant.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {getGroupType(participant.group)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {getParticipantType(participant.type)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <button
                disabled={pagination.links.first ? false : true}
                onClick={(e) => getParticipants(pagination.links.first)}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">First Page</span>
                First
              </button>
            </li>
            <li>
              <button
                disabled={pagination.links.prev ? false : true}
                onClick={(e) => getParticipants(pagination.links.prev)}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>

            <li>
              <button
                disabled={pagination.links.next ? false : true}
                onClick={(e) => getParticipants(pagination.links.next)}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                disabled={pagination.links.last ? false : true}
                onClick={(e) => getParticipants(pagination.links.last)}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Last Page</span>
                Last
              </button>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Participants;
