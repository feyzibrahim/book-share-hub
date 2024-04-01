import React, { useEffect, useState } from "react";
import { commonRequest } from "../../../Common/api";
import { useParams } from "react-router-dom";
import { appJson } from "../../../Common/configurations";
import InputFieldBox from "../components/InputFieldBox";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import FestFeedbackModal from "./FestFeedbackModal";

const FestDetails = () => {
  const { id } = useParams();

  const [fest, setFest] = useState("");
  const { user } = useSelector((state) => state.user);
  const [cancelModal, setCancelModal] = useState(false);
  const toggleCancelModal = () => {
    setCancelModal(!cancelModal);
  };

  const loadData = async () => {
    const res = await commonRequest("GET", `/user/fests/${id}`, {}, appJson);
    if (res) {
      console.log("file: FestDetails.jsx:19 -> loadData -> res", res);
      setFest(res.fest);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const joinFest = async () => {
    const res = await commonRequest(
      "POST",
      `/user/fests/join/${id}`,
      {},
      appJson
    );
    if (res) {
      setFest(res.fest);
    }
  };

  if (!fest) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        No data
      </div>
    );
  }

  return (
    <>
      {cancelModal && (
        <Modal
          tab={
            <FestFeedbackModal
              closeToggle={toggleCancelModal}
              id={id}
              loadData={loadData}
            />
          }
        />
      )}
      <div className="pt-20 px-20 bg-gray-100">
        <div className="lg:flex gap-5 items-start">
          <div className="lg:w-2/3">
            <div className="admin-div w-full">
              <p>
                <label htmlFor="name" className="admin-label">
                  Name
                </label>
              </p>
              <InputFieldBox name={fest.name} className="admin-input" />

              <p>
                <label htmlFor="description" className="admin-label">
                  Description
                </label>
              </p>
              <InputFieldBox
                name={fest.description}
                className="admin-input h-36 lg:h-64"
              />
            </div>
            <div className="admin-div">
              {/* Guests */}
              <p className="admin-label">Guests</p>
              <div>
                {fest.guests &&
                  fest.guests.map((guest, index) => (
                    <div key={index} className="flex gap-1">
                      <div className="w-full">
                        <InputFieldBox
                          className="admin-input"
                          name={guest.name}
                        />

                        <InputFieldBox
                          className="admin-input"
                          name={guest.genre}
                        />

                        <InputFieldBox
                          className="admin-input"
                          name={guest.description}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="admin-div">
              {/* Guests */}
              <p className="admin-label">Sponsor</p>

              <div>
                {fest.sponsor.map((name, index) => (
                  <div key={index} className="flex gap-1">
                    <div className="w-full">
                      <InputFieldBox name={name} className="admin-input" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="admin-div">
              {fest.status === "expired" ? (
                <>
                  <div className="btn-red w-full text-white mb-5 text-center">
                    Expired
                  </div>
                  {fest.joiners.length > 0 &&
                    user &&
                    fest.joiners.includes(user._id) && (
                      <button
                        className="btn-blue text-center w-full text-white mb-5"
                        onClick={toggleCancelModal}
                      >
                        Mark a feedback
                      </button>
                    )}
                </>
              ) : fest.status === "started" ? (
                <div className="btn-green w-full text-white mb-5 text-center">
                  Started
                </div>
              ) : fest.joiners.length > 0 &&
                fest.joiners.includes(user._id) &&
                user ? (
                <div className="btn-green text-center w-full text-white mb-5">
                  Joined
                </div>
              ) : (
                <button
                  className="btn-blue w-full text-white mb-5"
                  onClick={joinFest}
                >
                  Join
                </button>
              )}

              <p>
                <label htmlFor="location.address" className="admin-label">
                  Contact Info
                </label>
              </p>
              <InputFieldBox name={fest.contactInfo} className="admin-input" />
              <p>
                <label htmlFor="location.address" className="admin-label">
                  Address
                </label>
              </p>
              <InputFieldBox
                name={fest.location.address}
                className="admin-input"
              />

              <p>
                <label htmlFor="location.city" className="admin-label">
                  City
                </label>
              </p>
              <InputFieldBox
                name={fest.location.city}
                className="admin-input"
              />

              <p>
                <label htmlFor="location.country" className="admin-label">
                  Country
                </label>
              </p>
              <InputFieldBox
                name={fest.location.country}
                className="admin-input"
              />
            </div>

            <div className=" admin-div">
              <p>
                <label htmlFor="start_date" className="admin-label">
                  Start Date
                </label>
              </p>
              <InputFieldBox
                name={format(new Date(fest.start_date), "yyyy-MM-dd")}
                type="date"
                className="admin-input"
              />

              <p>
                <label htmlFor="end_date" className="admin-label">
                  End Date
                </label>
              </p>
              <InputFieldBox
                name={format(new Date(fest.end_date), "yyyy-MM-dd")}
                type="date"
                className="admin-input"
              />

              <p>
                <label htmlFor="end_date" className="admin-label">
                  Time
                </label>
              </p>
              <InputFieldBox
                name={fest?.time ?? "-"}
                type="time"
                className="admin-input"
              />

              <p>
                <label htmlFor="website" className="admin-label">
                  Website
                </label>
              </p>
              <InputFieldBox name={fest.website} className="admin-input" />

              <p>
                <label htmlFor="organizer" className="admin-label">
                  Organizer
                </label>
              </p>
              <InputFieldBox name={fest.organizer} className="admin-input" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FestDetails;
