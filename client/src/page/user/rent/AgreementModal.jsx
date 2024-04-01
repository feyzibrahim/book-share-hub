import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AgreementModal = ({ closeToggle, placeOrder }) => {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    // Set agreed to true when the user agrees
    setAgreed(true);
  };

  return (
    <div className="bg-gray-100 w-5/6 lg:w-2/6 shadow-2xl overflow-y-auto rounded-lg">
      <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg ">Rent Agreement</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
      </div>
      <div className="p-5">
        <h1>To rent a book, you must agree to these terms and conditions:</h1>
        <ul className="list-disc pl-5">
          <li>I agree to return the book within the specified time frame.</li>
          <li>I agree to pay any applicable late fees for overdue books.</li>
          <li>
            I agree to take good care of the book and return it in its original
            condition.
          </li>
          <li>
            I agree to not take a copy or photographs of the book as it may
            violate the copy right issues.
          </li>
          <li>
            If any copy right infringement is found I'm liable to pay the
            compensation to the respective owner of the book
          </li>
        </ul>
        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={agreed}
              onChange={handleAgree}
            />
            <span className="ml-2">I agree to the terms and conditions</span>
          </label>
        </div>
        <button
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
            agreed ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={placeOrder}
          disabled={!agreed}
        >
          Rent Book
        </button>
      </div>
    </div>
  );
};

export default AgreementModal;
