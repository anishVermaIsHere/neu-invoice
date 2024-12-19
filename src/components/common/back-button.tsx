'use client';
import { useRouter } from "next/navigation";
import { Icons } from "../ui/icons";

const BackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <>
        <span className="px-2 py-1 flex rounded cursor-pointer bg-white hover:bg-gray-200" onClick={goBack}>
            <Icons.arrowleft className="me-1" /> Back
        </span>
    </>
  );
};

export default BackButton;
