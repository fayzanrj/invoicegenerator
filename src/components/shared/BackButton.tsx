import Link from "next/link";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";

// Props
interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, label }) => {
  return (
    <Link href={href} className="w-full mb-2 NO_PRINT">
      <button>
        <MdArrowBackIos className="inline-block align-middle" />
        <span className="align-middle font-semibold">{label}</span>
      </button>
    </Link>
  );
};

export default BackButton;
