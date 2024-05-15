import { useSession } from "next-auth/react";

const useHeaders = () => {
  const { data: session } = useSession();

  const headers = {
    "Content-Type": "application/json",
    accessToken: session?.user?.accessToken,
  };

  return headers;
};

export default useHeaders;
