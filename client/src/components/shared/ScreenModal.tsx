"use client";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

// Props
interface ScreenModalFormProps {
  children: React.ReactNode;
  closeModal: () => void;
  isForm: true;
  showCancel?: boolean;
}

// Loader props
interface ScreenModalLoaderProps {
  children: React.ReactNode;
  isLoader: true;
}

// Props
type ScreenModalProps = ScreenModalFormProps | ScreenModalLoaderProps;

const ScreenModal: React.FC<ScreenModalProps> = (props) => {
  // Extracting items from FORM PROPS
  const isForm = (props as ScreenModalFormProps).isForm === true;
  const closeModal = (props as ScreenModalFormProps).closeModal;
  const showCancel = (props as ScreenModalFormProps).showCancel;

  // State to keep track of page offset
  const [scrollPosition, setScrollPosition] = useState(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side-only code
      const handleScroll = () => {
        setScrollPosition(window.pageYOffset);

        document.documentElement.style.overflow = "hidden";

        document.addEventListener("scroll", handleScroll);
      };
      return () => {
        document.removeEventListener("scroll", handleScroll);

        document.documentElement.style.overflow = "auto";
      };
    }
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center min-h-svh py-6 absolute w-screen h-dvh left-0 z-40 overflow-y-auto bg-black/40"
      style={{ top: `${scrollPosition}px` }}
    >
      {isForm && closeModal && showCancel && (
        <div className="w-[95%] max-w-96 text-right p-2 bg-white relative top-3 rounded-lg">
          <button onClick={closeModal}>
            <IoMdClose size={"2rem"} />
          </button>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default ScreenModal;
