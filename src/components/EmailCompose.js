import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Form, Modal } from "react-bootstrap";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function EmailCompose() {
  const recipientRef = useRef();
  const subjectRef = useRef();

  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());

  const [showConfirmation, setShowConfirmation] = useState(false);

  const onEditorStateChange = (editorState) => {
    setEditorContent(editorState);
  };

  const handleSendMail = async (event) => {
    event.preventDefault();
    const recipient = recipientRef.current.value.trim().replace(/[@.]/g, "");
    const subject = subjectRef.current.value;
    const plainText = editorContent.getCurrentContent().getPlainText();

    if (!plainText) {
      setShowConfirmation(true);
    } else {
      setTimeout(() => {
        sendEmail(recipient, subject, plainText);
      }, 0);
    }
  };

  const sendEmail = async (recipient, subject, body) => {
    const recepientData = {
      from: localStorage.getItem("userId"),
      subject,
      body,
    };

    const senderData = {
      to: recipient,
      subject,
      body,
    };

    try {
      const senderResponse = await fetch(
        `https://mail-box-client-5e320-default-rtdb.asia-southeast1.firebasedatabase.app/${localStorage.getItem(
          "userId"
        )}/mailbox/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(senderData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const recepientResponse = await fetch(
        `https://mail-box-client-5e320-default-rtdb.asia-southeast1.firebasedatabase.app/${recipient}/mailbox/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(recepientData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!senderResponse || !recepientResponse) {
        const senderErrorResponse = await senderResponse.json();
        const recepientErrorResponse = await recepientResponse.json();
        throw new Error({
          sender: senderErrorResponse.error.message,
          recepient: recepientErrorResponse.error.message,
        });
      }

      const senderResponseData = await senderResponse.json();
      const recepientResponseData = await recepientResponse.json();

      console.log(senderResponseData);
      console.log(recepientResponseData);

      recipientRef.current.value = "";
      subjectRef.current.value = "";
      setEditorContent(EditorState.createEmpty());

      setShowConfirmation(false);
    } catch (error) {
      alert(error.message.sender);
      alert(error.message.recepient);
    }
  };

  return (
    <div className="border rounded m-3 p-4">
      <Form onSubmit={handleSendMail}>
        <div>
          <label htmlFor="email">
            <strong>To</strong>
          </label>
          <Form.Control
            type="email"
            id="email"
            className="form-control"
            placeholder="example@email.com"
            required
            ref={recipientRef}
          />
          <div className="invalid-feedback">Invalid email</div>
          <div className="valid-feedback">Valid email</div>
        </div>

        <div className="my-3">
          <label htmlFor="emailSubject">
            <strong>Subject</strong>
          </label>
          <Form.Control
            type="text"
            id="emailSubject"
            className="form-control"
            placeholder="Enter subject"
            required
            ref={subjectRef}
          />
        </div>

        <Editor
          editorState={editorContent}
          onEditorStateChange={onEditorStateChange}
          placeholder="Email Body"
        />

        <hr />

        <div className="text-center mt-3">
          <button className="btn btn-dark" type="submit">
            Send Email
          </button>
        </div>
      </Form>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Sending Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Email body is empty! Do you want to send the Mail anyway?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-danger"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() =>
              sendEmail(
                recipientRef.current.value.trim(),
                subjectRef.current.value.trim(),
                ""
              )
            }
          >
            Send Anyway
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmailCompose;
