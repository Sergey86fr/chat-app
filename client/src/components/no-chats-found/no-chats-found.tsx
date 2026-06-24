import {useChatStore} from "../../store/useChatStore.ts";
import {MessageCircle} from "lucide-react";

const NoChatsFound = () => {
    const{setActiveTab} = useChatStore()

    return (
        <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center',paddingTop:40,paddingLeft:15 }}>
            <div style={{ width:60, height:60, backgroundColor:"white", borderRadius:"50%", display:'flex', justifyContent:'center', alignItems: 'center' }}>
                <MessageCircle width={30} height={30} />
            </div>
            <div>
                <h4>У вас нет текущих чатов</h4>
                <p>Для того чтобы начать новый чат перейдите во вкладку Контакты</p>
            </div>
            <button style={{padding:"8px 16px", borderRadius:5}} onClick={() => setActiveTab("contacts")}>
                Найти контакты
            </button>
        </div>
    );
};

export default NoChatsFound;
