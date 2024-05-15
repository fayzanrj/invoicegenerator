import React from "react";

interface DeletionConfirmationProps {
  handleClick: () => void;
  closeModal: () => void;
}

const DeletionConfirmation: React.FC<DeletionConfirmationProps> = ({
  handleClick,
  closeModal,
}) => {
  return (
    <div className="w-[95%] max-w-96 p-4 bg-white shadow-xl rounded-xl ">
      <div className="pt-1 pb-3 border-b border-gray-400 text-left ">
        <h3 className="text-xl font-semibold">Deletion Confirmation</h3>
      </div>
      {/* Note */}
      <div className="my-6 text-left">
        <p className="text-[0.94rem]">
          Are you sure you want to delete your account&#63;
        </p>
        <p className="text-sm font-bold">This action is irreversible.</p>
      </div>
      {/* Buttons */}
      <div className="text-right">
        <button className="py-1 px-3" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="py-1.5 px-3 bg-red-600 text-white rounded-md"
          onClick={handleClick}
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

export default DeletionConfirmation;
