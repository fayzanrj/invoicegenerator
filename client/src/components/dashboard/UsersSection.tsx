"use client";
import useHeaders from "@/hooks/useHeaders";
import removeUser from "@/libs/RemoveUser";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import AddUserForm from "../auth/AddUserForm";
import ChangePasswordForm from "../auth/ChangePasswordForm";
import RemoveUserForm from "../auth/RemoveUserForm";
import ButtonLayout from "../shared/ButtonLayout";
import DeletionConfirmation from "../shared/DeletionConfirmation";
import ScreenLoader from "../shared/ScreenLoader";
import ScreenModal from "../shared/ScreenModal";
import SectionHeading from "./SectionHeading";
import handleApiError from "@/libs/HandleApiError";
import UrduFont from "@/constants/UrduFont";

// User modal type
type ModalType =
  | "ADD_USER"
  | "REMOVE_USER"
  | "CHANGE_PASSWORD"
  | "DELETE_CONFIRMATION"
  | null;

const UsersSection = () => {
  // States
  const [selectedModal, setSelectedModal] = useState<null | ModalType>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const { data: session, status } = useSession();
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
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // If auth is loading
  if (status === "loading") return null;

  return (
    <section
      className={`my-6 text-center ${
        session?.user?.role === "admin" ? "sm:text-center" : "sm:text-left"
      }`}
    >
      <SectionHeading name="صارفین" />

      {/* ONLY IF LOGGED IN USER IS ADMIN */}
      {session?.user?.role === "admin" && (
        <>
          <ActionButton onClick={() => openModal("ADD_USER")}>
            نیا صارف شامل کریں
          </ActionButton>
          <ActionButton onClick={() => openModal("REMOVE_USER")}>
            صارف حذف کریں
          </ActionButton>
        </>
      )}

      {/* ALL USER BUTTONS*/}
      <ActionButton onClick={() => openModal("DELETE_CONFIRMATION")}>
        اکاؤنٹ حذف کریں
      </ActionButton>
      <ActionButton onClick={() => openModal("CHANGE_PASSWORD")}>
        پاس ورڈ تبدیل کریں
      </ActionButton>

      {/* ACTION MODAL */}
      {selectedModal && (
        <ScreenModal
          closeModal={closeModal}
          showCancel={selectedModal !== "DELETE_CONFIRMATION"}
          isForm
        >
          {renderModalContent()}
        </ScreenModal>
      )}

      {/* LOADING MODAL */}
      {isLoading && <ScreenLoader />}
    </section>
  );
};

export default UsersSection;

// Action button props
interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick }) => (
  <ButtonLayout onClick={onClick} fullWidth className={`${UrduFont} max-w-36 text-sm !h-11`}>
    {children}
  </ButtonLayout>
);
