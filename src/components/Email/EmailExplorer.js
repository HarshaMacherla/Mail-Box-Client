import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import "./EmailExplorer.css";
import EmailCompose from "./EmailCompose";
import Inbox from "./Inbox";
import Sent from "./Sent";
import Archive from "./Archive";
import ViewInboxEmail from "./ViewInboxEmail";
import ViewSentEmail from "./ViewSentEmail";
import { useSelector } from "react-redux";

const EmailExplorer = () => {
  const history = useHistory();
  const location = useLocation();

  const unread = useSelector((state) => state.inbox.unread);

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
            <p
              className={
                location.pathname.includes("/inbox") ? "highlight" : ""
              }
            >
              Inbox{" "}
              {unread > 0 && <span className="unread-count">{unread}</span>}
            </p>
          </div>
          <div onClick={() => handleNavigation("/sent")}>
            <p
              className={location.pathname.includes("/sent") ? "highlight" : ""}
            >
              Sent
            </p>
          </div>
          <div onClick={() => handleNavigation("/archive")}>
            <p
              className={
                location.pathname.includes("/archive") ? "highlight" : ""
              }
            >
              Archive
            </p>
          </div>
        </div>
      </div>
      <div className="m-0 mx-auto justify-content-center content">
        {location.pathname === "/compose-email" && <EmailCompose />}
        {location.pathname === "/inbox" && <Inbox />}
        {location.pathname === "/sent" && <Sent />}
        {location.pathname === "/archive" && <Archive />}
        {location.pathname ===
          `/inbox/view-mail/${localStorage.getItem("current-email")}` && (
          <ViewInboxEmail />
        )}
        {location.pathname === "/sent/viewMail/*" && <ViewSentEmail />}
      </div>
    </div>
  );
};

export default EmailExplorer;
