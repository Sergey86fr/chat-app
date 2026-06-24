import {useAuthStore} from "../store/useAuthStore.ts";
import {useMutation} from "@tanstack/react-query";
import {axiosInstance} from "../lib/axios.ts";
import toast from "react-hot-toast";
import {AxiosError} from "axios";


export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const connectSocket = useAuthStore((state) => state.connectSocket);
    return useMutation({
        mutationFn: async (data: { email:string, password: string}) => {
            const response= await axiosInstance.post("/auth/login", data);
            return response.data;
        },
        onSuccess:(data) => {
            setAuth(data);
            connectSocket()
            toast.success("Logged in successfully!");
        },
        onError: (error) => {
            const message = error instanceof AxiosError
                ? error.response?.data?.message
                : "Registration failed";
            toast.error(message);
        }
    })
}