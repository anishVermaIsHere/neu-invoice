"use client";
import { useRouter } from "next/navigation";
import { Icons } from "../ui/icons";

const BackButton = ({ classes }: { classes?: string }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div
      className={`px-2 py-1 flex rounded cursor-pointer bg-white hover:bg-gray-200 ${classes}`}
      onClick={goBack}
    >
      <Icons.arrowleft className="me-1" /> Back
    </div>
  );
};

export default BackButton;
