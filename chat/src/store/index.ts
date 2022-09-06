import { log } from "console";
import { defineStore } from "pinia";
import { reactive, ref } from "vue"
interface Lists {
    name: string,
    img: string
}
interface ChatType {
    name: string,
    receiver: string,
    img: string,
    message: string,
    time: Date
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
        // GETLIST(value: Array<Lists>) {
        //     this.userList = value
        // }
        GETLIST() {
            return this.userList
        },

    }
})