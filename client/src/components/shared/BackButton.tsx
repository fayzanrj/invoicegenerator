"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";
import ButtonLayout from "./ButtonLayout";
import UrduFont from "@/constants/UrduFont";

const BackButton = () => {
  // Hook
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  // Function to go back
  const goBack = () => {
    callbackUrl ? router.push(callbackUrl) : router.push('/')
  }

  return (
    <ButtonLayout
      onClick={goBack}
      background="transparent"
      className="!text-black !w-36 NO_PRINT"
    >
      <MdArrowBackIos className="inline-block align-middle" />
      <span className={`${UrduFont} align-top font-semibold`}>واپس جائیں</span>
    </ButtonLayout>
  );
};

export default BackButton;
