import AppConfig from "@/config/app.config";
import { format } from "date-fns";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="flex items-center justify-between gap-2 px-4 py-3 text-sm text-gray-400 bg-gray-900">
          <div>
            <span className="me-2">Copyright © {new Date().getFullYear()}.</span>
            <span>{AppConfig.appName} Invoice</span>
          </div>
          <span>{format(new Date(), "PP HH:mm")}</span>
      </div>
    </footer>
  );
};

export default Footer;
