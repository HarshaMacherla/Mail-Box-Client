import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import inboxReducer from "./Email/InboxSlice";
import sentReducer from "./Email/SentSlice";

const store = configureStore({
  reducer: { auth: authReducer, inbox: inboxReducer, sent: sentReducer },
});

export default store;
