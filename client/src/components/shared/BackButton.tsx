import Link from "next/link";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import ButtonLayout from "./ButtonLayout";

// Props
interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, label }) => {
  return (
    <Link href={href} className="w-full mb-2 NO_PRINT">
      <ButtonLayout type="button" isNav background="transparent" className="!text-black">
        <MdArrowBackIos className="inline-block align-middle" />
        <span className="align-middle font-semibold">{label}</span>
      </ButtonLayout>
    </Link>
  );
};

export default BackButton;
