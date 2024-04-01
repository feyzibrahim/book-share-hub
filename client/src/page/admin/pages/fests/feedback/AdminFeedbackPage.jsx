import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commonRequest } from "../../../../../Common/api";

const AdminFeedbackPage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await commonRequest("GET", `/admin/fest/${id}`);

      if (response) {
        setFeedback(response.fest.feedback);
      }
    };

    loadData();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      {feedback && feedback.length > 0 ? (
        feedback.map((feed) => (
          <div key={feed._id} className="border rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <img
                src={feed.user.profileImageURL}
                alt="User Profile"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <h2 className="text-lg font-semibold">{feed.user.firstName}</h2>
                <p className="text-gray-600">{feed.user.email}</p>
              </div>
            </div>
            <p className="text-gray-800">{feed.message}</p>
          </div>
        ))
      ) : (
        <p>No feedback available</p>
      )}
    </div>
  );
};

export default AdminFeedbackPage;
