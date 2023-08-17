import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import "./Inbox.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { inboxActions } from "../../store/Email/InboxSlice";

const Inbox = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const inbox = useSelector((state) => state.inbox.inbox);

  const receivedEmails = inbox.map((email) => (
    <tr key={email.id} onClick={() => handleViewEmail(email)}>
      <td>
        <span className={email.read ? "read" : "unread"}></span>
        {email.subject}
      </td>
      <td className="text-center">{email.body}</td>
      <td className="text-end">
        <button className="btn btn-outline-dark btn-sm mx-1">Archive</button>
        <button className="btn btn-danger btn-sm mx-1">Delete</button>
      </td>
    </tr>
  ));

  const handleViewEmail = async (email) => {
    localStorage.setItem("current-email", email.id);
    history.push(`/inbox/view-mail/${email.id}`);

    try {
      const response = await fetch(
        `https://mail-box-client-5e320-default-rtdb.asia-southeast1.firebasedatabase.app/${localStorage.getItem(
          "userId"
        )}/mailbox/inbox/${email.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ ...email, read: true }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error.message);
      }
      console.log(responseData);
      dispatch(inboxActions.editEmail({ ...email, read: true }));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-5e320-default-rtdb.asia-southeast1.firebasedatabase.app/${localStorage.getItem(
            "userId"
          )}/mailbox/inbox.json`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.error.message);
        }
        let emailsInInbox = [];
        let unread = 0;
        if (responseData) {
          const keys = Object.keys(responseData);
          emailsInInbox = keys.map((key) => {
            if (!responseData[key].read) {
              unread++;
            }
            return {
              id: key,
              from: responseData[key].from,
              subject: responseData[key].subject,
              body: responseData[key].body,
              read: responseData[key].read,
            };
          });
        }
        console.log(emailsInInbox);
        dispatch(inboxActions.loadEmails({ emails: emailsInInbox, unread }));
      } catch (error) {
        alert(error.message);
      }
    };
    if (!!localStorage.getItem("idToken")) {
      fetchInbox();
    }
  }, [dispatch]);

  return (
    <>
      {inbox.length > 0 ? (
        <Table className="text-center table mt-2">
          <thead>
            <tr>
              <th>Subject</th>
              <th className="text-center">Message</th>
              <th className="text-end px-5">Actions</th>
            </tr>
          </thead>
          <tbody>{receivedEmails}</tbody>
        </Table>
      ) : (
        <h3>Inbox is empty!</h3>
      )}
    </>
  );
};

export default Inbox;
