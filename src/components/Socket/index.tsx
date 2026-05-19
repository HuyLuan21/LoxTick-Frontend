import socket from "@/helpers/socket";
import { useEffect } from "react";

const Socket = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return <></>;
};

export default Socket;
