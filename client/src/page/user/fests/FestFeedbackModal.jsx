import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { appJson } from "../../../Common/configurations";
import { commonRequest } from "../../../Common/api";
import toast from "react-hot-toast";

const FestFeedbackModal = ({ closeToggle, id, loadData }) => {
  const initialValues = {
    feedback: "",
  };

  const validationSchema = Yup.object().shape({
    feedback: Yup.string().required("Feedback is required"),
  });

  const handleSubmit = async (value) => {
    const res = await commonRequest(
      "POST",
      `/user/fests/feedback/${id}`,
      value,
      appJson
    );
    if (res) {
      loadData();
      toast.success("Feedback Added");
      closeToggle();
    }
  };

  return (
    <div className="bg-gray-100 w-5/6 lg:w-2/6 shadow-2xl overflow-y-auto rounded-lg">
      <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg ">Fest Feedback</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
      </div>
      <div className="p-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              name="feedback"
              as="textarea"
              className="h-36 lg:h-64 w-full p-5 rounded mt-2"
              placeholder="Enter your feedback here"
            />
            <ErrorMessage
              className="text-sm text-red-500"
              name="feedback"
              component="span"
            />

            <button className="btn-blue text-white w-full mt-3" type="submit">
              Update Feedback
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FestFeedbackModal;
