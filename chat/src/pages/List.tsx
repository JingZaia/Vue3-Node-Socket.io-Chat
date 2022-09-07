import { defineComponent, inject, reactive, onMounted, computed, nextTick } from "vue"
import { useRouter } from "vue-router";
import Cheader from "../components/Cheader/header"
import List from "../styles/List.module.scss";
import { Socket } from "socket.io-client"
import { log } from "console";
import { useStore } from "../store"
import { UserType, ChatType } from "../config"
export default defineComponent({
    setup() {
        const Store = useStore();
        const socket: any = inject('socket');
        const router = useRouter();
        onMounted(() => {
            if (!Store.myInfo.name) {
                router.push({
                    name: "Login"
                });
            }
            socket.emit("publicChat");
        })
        const ToUser = (info: UserType) => {
            Store.herInfo = info;
            console.log(Store.herInfo);
            router.push({
                path: '/chat'
            });
        }

        return () => (<>
            {/* <Cheader Name="京仔" /> */}
            <div class={List['header']}>
                在线人数({Store.userList.length - 1})
            </div>
            <div class={List['main']}>
                {Store.userList.map(item => (
                    <div class={List['main-item']} onClick={() => ToUser(item as UserType)}>
                        <img class={List['item-img']} src={item.img} alt="" />
                        <div class={List['item-right']}>
                            <div class={List['item-name']}>
                                <span class={List['name']}>{item.uid == Store.myInfo.uid ? `${item.name}(自己)` : item.name}</span>
                                <span class={List['time']}></span>
                            </div>
                            <div class={List['item-msg']}></div>
                        </div>
                    </div>
                ))}

            </div>
        </>)
    }
})