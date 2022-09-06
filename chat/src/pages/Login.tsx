import { defineComponent, ref, Transition, watchEffect, inject, computed } from "vue";
import { Socket } from "socket.io-client"
import { useRoute, useRouter } from "vue-router";
import SelectImg from "../components/selectImg/selectImg";
import { useStore } from "../store";
import login from "../styles/Login.module.scss";
import { UserType } from "../config"
export default defineComponent({
    setup() {
        const Store = useStore();
        const socket: any = inject('socket');
        const router = useRouter();
        const route = useRoute();
        let name = ref<string>('');
        let bshow = ref<boolean>(false);
        let warn = ref<string>('留下你的鼎鼎大名');
        let img = ref<string>('https://img0.baidu.com/it/u=181275341,2948213579&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500');
        const GetImg = (value: string) => {
            img.value = (value);
            bshow.value = false;
        }
        const close = (value: boolean) => {
            bshow.value = value;
        }
        console.log(Store.myInfo.uid);
        const Go = async (nameInfo: UserType) => {
            await socket.on('GetList', (List: Array<UserType>) => {
                Store.userList = List;
            })
            // let status: boolean = Store.userList.some(item => item.name == nameInfo.name);
            if (nameInfo.name.length > 0) {
                socket.emit('login', nameInfo, (flag: boolean) => {
                    if (flag) {
                        Store.myInfo = nameInfo;
                        // Store.myInfo.img = nameInfo.img;
                        Store.userList.push(nameInfo)
                        router.push({
                            path: "/list"
                        })
                    } else {
                        console.error('用户已经存在');
                        warn.value = '用户已经存在';
                        name.value = ''
                    }
                })
            }
            else {
                warn.value = '用户名不能为空';
                console.error('用户名不能为空');
            }

        }
        return () => (<div class={login['login']}>
            <img class={login['login-img']} onClick={() => bshow.value = true} src={img.value} alt="" />
            <input type="text" class={login['login-name']} style={{ borderColor: (warn.value == '用户已经存在' ? true : warn.value == '用户名不能为空' ? true : false) ? 'red' : 'transparent' }} v-model={name.value} maxlength="11" placeholder={warn.value} />
            <button class={login['login-btn']} onClick={Go.bind(this, {
                uid: '',
                name: name.value,
                img: img.value || 'https://img0.baidu.com/it/u=181275341,2948213579&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
            })}>GO</button>
            {bshow.value ? <SelectImg {...{ onVia: GetImg }}  {...{ onClose: close }} /> : ''}
        </div>)
    }
})