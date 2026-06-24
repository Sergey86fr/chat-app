import {create} from "zustand";
import {axiosInstance} from "../lib/axios"
import type {User} from "../types/user.ts";
import {Socket, io} from "socket.io-client";


//const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : import.meta.env.VITE_API_URL;


interface useAuthState {
  authUser: User | null;
  isCheckingAuth: boolean;
  setAuth: (authUser: User | null) => void;
  checkAuth: () => Promise<void>;
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<useAuthState>((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  setAuth: (user) => set({ authUser: user }),
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<User>("/auth/check");
      set({authUser: res.data});
    }  catch (error) {
       console.log(error);
       set({authUser: null});
    } finally {
      set({isCheckingAuth: false});
    }
  },
  socket: null,
  onlineUsers: [],
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true, // this ensures cookies are sent with the connection
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
      forceNew: true,
      autoConnect: true,
    });

    socket.connect();

    set({ socket });

    socket.on("connect_error", (error) => {
      console.log("⚠️ Socket connection error:", error);
      if (error.message === "Session ID unknown") {
        socket.disconnect();
        setTimeout(() => {
          console.log("🔄 Reconnecting with new session...");
          socket.connect();
        }, 1000);
      }
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected successfully");
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
    });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
    set({ socket: null, onlineUsers: [] });
  },

}))