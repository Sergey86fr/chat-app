import { useEffect, useRef } from "react";
import {useChatStore} from "../../store/useChatStore.ts";
import {useAuthStore} from "../../store/useAuthStore.ts";
import {useMessages} from "../../hooks/useMessages.ts";
import MessageInput from "../message-input/message-input.tsx";
import ChatHeader from "../chat-header/chat-header.tsx";
import styles from "./chat-container.module.css";
import cn from "classnames";



interface IChatContainerProps {
    className?: string;
}



function ChatContainer({ className }: IChatContainerProps) {
    const {
        selectedUser,
        messages,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();

    const{ isLoading, isError} = useMessages();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        subscribeToMessages();

        // clean up
        return () => unsubscribeFromMessages();
    }, [selectedUser, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // if (!selectedUser) {
    //     return <div style={{flex:1,textAlign:"center", borderLeft:"1px solid gray", height:"100vh"}} className="flex-1 flex items-center justify-center">Выберите, кому хотели бы написать</div>;
    // }
    //
    // if (isLoading) {
    //     return <div className="flex-1 flex items-center justify-center">Загрузка сообщений...</div>;
    // }
    //
    // if (isError) {
    //     return <div className="flex-1 flex items-center justify-center text-red-500">Ошибка загрузки сообщений</div>;
    // }

    return (
        <div className={cn(styles.chatContainer, className)}>
            {!selectedUser && (<div style={{display:"flex", justifyContent:"center", alignItems:"center"}} >Выберите, кому хотели бы написать</div>)}
            {isLoading  && (<div style={{display:"flex", justifyContent:"center", alignItems:"center"}} >Загрузка сообщений...</div>)}
            {isError  && (<div style={{display:"flex", justifyContent:"center", alignItems:"center"}} className="flex-1 flex items-center justify-center text-red-500">Ошибка загрузки сообщений</div>)}
            {selectedUser && !isLoading && (
                <>
                <ChatHeader />
                <div className={cn(styles.fieldChat)}>

            {messages.length > 0  ? (
                <div className={cn(styles.wrapperChat)}>
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`${styles.message} ${msg.senderId === authUser?._id ? styles.messageEnd : styles.messageStart}`}
                        >
                            <div
                                className={`${styles.bubble} ${
                                    msg.senderId === authUser?._id ?
                                        styles.bubbleEnd : styles.bubbleStart
                                }`}
                            >
                                {msg.image && (
                                    <img style={{width:"100px"}} src={msg.image} alt="Shared" className={styles.messageImage} />
                                )}
                                {msg.text && <p className={styles.messageText}>{msg.text}</p>}
                                <p className={styles.messageTime}>
                                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* 👇 scroll target */}
                    <div ref={messageEndRef} />
                </div>
            ): <div className={cn(styles.wrapperChatEmpty)} >Сообщений пока нет!</div>
            }
        </div>

    <MessageInput />
                </>
            )}
        </div>
    );
}

export default ChatContainer;

