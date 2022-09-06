import { log } from "console";
import { defineStore } from "pinia";
import { reactive, ref } from "vue"
import { ChatType } from "../config"
interface Lists {
    name: string,
    img: string
}
export const useStore = defineStore('main', {
    state: () => {
        return {
            myInfo: {
                name: ref<string>(''),
                img: ''
            },
            herInfo: <Lists>{},
            userList: <Array<Lists>>[],
            publicChat: <Array<ChatType>>[

            ],
            privateChat: <Array<ChatType>>[

            ]
        }
    },
    getters: {
        msgList(): Array<ChatType> {
            let data = this.privateChat.filter(item => item.name == this.myInfo.name && item.receiver == this.herInfo.name);
            console.log(data);

            return data;
        }
    },
    actions: {
    }
})