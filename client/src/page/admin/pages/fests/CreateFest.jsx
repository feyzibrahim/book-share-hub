import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import ConfirmModal from "../../../../components/ConfirmModal";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { createFest } from "../../../../redux/actions/admin/festsAction";

const CreateFest = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formikRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const toggleModel = () => {
    setShowModal(!showModal);
  };

  const [formData, setFormData] = useState(new FormData());
  const showConfirm = (value) => {
    toggleModel();
    setFormData(value);
  };

  const createFestFunction = () => {
    dispatch(createFest(formData));
    toggleModel();
    navigate(-1);
  };

  const initialValues = {
    name: "",
    description: "",
    location: {
      address: "",
      city: "",
      country: "",
    },
    start_date: null,
    end_date: null,
    website: "",
    organizer: "",
    guests: [
      {
        name: "",
        genre: "",
        description: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.object().shape({
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
    }),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date().required("End date is required"),
    website: Yup.string().url("Invalid URL format"),
    organizer: Yup.string(),
    guests: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Guest name is required"),
        genre: Yup.string(),
        description: Yup.string(),
      })
    ),
  });

  return (
    <>
      {showModal && (
        <ConfirmModal
          negativeAction={toggleModel}
          positiveAction={createFestFunction}
          title="Confirm Creation?"
        />
      )}
      <div className="p-5 w-full overflow-y-scroll">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-sm font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Create Fest</h1>
            {/* Bread Crumbs */}
            <BreadCrumbs list={["Dashboard", "Fests List", "Create Fest"]} />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="admin-button-fl bg-gray-200 text-blue-700"
              onClick={() => navigate(-1)}
            >
              <AiOutlineClose />
              Cancel
            </button>
            <button
              type="submit"
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => {
                formikRef.current.submitForm();
              }}
            >
              <AiOutlineSave />
              Save
            </button>
          </div>
        </div>
        {/* Category Information */}
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={showConfirm}
          validationSchema={validationSchema}
        >
          <Form className="lg:flex gap-5 items-start">
            <div className="lg:w-2/3">
              <div className="admin-div w-full">
                <p>
                  <label htmlFor="name" className="admin-label">
                    Name
                  </label>
                </p>
                <Field
                  name="name"
                  placeholder="Enter festival name"
                  className="admin-input"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="text-sm text-red-500"
                />

                <p>
                  <label htmlFor="description" className="admin-label">
                    Description
                  </label>
                </p>
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Enter festival description"
                  className="admin-input h-36 lg:h-64"
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className="text-sm text-red-500"
                />
              </div>
              {/* here */}
              <div className="admin-div">
                {/* Guests */}
                <p className="admin-label">Guests</p>
                <FieldArray name="guests">
                  {({ push, remove, form }) => (
                    <div>
                      {form.values.guests.map((guest, index) => (
                        <div key={index} className="flex gap-1">
                          <div className="w-full">
                            <Field
                              name={`guests.${index}.name`}
                              placeholder="Enter guest name"
                              className="admin-input"
                            />
                            <ErrorMessage
                              name={`guests.${index}.name`}
                              component="span"
                              className="text-sm text-red-500"
                            />

                            <Field
                              name={`guests.${index}.genre`}
                              placeholder="Enter guest genre"
                              className="admin-input"
                            />
                            <ErrorMessage
                              name={`guests.${index}.genre`}
                              component="span"
                              className="text-sm text-red-500"
                            />

                            <Field
                              name={`guests.${index}.description`}
                              placeholder="Enter guest description"
                              className="admin-input"
                            />
                            <ErrorMessage
                              name={`guests.${index}.description`}
                              component="span"
                              className="text-sm text-red-500"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="admin-button-fl bg-gray-200 text-red-500 h-fit mt-2"
                          >
                            <BiTrash />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className=" mt-2 admin-button-fl bg-blue-700 text-white "
                        onClick={() =>
                          push({ name: "", genre: "", description: "" })
                        }
                      >
                        Add New Guest
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="admin-div">
                <p>
                  <label htmlFor="location.address" className="admin-label">
                    Address
                  </label>
                </p>
                <Field
                  name="location.address"
                  placeholder="Enter festival address"
                  className="admin-input"
                />
                <ErrorMessage
                  name="location.address"
                  component="span"
                  className="text-sm text-red-500"
                />

                <p>
                  <label htmlFor="location.city" className="admin-label">
                    City
                  </label>
                </p>
                <Field
                  name="location.city"
                  placeholder="Enter festival city"
                  className="admin-input"
                />
                <ErrorMessage
                  name="location.city"
                  component="span"
                  className="text-sm text-red-500"
                />

                <p>
                  <label htmlFor="location.country" className="admin-label">
                    Country
                  </label>
                </p>
                <Field
                  name="location.country"
                  placeholder="Enter festival country"
                  className="admin-input"
                />
                <ErrorMessage
                  name="location.country"
                  component="span"
                  className="text-sm text-red-500"
                />
              </div>

              <div className=" admin-div">
                <p>
                  <label htmlFor="start_date" className="admin-label">
                    Start Date
                  </label>
                </p>
                <Field
                  name="start_date"
                  type="date"
                  placeholder="Select start date"
                  className="admin-input"
                />
                <ErrorMessage
                  name="start_date"
                  component="span"
                  className="text-sm text-red-500"
                />

                <p>
                  <label htmlFor="end_date" className="admin-label">
                    End Date
                  </label>
                </p>
                <Field
                  name="end_date"
                  type="date"
                  placeholder="Select end date"
                  className="admin-input"
                />
                <ErrorMessage
                  name="end_date"
                  component="span"
                  className="text-sm text-red-500"
                />

                <p>
                  <label htmlFor="website" className="admin-label">
                    Website
                  </label>
                </p>
                <Field
                  name="website"
                  placeholder="Enter festival website"
                  className="admin-input"
                />
                <ErrorMessage
                  name="website"
                  component="span"
                  className="text-sm text-red-500"
                />

                <p>
                  <label htmlFor="organizer" className="admin-label">
                    Organizer
                  </label>
                </p>
                <Field
                  name="organizer"
                  placeholder="Enter festival organizer"
                  className="admin-input"
                />
                <ErrorMessage
                  name="organizer"
                  component="span"
                  className="text-sm text-red-500"
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreateFest;
