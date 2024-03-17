import React, { useRef, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { commonRequest } from "../../Common/api";
import { appJson } from "../../Common/configurations";
import PasswordInputWithIcon from "../../components/PasswordInputWithIcon";

const PasswordChange = () => {
  const formikRef = useRef(null);

  const initialValues = {
    currentPassword: "",
    password: "",
    passwordAgain: "",
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Password is required"),
    password: Yup.string().required("Password is required"),
    passwordAgain: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const handleLoginSubmit = async (value) => {
    const data = await commonRequest(
      "POST",
      "/user/change-password",
      { ...value },
      appJson
    );
    if (data.success) {
      toast.success("Password Updated");
      toggleEdit();
    } else {
      toast.error(data.response.data.error);
    }
  };

  return (
    <div className="bg-white w-full mx-5 lg:mx-0 rounded-lg mt-5">
      <div className="border-b px-5 flex justify-between items-center">
        <h1 className="uppercase text-lg font-semibold py-3 ">
          Change Password
        </h1>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLoginSubmit}
        validationSchema={validationSchema}
        innerRef={formikRef}
      >
        <Form className="w-full p-5">
          <div className="mb-4">
            <PasswordInputWithIcon
              icon={<AiOutlineLock />}
              name="currentPassword"
              placeholder="Enter a your current password"
              title="Current Password"
            />
          </div>

          <div className="mb-4">
            <PasswordInputWithIcon
              icon={<AiOutlineLock />}
              name="password"
              placeholder="Enter a new password"
              title="New Password"
            />
          </div>

          <div className="mb-4">
            <PasswordInputWithIcon
              icon={<AiOutlineLock />}
              name="passwordAgain"
              placeholder="Confirm password"
              title="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300`}
          >
            Save Changes
          </button>
        </Form>
      </Formik>{" "}
    </div>
  );
};

export default PasswordChange;
