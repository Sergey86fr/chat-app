import cn from "classnames"
import styles from "./sidebar.module.css"
import {LogOut, Volume2, VolumeOff} from "lucide-react";
import ChatList from "../chat-list/chat-list.tsx";
import ContactList from "../contacts-list/contacts-list.tsx";
import {useAuthStore} from "../../store/useAuthStore.ts";
import {useLogout} from "../../hooks/useLogout.ts";
import {useChatStore} from "../../store/useChatStore.ts";
import {useUpdateProfile} from "../../hooks/useUpdateProfile.ts";
import {type ChangeEvent, useRef, useState} from "react";
import toast from "react-hot-toast";
import ThemeToggle from "../theme-toggle/theme-toggle.tsx";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

interface ISideBarProps {
    className?: string;
}

const Sidebar = ({className}: ISideBarProps) => {
    const {authUser} = useAuthStore();
    const {mutate: logout, isPending} = useLogout();
    const {activeTab, setActiveTab, isSoundEnabled, toggleSound} = useChatStore();
    const {mutate: updateProfile} = useUpdateProfile();

    const [profilePic, setProfilePic] = useState(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Проверка размера (макс 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result as string;
            setProfilePic(base64Image);
            await updateProfile({profilePic: base64Image});
        };

    }

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={cn(styles.sideBar, className)}>
            <div className={cn(styles.header)}>
                <div className={cn(styles.avatar)}>

                    <div style={{width: '60px', position: 'relative'}}>

                        <button style={{backgroundColor: "transparent", border: "none", position: "relative"}}
                                onClick={() => fileInputRef.current?.click()}>
                            <img src={profilePic || authUser?.profilePic || "/avatar.png"} alt="user image"
                                 style={{objectFit: 'cover', width: "100%", borderRadius: '50%'}}/>
                            <div className={cn(styles.editAvatar)}>
                                <span style={{color: "white"}}>Сменить</span>
                            </div>
                        </button>
                        <div className={cn(styles.status, styles.online)}></div>
                        <input
                            style={{overflow: "hidden", opacity: 0}}
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                        />

                    </div>
                    <div >
                        <h3 style={{fontSize:16, marginBottom:5}}>
                            {authUser?.fullName}
                        </h3>
                        <p style={{fontSize:14}}>online</p>

                    </div>
                </div>

                <div style={{display: "flex", gap:10, alignItems:"center"}}>
                    <ThemeToggle />
                    <button className={cn(styles.exit)}  disabled={isPending}
                            onClick={handleLogout}><LogOut /></button>
                    <button className={cn(styles.sound)}  onClick={() => {
                        mouseClickSound.currentTime = 0;
                        mouseClickSound.play().catch((err: Error) => {
                            console.log(err)});
                        toggleSound();
                    }}>{isSoundEnabled? <Volume2 />: <VolumeOff />}</button>
                </div>



            </div>
            <div className={cn(styles.tabSwitch)}>
                <button onClick={() => setActiveTab("chats")} className={cn(styles.tab, {
                    [styles.active]: activeTab === "chats",
                })}>Chats
                </button>
                <button onClick={() => setActiveTab("contacts")} className={cn(styles.tab, {
                    [styles.active]: activeTab === "contacts"
                })}>Contacts
                </button>

            </div>
            <div className={cn(styles.usersList)} style={{overflowY:"auto", flex:1, display:'flex', flexDirection:'column', gap:20}}>
                {activeTab === "chats" && (<ChatList/>)}
                {activeTab === "contacts" && (<ContactList/>)}

            </div>
        </div>
    );
};

export default Sidebar;
