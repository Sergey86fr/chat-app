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
    });

    socket.connect();

    set({ socket });

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