import { log } from "console";
import { ref, onMounted, reactive, defineComponent, getCurrentInstance, computed, inject, nextTick } from "vue";
import { useRouter } from "vue-router"
import { useStore } from "../../store"
import main from "./main.module.scss";
import { ChatType } from "../../config"
export default defineComponent({
    setup(props, { emit }) {
        const Store = useStore();
        const router = useRouter();
        const socket: any = inject("socket");
        let scroll = ref<HTMLDivElement>()
        onMounted(() => {
            if (!Store.myInfo.name) {
                router.push({
                    name: "Login"
                });
            }
            nextTick(() => {
                scroll.value?.scroll(0, scroll.value?.scrollHeight)
            })
        })

        socket.on("updataMsg", (data: Array<ChatType>) => {
            data.forEach((item, index) => {
                if (!(index < Store.privateChat.length)) {
                    Store.privateChat.push(item);
                }
            })
            nextTick(() => {
                scroll.value?.scroll(0, scroll.value?.scrollHeight)
            })
        });


        socket.on("upPublicMsgData", (data: Array<ChatType>) => {
            data.forEach((item, index) => {
                if (!(index < Store.publicChat.length)) {
                    Store.publicChat.push(item);
                }
            })
            nextTick(() => {
                scroll.value?.scroll(0, scroll.value?.scrollHeight)
            })
        })
        return () => (
            <div class={main['main']} ref={scroll} id="Main">
                {
                    Store.herInfo.uid != '183144b61110a92beb2057c5e' ?
                        Store.privateChat.map(item => {
                            let receiver: boolean = (item.receiver == Store.myInfo.uid && item.uid == Store.herInfo.uid);
                            let sender: boolean = item.uid == Store.myInfo.uid && item.receiver == Store.herInfo.uid;
                            if (receiver || sender) return (
                                <>
                                    {/* <div class={main['time']}>{item['time']}</div> */}
                                    <div class={item.uid == Store.myInfo.uid ? [main['chat-item'], main['my']] : main['chat-item']}>
                                        <div class={main['chat-img']}>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div class={main['message']}>
                                            <span>{item['message']}</span>
                                        </div>
                                    </div>
                                </>
                            )
                        }) : Store.publicChat.map(item => <>
                            {/* <div class={main['time']}>{item['time']}</div> */}
                            <div class={item.uid == Store.myInfo.uid ? [main['chat-item'], main['my']] : main['chat-item']}>
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