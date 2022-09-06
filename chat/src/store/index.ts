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
            let data = this.privateChat.filter(item => item.uid == this.myInfo.uid && item.receiver == this.herInfo.uid);
            return data;
        }
    },
    actions: {
    }
})
