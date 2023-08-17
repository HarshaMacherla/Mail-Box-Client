import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./ViewInboxEmail.css";

const ViewInboxEmail = () => {
  const { mailId } = useParams();

  const inbox = useSelector((state) => state.inbox.inbox);

  const mail = inbox.find((email) => email.id === mailId);

  if (!mail) {
    return (
      <Container>
        <p>Email not found.</p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="my-4">
          <strong>From</strong>
          <p className="my-2">
            <span className="user-initial">
              {mail.from.charAt(0).toUpperCase()}
            </span>{" "}
            {`<${mail.from}>`}
          </p>
          <hr />
        </div>

        <div>
          <strong>Subject</strong>
          <p className="my-2">{mail.subject}</p>
          <hr />
        </div>

        <div className="my-3">
          <p className="my-2">{mail.body}</p>
          <hr />
        </div>
      </Container>
    </>
  );
};

export default ViewInboxEmail;
