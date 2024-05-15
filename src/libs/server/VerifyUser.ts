import { NextRequest } from "next/server";
import { verifyJwt } from "../../utilities/Jwt";

// Function to verify and get user data
export const verifyUser = (req: NextRequest) => {
  const accessToken = req.headers.get("accessToken");
  const user = verifyJwt(accessToken!);

  return user;
};
