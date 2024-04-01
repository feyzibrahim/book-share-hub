import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFests } from "../../../redux/actions/user/festActions";

const FestsPage = () => {
  const dispatch = useDispatch();

  const { fests } = useSelector((state) => state.festUser);

  useEffect(() => {
    dispatch(getFests());
  }, [dispatch]);

  const renderFestCards = () => {
    return fests.map((fest) => (
      <div
        key={fest._id}
        className="bg-gray-100 hover:bg-gray-200  border rounded-lg p-6 mb-6 cursor-pointer relative"
      >
        <p className="capitalize absolute top-5 right-5 bg-amber-200 px-2 py-1 text-xs rounded-full">
          {fest.status}
        </p>
        <h2 className="text-xl font-bold mb-2">{fest.name}</h2>
        <p className="text-gray-600 mb-2">Description: {fest.description}</p>
        <p className="text-gray-600 mb-2">
          Location: {fest.location.city}, {fest.location.country}
        </p>
        <p className="text-gray-600 mb-2">
          Date: {new Date(fest.start_date).toLocaleDateString()} -{" "}
          {new Date(fest.end_date).toLocaleDateString()}
        </p>
        {fest.guests.map((guest) => (
          <div key={guest._id}>
            <h3 className="text-lg font-semibold mb-1">Guest: {guest.name}</h3>
          </div>
        ))}
        <div className="h-3"></div>
        <a className="btn-blue-border" href={`fests/${fest._id}`}>
          View
        </a>
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-8 pt-20 px-20">
      <h1 className="text-3xl font-bold mb-8">Upcoming Festivals</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fests.length > 0 ? renderFestCards() : <p>No festivals available</p>}
      </div>
    </div>
  );
};

export default FestsPage;
