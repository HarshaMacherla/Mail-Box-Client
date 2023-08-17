import { createSlice } from "@reduxjs/toolkit";

const InboxSlice = createSlice({
  name: "inbox",
  initialState: {
    inbox: [],
    unread: 0,
  },
  reducers: {
    storeEmail(state, action) {
      state.inbox.push(action.payload);
    },
    editEmail(state, action) {
      state.inbox = state.inbox.map((email) => {
        if (email.id === action.payload.id) {
          return action.payload;
        } else {
          return email;
        }
      });
      state.unread--;
    },
    deleteEmail(state, action) {
      state.inbox = state.inbox.filter(
        (email) => email.id !== action.payload.id
      );
    },
    loadEmails(state, action) {
      state.inbox = action.payload.emails;
      state.unread = action.payload.unread;
    },
  },
});

export const inboxActions = InboxSlice.actions;

export default InboxSlice.reducer;
