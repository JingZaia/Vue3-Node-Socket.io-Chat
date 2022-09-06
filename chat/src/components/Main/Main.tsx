import { log } from "console";
import { ref, onMounted, reactive, defineComponent, getCurrentInstance, computed, inject, nextTick } from "vue";
import { useRouter } from "vue-router"
import { useStore } from "../../store"
import main from "./main.module.scss";
import { ChatType } from "../../config"
export default defineComponent({
    setup(props, { emit }) {
        const store = useStore();
        const router = useRouter();
        const socket: any = inject("socket");

        onMounted(() => {
            if (!store.myInfo.name) {
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
        })
        return () => (
            <div class={main['main']} >
                {
                    store.herInfo.uid != '183144b61110a92beb2057c5e' ?
                        store.privateChat.map(item => {
                            let receiver: boolean = (item.receiver == store.myInfo.uid && item.uid == store.herInfo.uid);
                            let sender: boolean = item.uid == store.myInfo.uid && item.receiver == store.herInfo.uid;
                            if (receiver || sender) return (
                                <>
                                    <div class={main['time']}>{item['time']}</div>
                                    <div class={item.uid == store.myInfo.uid ? [main['chat-item'], main['my']] : main['chat-item']}>
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
                            <div class={item.uid == store.myInfo.uid ? [main['chat-item'], main['my']] : main['chat-item']}>
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