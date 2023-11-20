import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
    id: 'menu',
    state: () => {
        return {
            list: [] as any,
            url: ""
        }
    },
    persist: true,
    actions: {
        updateList(list: any) {
            this.list = list
        }
    }
})