
import {useAuthStore} from "../../store/useAuthStore.ts";
import {useChats} from "../../hooks/useChats.ts";
import {useChatStore} from "../../store/useChatStore.ts";
import NoChatsFound from "../no-chats-found/no-chats-found.tsx";
import UsersLoadingSkeleton from "../users-loading-skeleton/users-loading-skeleton.tsx";
import cn from "classnames";
import styles from "./chat-list.module.css"



function ChatsList() {
    const {  chats,  setSelectedUser, selectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const { isLoading, error, refetch } = useChats();



    if (isLoading) return <UsersLoadingSkeleton/>;
    if (chats.length === 0) return <NoChatsFound/>;
    if (error) return (
        <div className="p-4 text-center text-red-500">
            Ошибка загрузки чатов
            <button onClick={() => refetch()} className="ml-2 underline">Повтор</button>
        </div>
    );

    return (
        <>
            {chats.map((chat) => {

                const isSelected= selectedUser?._id === chat._id;

                return(

                <div key={chat._id} onClick={() => setSelectedUser(chat)}  className={cn(styles.chat, {
                    [styles.active]: isSelected,
                })}>

                    <div style={{width: '60px',height:"60px", display:'flex', alignItems:'center', position: 'relative'}}>

                        <img src={ chat?.profilePic || "/avatar.png"} alt="user image"
                             style={{objectFit: 'cover', width: "100%", height:"100%", borderRadius: '50%'}}/>


                        <div className={cn(styles.status, {
                            [styles.online]: onlineUsers.includes(chat._id),
                            [styles.offline] : !onlineUsers.includes(chat._id),
                        })}></div>

                    </div>
                    <div >
                        <h3 style={{fontSize:16, marginBottom:5}}>
                            {chat?.fullName}
                        </h3>
                        {/*<p style={{fontSize:14}}>{ onlineUsers.includes(chat._id)?  "online": "offline" }</p>*/}

                    </div>
                </div>
                )
            })}
        </>
    );
}
export default ChatsList;