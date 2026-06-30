import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { TokenStore } from "../lib/tokenStore";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user } = useAuth();

  const socketRef = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    if (!user) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      setIsConnected(false);
      return;
    }

    const socket = io("http://localhost:3000", {
      auth: {
        token: TokenStore.getAccessToken(),
      },

      transports: ["websocket", "polling"],

      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log(
        "[Socket] Connected:",
        socket.id
      );

      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log(
        "[Socket] Disconnected:",
        reason
      );

      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error(
        "[Socket] Error:",
        err.message
      );

      setIsConnected(false);
    });

    socket.on("users:online", ({ count }) => {
      setOnlineCount(count);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        onlineCount,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const ctx = useContext(SocketContext);

  if (!ctx) {
    throw new Error(
      "useSocket harus digunakan di dalam SocketProvider"
    );
  }

  return ctx;
}