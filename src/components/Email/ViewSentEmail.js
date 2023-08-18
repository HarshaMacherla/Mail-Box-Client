import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewSentEmail = () => {
  const { mailId } = useParams();

  const sent = useSelector((state) => state.sent.sent);

  const mail = sent.find((email) => email.id === mailId);

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
          <strong>To</strong>
          <p className="my-2">
            <span className="user-initial">
              {mail.to.charAt(0).toUpperCase()}
            </span>{" "}
            {`<${mail.to}>`}
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

export default ViewSentEmail;
