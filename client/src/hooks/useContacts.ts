import {useQuery} from "@tanstack/react-query";
import type {User} from "../types/user.ts";
import {axiosInstance} from "../lib/axios.ts";
import {useChatStore} from "../store/useChatStore.ts";

export const useContacts = () => {
    const setContacts=  useChatStore((state) => state.setAllContacts)
    return useQuery<User[]>({
        queryKey: ["contacts"],
        queryFn: async () => {
            const {data} = await axiosInstance.get("./messages/contacts");
            setContacts(data);
            return data;
        }
    })
}