"use client";
import useHeaders from "@/hooks/useHeaders";
import removeUser from "@/libs/RemoveUser";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import DeletionConfirmation from "../shared/DeletionConfirmation";
import Loader from "../shared/Loader";
import ScreenModal from "../shared/ScreenModal";
import AddUserForm from "./AddUserForm";
import ChangePasswordForm from "./ChangePasswordForm";
import RemoveUserForm from "./RemoveUserForm";

type ModalType =
  | "ADD_USER"
  | "REMOVE_USER"
  | "CHANGE_PASSWORD"
  | "DELETE_CONFIRMATION"
  | null;

const UserActionButtons = () => {
  const [selectedModal, setSelectedModal] = useState<null | ModalType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const headers = useHeaders();

  // Functions to open and close modals
  const openModal = (modalType: ModalType) => setSelectedModal(modalType);
  const closeModal = () => setSelectedModal(null);

  // Function to render modals based on selectedModal state
  const renderModalContent = () => {
    switch (selectedModal) {
      case "ADD_USER":
        return <AddUserForm />;
      case "REMOVE_USER":
        return <RemoveUserForm />;
      case "CHANGE_PASSWORD":
        return <ChangePasswordForm />;
      case "DELETE_CONFIRMATION":
        return (
          <DeletionConfirmation
            variant="ACCOUNT"
            handleClick={deleteAccount}
            closeModal={closeModal}
          />
        );
      default:
        return null;
    }
  };

  // Function to delete user account
  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      closeModal();
      // API CALL
      await removeUser(session?.user?._id!, headers, session?.user?._id!);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`my-6 text-center ${
        session?.user?.role === "admin" ? "sm:text-center" : "sm:text-left"
      }`}
    >
      {/* Form modal */}
      {selectedModal && (
        <ScreenModal
          closeModal={closeModal}
          showCancel={selectedModal !== "DELETE_CONFIRMATION"}
          isForm
        >
          {renderModalContent()}
        </ScreenModal>
      )}

      {/* Loading modal */}
      {isLoading && (
        <ScreenModal isLoader>
          <Loader />
        </ScreenModal>
      )}

      {/* Admin action buttons */}
      <h3 className="text-xl my-2 font-semibold text-left">Users</h3>
      {session?.user?.role === "admin" && (
        <>
          <ActionButton onClick={() => openModal("ADD_USER")}>
            Add New User
          </ActionButton>
          <ActionButton onClick={() => openModal("REMOVE_USER")}>
            Remove User
          </ActionButton>
        </>
      )}

      {/* User action buttons */}
      <ActionButton onClick={() => openModal("DELETE_CONFIRMATION")}>
        Delete Account
      </ActionButton>
      <ActionButton onClick={() => openModal("CHANGE_PASSWORD")}>
        Change Password
      </ActionButton>
    </section>
  );
};

export default UserActionButtons;

// Action button props
interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="my-1 h-10 w-full max-w-36 text-sm bg-black text-white rounded-md mx-1 relative"
  >
    {children}
  </button>
);
