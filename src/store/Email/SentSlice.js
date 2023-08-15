import { createSlice } from "@reduxjs/toolkit";

const SentSlice = createSlice({
  name: "sent",
  initialState: {
    sent: [],
  },
  reducers: {
    storeEmail(state, action) {
      state.sent.push(action.payload);
    },
    deleteEmail(state, action) {
      state.sent = state.sent((email) => email.id !== action.payload.id);
    },
  },
});

export const sentActions = SentSlice.actions;

export default SentSlice.reducer;
