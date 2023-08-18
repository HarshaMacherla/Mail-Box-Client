import useFetch from "./UseFetch";

const CustomHook = () => {
  const url = `https://mail-box-client-5e320-default-rtdb.asia-southeast1.firebasedatabase.app/${localStorage.getItem(
    "userId"
  )}/mailbox/inbox.json`;

  const data = useFetch(url);

  console.log("This is coming from custom hook", data);

  return <></>;
};

export default CustomHook;
