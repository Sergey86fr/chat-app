import {useAuthStore} from "../../store/useAuthStore.ts";
import {useChatStore} from "../../store/useChatStore.ts";
import {useContacts} from "../../hooks/useContacts.ts";
import UsersLoadingSkeleton from "../users-loading-skeleton/users-loading-skeleton.tsx";
import cn from "classnames";
import styles from "./contact-list.module.css"

function ContactList() {
    const {  allContacts, setSelectedUser, selectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

 const{isLoading} = useContacts()

    if (isLoading) return <UsersLoadingSkeleton />;

    return (
        <>
            {allContacts.map((contact) => {
                const isSelected = selectedUser?._id === contact._id
                    return (


                        <div key={contact._id}  onClick={() => setSelectedUser(contact)} className={cn(styles.contact, {
                            [styles.active]: isSelected,
                        })}>

                            <div style={{width: '60px', height:"60px", position: 'relative'}}>

                                <img src={ contact?.profilePic || "/avatar.png"} alt="user image"
                                     style={{objectFit: 'cover', width: "100%",height:"100%", borderRadius: '50%'}}/>



                                <div className={cn(styles.status, {
                                    [styles.online]: onlineUsers.includes(contact._id),
                                    [styles.offline] : !onlineUsers.includes(contact._id),
                                })}></div>

                            </div>
                            <div >
                                <h3 style={{fontSize:16, marginBottom:5}}>
                                    {contact?.fullName}
                                </h3>
                                {/*<p style={{fontSize:14}}>{ onlineUsers.includes(contact._id)?  "online": "offline" }</p>*/}


                                {/*<h4 style={{color:` ${onlineUsers.includes(contact._id) ? "green" : "red"}`}} className="text-slate-200 font-medium">{contact.fullName}</h4>*/}
                            </div>
                        </div>

                        )


            })}
        </>
    );
}
export default ContactList;