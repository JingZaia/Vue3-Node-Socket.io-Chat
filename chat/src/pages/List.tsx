import { defineComponent, inject, reactive, onMounted, computed, nextTick } from "vue"
import { useRouter } from "vue-router";
import Cheader from "../components/Cheader/header"
import List from "../styles/List.module.scss";
import { Socket } from "socket.io-client"
import { log } from "console";
import { useStore } from "../store"
const store = useStore();
interface Lists {
    name: string,
    img: string
}
export default defineComponent({
    setup() {
        const socket: any = inject('socket');
        const router = useRouter();
        onMounted(() => {
            if (store.userList.length < 1) {
                router.push({
                    name: "Login"
                });
            }
        })
        const ToUser = (info: Lists) => {
            store.herInfo.name = info.name;
            store.herInfo.img = info.img;
            console.log(store.herInfo);
            router.push({
                path: '/chat'
            });
        }
        return () => (<>
            {/* <Cheader Name="京仔" /> */}
            <div class={List['header']}>
                在线人数({store.userList.length - 1})
            </div>
            <div class={List['main']}>
                {store.userList.map(item => (
                    <div class={List['main-item']} onClick={() => ToUser(item as Lists)}>
                        <img class={List['item-img']} src={item.img} alt="" />
                        <div class={List['item-right']}>
                            <div class={List['item-name']}>
                                <span class={List['name']}>{item.name == store.myInfo.name ? `${item.name}(自己)` : item.name}</span>
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