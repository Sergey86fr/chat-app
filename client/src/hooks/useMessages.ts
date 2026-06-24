import type {Message} from "../types/message.ts";
import {useQuery} from "@tanstack/react-query";
import {useChatStore} from "../store/useChatStore.ts";
import {axiosInstance} from "../lib/axios.ts";


export const useMessages = () => {
    const setMessages = useChatStore((state) => state.setMessages);
    const selectedUser = useChatStore((state) => state.selectedUser);
    const userId = selectedUser?._id?.toString();
    return useQuery<Message[]>({
        queryKey: ["messages", userId],
        queryFn: async () => {
            if( !userId ) return [];
            const{ data } = await axiosInstance.get(`/messages/${userId}`);
            setMessages(data)
            return data;
        },
        enabled: !!userId,
    })
}