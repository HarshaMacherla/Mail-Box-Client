import { createSlice } from "@reduxjs/toolkit";

const InboxSlice = createSlice({
  name: "inbox",
  initialState: {
    inbox: [],
  },
  reducers: {
    storeEmail(state, action) {
      state.inbox.push(action.payload);
    },
    deleteEmail(state, action) {
      state.inbox = state.inbox.filter(
        (email) => email.id !== action.payload.id
      );
    },
    loadEmails(state, action) {
      state.inbox = action.payload;
    },
  },
});

export const inboxActions = InboxSlice.actions;

export default InboxSlice.reducer;
