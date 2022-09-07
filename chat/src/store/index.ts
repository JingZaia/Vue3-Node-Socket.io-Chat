import { defineStore } from "pinia";
import { ChatType, UserType } from "../config"
export const useStore = defineStore('main', {
    state: () => {
        return {
            myInfo: <UserType>{},
            herInfo: <UserType>{},
            userList: <Array<UserType>>[],
            publicChat: <Array<ChatType>>[],
            privateChat: <Array<ChatType>>[],
        }
    },
    getters: {

    },
    actions: {
    }
})
