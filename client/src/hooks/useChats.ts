import {useQuery} from "@tanstack/react-query";
import type {User} from "../types/user.ts";
import {axiosInstance} from "../lib/axios.ts";
import {useChatStore} from "../store/useChatStore.ts";

export const useChats = () => {
    const setChats = useChatStore((state) => state.setChats);
    return useQuery<User[]>({
        queryKey:["chats"],
        queryFn: async () => {
            const{ data } = await axiosInstance.get("/messages/chats");
            console.log("Raw data from API:", data);
            setChats(data);
            return data;
        }
    })
}