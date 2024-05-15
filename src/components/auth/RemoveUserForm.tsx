"use client";
import useHeaders from "@/app/hooks/useHeaders";
import removeUser from "@/libs/client/RemoveUser";
import handleApiError from "@/libs/server/HandleApiError";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FormLayout from "./FormLayout";

// Props
interface UserProps {
  _id: string;
  username: string;
}

const RemoveUserForm = () => {
  // States
  const [users, setUsers] = useState<UserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  // Headers
  const headers = useHeaders();

  useEffect(() => {
    // Function to fetch all users
    const fetchUsers = async () => {
      try {
        // API CALL
        const res = await axios.get("/api/user/getUsers", { headers });
        setUsers(res.data.users || []);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchUsers();
  }, []);

  // Form submission
  const processForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) {
      return;
    }

    try {
      setIsLoading(true);
      // API CALL
      await removeUser(selectedUser, headers, session?.user._id!);
      // Removing user from user's list
      setUsers((prev) => prev.filter((user) => user._id !== selectedUser));
      setSelectedUser("");
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout
      variant="REMOVE USER"
      handleSubmit={processForm}
      isLoading={isLoading}
    >
      <select
        disabled={isLoading}
        onChange={(e) => setSelectedUser(e.currentTarget.value)}
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
