
import type {User} from "../types/user.ts";
import { useAuthStore } from "./useAuthStore.ts"
import type {Message} from "../types/message.ts";
import {create} from "zustand";

interface IUserChatStore {
    allContacts: User[];
    chats: User[];
    messages: Message[];
    activeTab: "chats"|"contacts";
    selectedUser: User|null;
    isSoundEnabled: boolean;

    setActiveTab: (activeTab:  "chats" | "contacts") => void;
    toggleSound: () => void;
    setSelectedUser: (user: User | null) => void;
    setAllContacts: (contacts:User[]) => void;
    setChats: (chats:User[]) => void;
    setMessages:(messages:Message[]) => void;
    subscribeToMessages:() => void;
    unsubscribeFromMessages:() => void;
}

export const useChatStore = create<IUserChatStore>((set, get) => ({
        allContacts:[],
        chats:[],
        messages: [],
        activeTab: "chats",
        selectedUser: null,
        isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true" ,
        toggleSound: () => {
        localStorage.setItem("isSoundEnabled", String(!get().isSoundEnabled));
        set({ isSoundEnabled: !get().isSoundEnabled });
    },
        setActiveTab: (tab) => set({ activeTab: tab }),
        setSelectedUser: (selectedUser) => set({ selectedUser }),
        setAllContacts: (contacts) => {
            set({allContacts:contacts})
        },
        setChats: (chats) => {
            set({chats})
        },
        setMessages: ( messages ) => {
            set({messages})
        },
        subscribeToMessages: () => {
            const { selectedUser, isSoundEnabled } = get();
            if (!selectedUser) return;

            const socket = useAuthStore.getState().socket;

            socket?.on("newMessage", (newMessage) => {
                const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
                if (!isMessageSentFromSelectedUser) return;

                const currentMessages = get().messages;
                set({ messages: [...currentMessages, newMessage] });

                if (isSoundEnabled) {
                    const notificationSound = new Audio("/sounds/notification.mp3");

                    notificationSound.currentTime = 0; // reset to start
                    notificationSound.play().catch((e) => console.log("Audio play failed:", e));
                }
            });
        },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket?.off("newMessage");
    }


}))