import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import "./EmailExplorer.css";
import EmailCompose from "./EmailCompose";
import Inbox from "./Inbox";
import Sent from "./Sent";
import Archive from "./Archive";
import Spam from "./Spam";
import Trash from "./Trash";

const EmailExplorer = () => {
  const history = useHistory();
  const location = useLocation();

  const handleNavigation = (route) => {
    history.push(route);
  };

  return (
    <div className="sidebar-container">
      <div
        className="nav flex-column nav-pills me-3 sidebar"
        role="tablist"
        aria-orientation="vertical"
      >
        {location.pathname !== "/compose-email" && (
          <div className="d-grid gap-2 d-md-block mb-4 text-center">
            <button
              className="btn btn-dark px-2"
              onClick={() => handleNavigation("/compose-email")}
            >
              Compose Mail
            </button>
          </div>
        )}
        <div className="mx-1">
          <div onClick={() => handleNavigation("/inbox")}>
            <p className={location.pathname === "/inbox" ? "highlight" : ""}>
              Inbox
            </p>
          </div>
          <div onClick={() => handleNavigation("/sent")}>
            <p className={location.pathname === "/sent" ? "highlight" : ""}>
              Sent
            </p>
          </div>
          <div onClick={() => handleNavigation("/archive")}>
            <p className={location.pathname === "/archive" ? "highlight" : ""}>
              Archive
            </p>
          </div>
          <div onClick={() => handleNavigation("/spam")}>
            <p className={location.pathname === "/spam" ? "highlight" : ""}>
              Spam
            </p>
          </div>
          <div onClick={() => handleNavigation("/trash")}>
            <p className={location.pathname === "/trash" ? "highlight" : ""}>
              Trash
            </p>
          </div>
        </div>
      </div>
      <div>
        {location.pathname === "/compose-email" && <EmailCompose />}
        {location.pathname === "/inbox" && <Inbox />}
        {location.pathname === "/sent" && <Sent />}
        {location.pathname === "/archive" && <Archive />}
        {location.pathname === "/spam" && <Spam />}
        {location.pathname === "/trash" && <Trash />}
      </div>
    </div>
  );
};

export default EmailExplorer;
