import { ref, reactive, defineComponent, Teleport, onUnmounted } from "vue";
import select from "./selectimg.module.scss";

export default defineComponent({
    setup(props, ctx) {
        let img = reactive({
            woman: [
                "https://img0.baidu.com/it/u=181275341,2948213579&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F22%2F20210722142957_904ed.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664719488&t=a59baa5fa915bf68128705290c910eb7",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F11%2F20210611220601_d4701.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664719488&t=7938b67c5cbef55de8762b443c09387c",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F08%2F20210708031444_e5b62.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664719710&t=80900476a0ce0b3e2b56845915223e81",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F14%2F20200314010127_dfvsv.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664723105&t=4cf24e9ca67ea1635648803b502f0173",
                "https://img0.baidu.com/it/u=2806440027,2588838536&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=370694454,4103921598&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=2852993396,2993242828&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp108298490.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664720295&t=44f92188ddc9645b3ea245de6e36dcc2",
                "https://img2.baidu.com/it/u=114297044,3761407392&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=504",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.crcz.com%2Fallimg%2F202002%2F14%2F1581656243326740.jpg&refer=http%3A%2F%2Fimg.crcz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664720286&t=364970ebc353c39930a6278968edd7fd"
            ],
            man: [
                "https://img2.baidu.com/it/u=1266071006,1157978724&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13110795503%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664719778&t=d576507cbb9b96e21a6449bb0b39cf1e",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14264019895%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664720173&t=0fee3e90b4268ad4a57d36375152f88f",
                "https://img1.baidu.com/it/u=1895229870,1636590364&fm=253&fmt=auto&app=138&f=JPEG?w=488&h=500",
                "https://img0.baidu.com/it/u=3330337397,2769482267&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img1.baidu.com/it/u=811678312,612877076&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14264019958%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664720263&t=cb999ad9a7d602fa7e3060d3b4ca0681",
                "https://img1.baidu.com/it/u=917347058,2407054644&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=4169076225,1070262439&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
                "https://img2.baidu.com/it/u=1591078784,3884251363&fm=253&fmt=auto&app=138&f=JPEG?w=564&h=500",
                "https://img0.baidu.com/it/u=3674314747,4124588027&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
            ]
        })
        const Close = (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
            ctx.emit("close", false);
        }
        return () => (<>
            <div class={select['shade']} onClick={Close}>
            </div>
            <div class={select['select-box']}>
                <div class={select['title']}>女孩/girl</div>
                <div class={select['woman']}>
                    {
                        img.woman.map(item => (
                            <div style={{ backgroundImage: `url(${item})` }} class={select['woman-item']} onClick={() => ctx.emit('via', item, '女')}>
                            </div>
                        ))
                    }
                </div>
                <div class={select['title']}>男孩/boy</div>
                <div class={select['man']}>
                    {
                        img.man.map(item => (
                            <div style={{ backgroundImage: `url(${item})` }} onClick={() => ctx.emit('via', item, '男')} class={select['man-item']} >
                            </div>
                        ))
                    }
                </div>
            </div>
        </>)
    },
})