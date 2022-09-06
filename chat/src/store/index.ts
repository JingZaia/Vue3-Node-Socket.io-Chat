import { log } from "console";
import { defineStore } from "pinia";
import { reactive, ref } from "vue"
import { ChatType, UserType } from "../config"

export const useStore = defineStore('main', {
    state: () => {
        return {
            myInfo: <UserType>{},
            herInfo: <UserType>{},
            userList: <Array<UserType>>[],
            publicChat: <Array<ChatType>>[],
            privateChat: <Array<ChatType>>[]
        }
    },
    getters: {
        msgList(): Array<ChatType> {
            let data = this.privateChat.filter(item => item.name == this.myInfo.name && item.receiver == this.herInfo.name);
            return data;
        }
    },
    actions: {
    }
})
