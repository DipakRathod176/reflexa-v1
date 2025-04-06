import { useEffect, useState } from "react";

const useRealTimeUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("wss://your-backend-url");

    socket.onmessage = (event) => {
      const newUpdate = JSON.parse(event.data);
      setUpdates((prev) => [...prev, newUpdate]);
    };

    return () => socket.close();
  }, []);

  return updates;
};

export default useRealTimeUpdates;
