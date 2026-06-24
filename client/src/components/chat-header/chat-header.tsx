import {useChatStore} from "../../store/useChatStore.ts";
import cn from "classnames";
import styles from "./chat-header.module.css"
import {X} from "lucide-react";
import {useAuthStore} from "../../store/useAuthStore.ts";

const ChatHeader = () => {

    const{selectedUser, setSelectedUser} = useChatStore()
    const { onlineUsers } = useAuthStore();
    if (!selectedUser) {
        return null;
    }

    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between', width:"100%", marginBottom:40}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                <div className={cn(styles.avatar)}>

                    <div style={{width: '60px', height:"60px", position: 'relative'}}>

                            <img src={ selectedUser?.profilePic || "/avatar.png"} alt="user image"
                                 style={{objectFit: 'cover', width: "100%", height:"100%", borderRadius: '50%'}}/>


                        {/*<div className={cn(styles.status, styles.online)}></div>*/}
                        <div className={cn(styles.status, {
                            [styles.online]: onlineUsers.includes(selectedUser._id),
                            [styles.offline] : !onlineUsers.includes(selectedUser._id),
                        })}></div>

                    </div>
                    <div >
                        <h3 style={{fontSize:16, marginBottom:5}}>
                            {selectedUser?.fullName}
                        </h3>
                        <p style={{fontSize:14}}>{isOnline? "online": "offline"}</p>
                    </div>
                </div>
            </div>

            <button style={{backgroundColor:"transparent", border:"none", cursor:"pointer"}} onClick={()=>setSelectedUser(null)}><X color={"gray"} /></button>

        </div>
    );
};

export default ChatHeader;
