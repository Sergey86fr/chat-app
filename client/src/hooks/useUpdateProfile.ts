import {axiosInstance} from "../lib/axios.ts";
import {useAuthStore} from "../store/useAuthStore.ts";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {useMutation} from "@tanstack/react-query";

export const useUpdateProfile = () => {
    const setAuthUser = useAuthStore((state) => state.setAuth);
    return useMutation({
        mutationFn: async (data :{ profilePic: string }) => {
            const response = await axiosInstance.put("/auth/update-profile", data);
            return response.data;
        },
        onSuccess:(data) => {
            setAuthUser(data);
            toast.success("Profile updated successfully");
        },
        onError: (error) => {
            const message = error instanceof AxiosError
                ? error.response?.data?.message
                : "Error in update profile";
            toast.error(message);
        }
    })
}