import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFests } from "../../../redux/actions/user/festActions";

const FestsPage = () => {
  const dispatch = useDispatch();

  // Fetch festival data from Redux store
  const { fests } = useSelector((state) => state.festUser);

  // Dispatch an action to fetch festivals when component mounts
  useEffect(() => {
    dispatch(getFests());
  }, [dispatch]);

  // Render each festival as a card
  const renderFestCards = () => {
    return fests.map((fest) => (
      <div
        key={fest._id}
        className="bg-gray-100 hover:bg-gray-200  border rounded-lg p-6 mb-6 cursor-pointer"
      >
        <h2 className="text-xl font-bold mb-2">{fest.name}</h2>
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
            <p className="text-gray-600 mb-2">
              Description: {guest.description}
            </p>
          </div>
        ))}
        <button className="btn-blue-border">Join</button>
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8">Upcoming Festivals</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fests.length > 0 ? renderFestCards() : <p>No festivals available</p>}
      </div>
    </div>
  );
};

export default FestsPage;
