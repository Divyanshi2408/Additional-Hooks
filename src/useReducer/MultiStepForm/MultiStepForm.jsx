import React, { useReducer, useState } from "react";

const initialState = {
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
  },
  addressDetails: {
    street: "",
    city: "",
    postalCode: "",
  },
  paymentDetails: {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  },
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_PERSONAL_DETAILS":
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          ...action.payload,
        },
      };
    case "UPDATE_ADDRESS_DETAILS":
      return {
        ...state,
        addressDetails: {
          ...state.addressDetails,
          ...action.payload,
        },
      };
    case "UPDATE_PAYMENT_DETAILS":
      return {
        ...state,
        paymentDetails: {
          ...state.paymentDetails,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Final Form Data:", state);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Step {currentStep} of 3
      </h2>
      {currentStep === 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Personal Details</h3>
          <input
            type="text"
            placeholder="First Name"
            value={state.personalDetails.firstName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PERSONAL_DETAILS",
                payload: { firstName: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={state.personalDetails.lastName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PERSONAL_DETAILS",
                payload: { lastName: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={state.personalDetails.email}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PERSONAL_DETAILS",
                payload: { email: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Address Details</h3>
          <input
            type="text"
            placeholder="Street"
            value={state.addressDetails.street}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_ADDRESS_DETAILS",
                payload: { street: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="City"
            value={state.addressDetails.city}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_ADDRESS_DETAILS",
                payload: { city: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={state.addressDetails.postalCode}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_ADDRESS_DETAILS",
                payload: { postalCode: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Payment Details</h3>
          <input
            type="text"
            placeholder="Card Number"
            value={state.paymentDetails.cardNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PAYMENT_DETAILS",
                payload: { cardNumber: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Expiry Date"
            value={state.paymentDetails.expiryDate}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PAYMENT_DETAILS",
                payload: { expiryDate: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="CVV"
            value={state.paymentDetails.cvv}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PAYMENT_DETAILS",
                payload: { cvv: e.target.value },
              })
            }
            className="w-full p-2 border rounded mb-2"
          />
        </div>
      )}
      <div className="flex justify-between mt-4">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
