import { log } from "console";
import { ref, onMounted, reactive, defineComponent, getCurrentInstance, computed, inject, nextTick } from "vue";
import { useRouter } from "vue-router"
import { useStore } from "../../store"
import main from "./main.module.scss";
interface ChatType {
    name: string,
    receiver: string,
    img: string,
    message: string,
    time: Date
}
export default defineComponent({
    setup(props, { emit }) {
        const store = useStore();
        const router = useRouter();
        const socket: any = inject("socket");

        onMounted(() => {
            if (store.myInfo.name == '') {
                router.push({
                    name: "Login"
                });
            }
            /*  socket.on("upPublicMsgData", (data: Array<ChatType>) => {
                 data.forEach((item, index) => {
                     if (!(index < store.publicChat.length)) {
                         store.publicChat.push(item);
                     }
                 })
                 console.log('onupPublicMsgData', store.publicChat);
                 console.log(scrollBtn.value?.scrollTop);
             }) */
        })

        socket.on("updataMsg", (data: Array<ChatType>) => {
            data.forEach((item, index) => {
                if (!(index < store.privateChat.length)) {
                    store.privateChat.push(item);
                }
            })
            console.log("updataMsg", store.privateChat);

        });

        socket.on("upPublicMsgData", (data: Array<ChatType>) => {
            data.forEach((item, index) => {
                if (!(index < store.publicChat.length)) {
                    store.publicChat.push(item);
                }
            })
            console.log('onupPublicMsgData', store.publicChat);
            // console.log(scrollBtn);

        })
        return () => (
            <div class={main['main']} >
                {
                    store.herInfo.name != '公共群聊' ?
                        store.privateChat.map(item => {
                            let receiver: boolean = (item.receiver == store.myInfo.name && item.name == store.herInfo.name);
                            let sender: boolean = item.name == store.myInfo.name && item.receiver == store.herInfo.name;
                            if (receiver || sender) return (
                                <>
                                    <div class={main['time']}>{item['time']}</div>
                                    <div class={item.name == store.myInfo.name ? [main['chat-item'], main['my']] : main['chat-item']}>
                                        <div class={main['chat-img']}>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div class={main['message']}>
                                            <span>{item['message']}</span>
                                        </div>
                                    </div>
                                </>
                            )
                        }) : store.publicChat.map(item => <>
                            <div class={main['time']}>{item['time']}</div>
                            <div class={item.name == store.myInfo.name ? [main['chat-item'], main['my']] : main['chat-item']}>
                                <div class={main['chat-img']}>
                                    <img src={item.img} alt="" />
                                </div>
                                <div class={main['message']}>
                                    <span>{item['message']}</span>
                                </div>
                            </div>
                        </>)
                }
            </div>
        )
    }
})