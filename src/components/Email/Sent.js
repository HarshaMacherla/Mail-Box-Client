import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentActions } from "../../store/Email/SentSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Sent = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const sent = useSelector((state) => state.sent.sent);

  const sentEmails = sent.map((email) => (
    <tr key={email.id}>
      <td onClick={() => handleViewEmail(email)}>{email.subject}</td>
      <td className="text-center" onClick={() => handleViewEmail(email)}>
        {email.body}
      </td>
      <td className="text-end">
        <button className="btn btn-outline-dark btn-sm mx-1">Archive</button>
        <button
          className="btn btn-danger btn-sm mx-1"
          onClick={() => handleDeleteEmail(email)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  const handleViewEmail = (email) => {
    localStorage.setItem("current-email", email.id);
    history.push(`/sent/view-mail/${email.id}`);
  };

  const handleDeleteEmail = async (email) => {
    try {
      const response = await fetch(
        `https://mail-box-client-5e320-default-rtdb.asia-southeast1.firebasedatabase.app/${localStorage.getItem(
          "userId"
        )}/mailbox/sent/${email.id}.json`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      dispatch(sentActions.deleteEmail(email));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchSentMails = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-5e320-default-rtdb.asia-southeast1.firebasedatabase.app/${localStorage.getItem(
            "userId"
          )}/mailbox/sent.json`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.error.message);
        }
        let sentEmails = [];
        if (responseData) {
          const keys = Object.keys(responseData);
          sentEmails = keys.map((key) => ({
            id: key,
            to: responseData[key].to,
            subject: responseData[key].subject,
            body: responseData[key].body,
          }));
        }
        console.log(sentEmails);
        dispatch(sentActions.loadEmails(sentEmails));
      } catch (error) {
        alert(error.message);
      }
    };
    if (!!localStorage.getItem("idToken")) {
      fetchSentMails();
    }
  }, [dispatch]);

  return (
    <>
      {sentEmails.length > 0 ? (
        <table className="table mt-2">
          <thead>
            <tr>
              <th>Subject</th>
              <th className="text-center">Message</th>
              <th className="text-end px-5">Actions</th>
            </tr>
          </thead>
          <tbody>{sentEmails}</tbody>
        </table>
      ) : (
        <h3>Outbox is empty!</h3>
      )}
    </>
  );
};

export default Sent;
