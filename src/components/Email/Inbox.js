import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../../store/Email/InboxSlice";
import { Table } from "react-bootstrap";

const Inbox = () => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.inbox.inbox);

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
        if (responseData) {
          const keys = Object.keys(responseData);
          emailsInInbox = keys.map((key) => {
            return {
              id: key,
              from: responseData[key].from,
              subject: responseData[key].subject,
              body: responseData[key].body,
            };
          });
        }
        dispatch(inboxActions.loadEmails(emailsInInbox));
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
      <Table className="text-center">
        <tbody>
          {inbox.map((email) => (
            <tr key={email.id}>
              <td>{email.subject}</td>
              <td>{email.body}</td>
              <td>
                <button className="btn btn-danger btn-sm rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Inbox;
