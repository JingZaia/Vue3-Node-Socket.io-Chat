

import { useRouter, Router } from "vue-router";
import { defineComponent, defineProps, onMounted } from "vue";
import { useStore } from "../../store"
import header from "./header.module.scss"
export default defineComponent({

    setup(props, ctx) {
        let router: Router = useRouter();
        const store = useStore();
        const ToBack = () => {
            router.go(-1);
            // console.log("back", router.go(-1));
        }
        onMounted(() => {
            router = useRouter();
        })
        return () => (
            <div class={header['header']}>
                <div class={header.back} onClick={ToBack}>
                    <i class={header['icon']}>
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10526" ><path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" p-id="10527"></path></svg>
                    </i>
                </div>
                <div class={header['title']}>{store.herInfo.name}</div>
                <i class={header.icon}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11458" width="60" height="60"><path d="M214.699873 512m-87.440491 0a85.449 85.449 0 1 0 174.880983 0 85.449 85.449 0 1 0-174.880983 0ZM809.300127 512m-87.440491 0a85.449 85.449 0 1 0 174.880983 0 85.449 85.449 0 1 0-174.880983 0ZM512.005117 512m-87.440491 0a85.449 85.449 0 1 0 174.880983 0 85.449 85.449 0 1 0-174.880983 0Z" p-id="11459"></path></svg>
                </i>
            </div>
        )
    }
})