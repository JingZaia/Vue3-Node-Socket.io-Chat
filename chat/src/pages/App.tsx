import {
    ref, toRef, reactive, defineComponent, onMounted,
    onUpdated,
    onUnmounted,
    onBeforeMount,
    onBeforeUpdate,
    onBeforeUnmount,
    onErrorCaptured,
    onRenderTracked,
    onRenderTriggered,
    onActivated,
    onDeactivated,
    onServerPrefetch,
} from "vue"
import Text from "./test.module.scss"
import Cheader from "../components/Cheader/header"
import Main from "../components/Main/Main"
import Footer from "../components/Footer/Footer.vue"
const renderDom = defineComponent({
    setup(props, ctx) {
        return () => (<>
            <Cheader />
            <Main />
            <Footer />
        </>)
    },
})
export default renderDom