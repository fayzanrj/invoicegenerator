"use client";
import { useRouter } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";
import ButtonLayout from "./ButtonLayout";
import UrduFont from "@/constants/UrduFont";

const BackButton = () => {
  // Hook
  const router = useRouter();

  // Function to go back
  const goBack = () => router.back();

  return (
    <section className="self-start">
      <ButtonLayout
        onClick={goBack}
        background="transparent"
        className="!text-black NO_PRINT"
      >
        <MdArrowBackIos className="inline-block align-middle" />
        <span className={`${UrduFont} align-middle font-semibold`}>
          واپس جائیں
        </span>
      </ButtonLayout>
    </section>
  );
};

export default BackButton;
