import cn from "classnames";
import styles from "./chat-page.module.css"
import ChatContainer from "../../components/chat-container/chat-container.tsx";
import Sidebar from "../../components/sidebar/sidebar.tsx";
import {useChatStore} from "../../store/useChatStore.ts";





const ChatPage = () => {

    const { selectedUser } = useChatStore();



    const isMobile = window.innerWidth <= 767;
    const showChat = isMobile && selectedUser;



    return (
        <div className={cn(styles.chatPage)}>
            <div className={cn(styles.sidebarWrapper, {
                [styles.hiddenOnMobile]: showChat,
            })}>
                <Sidebar />
            </div>

            <div className={cn(styles.chatContainer, {
                [styles.showOnMobile]: showChat,
                [styles.hiddenOnMobile]: !showChat && isMobile,
            })}>
                <ChatContainer />
            </div>


        </div>
    );
};

export default ChatPage;
