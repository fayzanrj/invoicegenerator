"use client";
import useHeaders from "@/hooks/useHeaders";
import removeUser from "@/libs/RemoveUser";
import handleApiError from "@/libs/HandleApiError";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FormLayout from "../shared/FormLayout";
import ScreenModal from "../shared/ScreenModal";
import DeletionConfirmation from "../shared/DeletionConfirmation";

// Props
interface UserProps {
  _id: string;
  username: string;
}

const RemoveUserForm = () => {
  // States
  const [users, setUsers] = useState<UserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks
  const { data: session } = useSession();
  const headers = useHeaders();

  useEffect(() => {
    // Function to fetch all users
    const fetchUsers = async () => {
      try {
        // API CALL
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/getUsers`,
          { headers }
        );
        setUsers(res.data.users || []);
      } catch (error) {
        handleApiError(error);
      }
    };

    // Calling function
    fetchUsers();
  }, []);

  // Function to closemodal
  const closeModal = () => setIsModalOpen(false);

  // Handling click
  const handleRemove = async () => {
    if (!selectedUser) {
      return;
    }

    try {
      setIsLoading(true);
      closeModal();

      // API CALL
      await removeUser(selectedUser._id, headers, session?.user._id!);

      // Removing user from user's list
      setUsers((prev) => prev.filter((user) => user._id !== selectedUser._id));
      setSelectedUser(null);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle value change in drop down menu
  const handleChange = (id: string) => {
    const index = users.findIndex((user) => user._id === id);
    if (index === -1) return;
    setSelectedUser(users[index]);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      setIsModalOpen(true);
    }
  };

  // Deletion confirmation modal
  if (isModalOpen) {
    return (
        <DeletionConfirmation
          closeModal={closeModal}
          variant="USER"
          username={selectedUser?.username || ""}
          handleClick={handleRemove}
        />
    );
  }

  return (
    <FormLayout
      variant="REMOVE USER"
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <select
        disabled={isLoading}
        onChange={(e) => handleChange(e.currentTarget.value)}
        className="w-full p-2 border-2 border-gray-300 my-1 outline-none rounded-md disabled:opacity-50 overflow-y-auto"
      >
        <option value="">Select user</option>
        {/* User's list */}
        {users.map(
          (user) =>
            user.username !== "admin" && (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            )
        )}
      </select>
    </FormLayout>
  );
};

export default RemoveUserForm;
