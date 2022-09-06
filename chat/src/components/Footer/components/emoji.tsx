import { log } from 'console';
import { reactive, defineComponent, defineEmits } from 'vue'
import Emoji from './emoji.module.scss';
let emoji = reactive([
    ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆"],
    ["😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙"],
    ["😚", "☺️", "🙂", "🤗", "🤔", "😐", "😑", "😶"],
    ["🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪"],
    ["😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒"],
    ["😓", "😔", "😕", "🙃", "🤑", "😲", "☹", "🙁"],
    ["😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧"],
    ["😨", "😩", "😬", "😰", "😱", "😳", "😵", "😡"],
    ["😠", "😷", "🤒", "🤕", "🤢", "🤧", "😇", "🤠"],
    ["🤡", "🤥", "🤓", "😈", "👿", "👹", "👺", "💀"],
    ["👻", "👽", "🤖", "💩", "😺", "😸", "😹", "😻"],
    ["😼", "😽", "🙀", "😿", "😾", "🏻", "🏼", "🏽"],
    ["🏾", "🏿", "🗣", "👤", "👥", "👫", "👬", "👭"],
    ["👂", "👂🏻", "👂🏼", "👂🏽", "👂🏾", "👂🏿", "👃", "👃🏻"],
    ["👃🏼", "👃🏽", "👃🏾", "👃🏿", "👣", "👀", "👁", "👅"],
    ["👄", "💋", "👓", "🕶", "👔", "👕", "👖", "👗"],
    ["👘", "👙", "👚", "👛", "👜", "👝", "🎒", "👞"],
    ["👟", "👠", "👡", "👢", "👑", "👒", "🎩", "🎓"],
    ["⛑", "💄", "💍", "🌂", "💼"],
]);
export default defineComponent({
    setup(props, ctx) {
        const sendEmoji = (value: string) => {
            console.log(value);
            ctx.emit('emoji', value);
        }
        return () => (
            <div class={Emoji['emoji-box']}>
                {
                    emoji.map(col =>
                        <div class={Emoji['emoji-col']} >
                            {col.map(item =>
                                <div class={Emoji['emoji-item']} onClick={sendEmoji.bind(this, item)}>{item}</div>
                            )}
                        </div >)
                }
            </div >
        )
    }
})