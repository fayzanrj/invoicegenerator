import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

// Props
interface ScreenModalFormProps {
  children: React.ReactNode;
  closeModal: () => void; // Make closeModal required
  isForm: true;
  showCancel?: boolean;
}

// Props
interface ScreenModalLoaderProps {
  children: React.ReactNode;
  isLoader: true;
}

type ScreenModalProps = ScreenModalFormProps | ScreenModalLoaderProps;

const ScreenModal: React.FC<ScreenModalProps> = (props) => {
  const isForm = (props as ScreenModalFormProps).isForm === true;
  const closeModal = (props as ScreenModalFormProps).closeModal;
  const showCancel = (props as ScreenModalFormProps).showCancel;

  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    document.documentElement.style.overflow = "hidden";

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);

      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <main
      className="flex flex-col justify-center items-center min-h-svh py-6 absolute w-screen h-svh left-0 z-40 overflow-y-auto bg-black/40"
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
    </main>
  );
};

export default ScreenModal;
