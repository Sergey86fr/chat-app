import type {User} from "./user.ts";
import type {Message} from "./message.ts";

export interface Chat {
    user: User;           // данные собеседника
    lastMessage?: Message;    // последнее сообщение
    unreadCount?: number;     // можно добавить позже
}