import {useAuthStore} from "../store/useAuthStore.ts";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";

export const useLogout= () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const disconnectSocket = useAuthStore((state) => state.disconnectSocket);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const response= await axiosInstance.post("/auth/logout");
            return response.data;
        },
        onSuccess: () => {
            setAuth(null);
            queryClient.clear(); // ✅ очищаем весь кэш React Query
            disconnectSocket();
            toast.success("Logged out successfully");
        },
        onError: (error) => {
            const message = error instanceof AxiosError
                ? error.response?.data?.message
                : "Error logging out";
            toast.error(message);
        }
    })
}