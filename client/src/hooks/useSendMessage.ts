import {useChatStore} from "../store/useChatStore.ts";
import {useAuthStore} from "../store/useAuthStore.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "../lib/axios.ts";
import toast from "react-hot-toast";

interface SendMessageData {
    text?: string;
    image?: string;
}


export const useSendMessage = () => {
    const queryClient = useQueryClient();
    const selectedUser = useChatStore((state) => state.selectedUser);
    const messages = useChatStore((state) => state.messages);
    const authUser = useAuthStore((state) => state.authUser);
    const setMessages = useChatStore((state) => state.setMessages);

    return useMutation({
        mutationFn: async (messageData: SendMessageData) => {
            if (!selectedUser) throw new Error('No user selected');
            const { data } = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            return data;
        },

        // ✅ Оптимистичное обновление (до отправки)
        onMutate: async (messageData) => {

            if (!selectedUser || !authUser) return { previousMessages: messages };
            // Отменяем любые текущие запросы сообщений
            await queryClient.cancelQueries({ queryKey: ['messages', selectedUser?._id] });

            // Сохраняем предыдущие сообщения для отката
            const previousMessages = messages;

            // Создаём временное сообщение
            const tempId = `temp-${Date.now()}`;
            const optimisticMessage = {
                _id: tempId,
                senderId: authUser?._id,
                receiverId: selectedUser?._id,
                text: messageData.text,
                image: messageData.image,
                createdAt: new Date().toISOString(),
            };

            // Оптимистично обновляем стор
            setMessages([...messages, optimisticMessage]);

            // Возвращаем предыдущее состояние для отката
            return { previousMessages };
        },

        // ✅ При успешной отправке — заменяем временное сообщение на реальное
        onSuccess: (newMessage) => {
            // Заменяем оптимистичное сообщение на реальное
            const updatedMessages = messages.map((msg) =>
                msg._id === newMessage._id ? newMessage : msg
            );
            setMessages(updatedMessages);

            // Инвалидируем кэши, чтобы обновить списки
            queryClient.invalidateQueries({ queryKey: ['messages', selectedUser?._id] });
            queryClient.invalidateQueries({ queryKey: ['chats'] });
        },

        // ✅ При ошибке — откатываем изменения
        onError: (error, _variables, context) => {
            // Восстанавливаем предыдущие сообщения
            if (context?.previousMessages) {
                setMessages(context.previousMessages);
            }
            toast.error((error as any)?.response?.data?.message || "Failed to send message");
        },
    });

}