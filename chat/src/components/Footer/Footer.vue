<template>
  <div class="footer">
    <div class="footer-top">
      <textarea class="footer-text" v-model="Text"></textarea>
      <div class="emoji" @click="() => (EmojiStatus = !EmojiStatus)">
        <i class="icon">
          <svg
            viewBox="0 0 1025 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="23117"
          >
            <path
              d="M512.001664 1024C229.238048 1024 0.001664 794.763648 0.001664 512 0.001664 229.236352 229.238048 0 512.001664 0 794.765312 0 1024.001664 229.236352 1024.001664 512 1024.001664 794.763648 794.765312 1024 512.001664 1024ZM512.001664 64C264.571264 64 64.001664 264.5696 64.001664 512 64.001664 759.4304 264.571264 960 512.001664 960 759.432064 960 960.001664 759.4304 960.001664 512 960.001664 264.5696 759.432064 64 512.001664 64ZM401.345664 782.24C448.769664 800.896 501.217664 801.344 548.993664 783.52 596.705664 765.728 658.081664 731.328 681.377664 686.56 691.521664 666.976 698.241664 657.728 717.921664 667.776 737.601664 677.888 740.577664 691.328 730.401664 710.88 697.985664 773.184 643.553664 821.12 577.217664 845.856 544.769664 857.952 510.785664 864 476.833664 864 441.185664 864 406.017664 856.128 371.777664 844.064 350.561664 836.576 327.713664 794.56 339.201664 770.752 348.769664 750.88 380.769664 774.112 401.345664 782.24ZM584.776064 304.555168C555.23312 314.995424 538.470304 318.686112 512.004672 318.686112 481.66512 318.686112 459.37488 314.80768 419.043616 304.364672 413.900288 303.030016 401.38432 299.809664 398.17712 299.013984 368.017632 291.531808 345.520352 288 320.001664 288 178.508704 288 130.431616 297.83168 128.523616 349.505344 128.528576 352.001184 128.523616 417.946528 134.623808 439.344608 153.3024 504.864992 216.077984 543.232 320.001664 543.232 387.378944 543.232 432.442176 524.36064 470.709728 488.72368 477.84608 482.077888 509.811872 451.386816 512.108192 451.379392 512.17872 451.379168 531.49456 480.652192 536.24912 486.177632 568.58464 523.756032 619.221344 543.232 704.001664 543.232 799.174176 543.232 857.726464 505.707392 882.649408 442.870464 893.405792 415.750944 895.978688 392.948672 895.9776 360.856128 895.9776 299.342304 828.487776 281.364192 704.001664 281.364192 660.625824 281.364192 588.509312 303.231712 584.776064 304.555168ZM831.9776 360.574464C831.978432 385.424608 830.14736 401.652544 823.157984 419.274464 808.167808 457.068416 773.584416 479.232 704.001664 479.232 636.624832 479.232 603.861312 466.630464 584.76144 444.433696 581.92576 441.13824 569.168672 422.133984 567.122496 419.173504 552.868448 398.550112 536.858464 387.298976 511.901152 387.379744 491.433024 387.445952 475.074016 395.497888 458.759456 410.193568 452.897504 415.473824 432.257568 437.0784 427.093312 441.88768 400.32944 466.811776 370.670976 479.232 320.001664 479.232 242.406752 479.232 207.468512 457.045312 195.586784 419.863456 190.644064 404.396032 189.525056 361.769312 192.237376 360.93568 194.506944 360.238144 261.100448 352 320.001664 352 339.432224 352 357.212384 354.791264 382.766688 361.130976 385.756544 361.872704 397.80144 364.97216 403.00112 366.32144 448.151744 378.01232 475.013184 382.686112 512.004672 382.686112 546.967456 382.686112 570.305792 377.54768 606.100768 364.897984 609.963872 363.528512 669.042976 345.364192 704.001664 345.364192 787.940896 345.364192 831.9776 357.094816 831.9776 360.574464Z"
              p-id="23118"
            ></path>
          </svg>
        </i>
      </div>
      <button class="send" v-show="btnStatus" @click="Send(Text)">发送</button>
    </div>
    <Transition name="ShowEmoji">
      <VEmoji
        v-show="EmojiStatus"
        @emoji="(value) => (Text += value != 'undefined' ? value : '')"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import VEmoji from "./components/emoji";
import { useStore } from "../../store";
import {UserType} from "../../config"
import {
  ref,
  watchEffect,
  defineEmits,
  defineProps,
  inject,
  reactive,
} from "vue";
const store = useStore();
const socket: any = inject("socket");
let EmojiStatus = ref<boolean>(false);
let Text = ref<string>("");
let btnStatus = ref<boolean>(false);
watchEffect(() => {
  btnStatus.value = Text.value ? Text.value.length > 0 : false;
});
// socket.on("updataMsg", (data: ChatType) => {
//   console.log(data);
//   store.privateChat.push(data);
// });
const Send = async (value: string) => {
  if (value.length < 1) return;
  const datas = {
    uid: store.myInfo.uid,
    receiver: store.herInfo.uid,
    img: store.myInfo.img,
    message: value,
    time: new Date(),
  };
  if (store.herInfo.name != "公共群聊") {
    await socket.emit("privateChat", datas);
    store.privateChat.push(datas);
    // console.log("private", datas);
    Text.value = "";
  } else {
    await socket.emit("publicChat", datas);
    // console.log("public", datas);
    store.publicChat.push(datas);
    Text.value = "";
  }
};
</script>
<style scoped lang="scss">
@import "../../style.scss";
.footer-top {
  width: 100%;
  max-height: 108px;
  display: flex;
  justify-content: center;
  padding: 10px 24px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  gap: 16px;
  .footer-text {
    display: block;
    flex: 1;
    outline: none;
    border: 0;
    resize: none;
    background-color: rgba(236, 239, 248, 0.8);
    font-size: 38px;
    padding: 15px 11px;
    font-family: Microsoft YaHei, "Segoe UI", Tahoma, Geneva, Verdana,
      sans-serif;
    border-radius: 20px;
  }
  .send {
    width: 120px;
    max-height: 80px;
    outline: none;
    border: 0;
    font-size: 32px;
    background-color: $color-primary;
    color: white;
    border-radius: 20px;
  }
  .emoji {
    display: flex;
    align-items: center;
  }
}
.icon {
  width: 60px;
  height: 60px;
  svg {
    width: 60px;
    height: 60px;
  }
}

.ShowEmoji-enter-from,
.ShowEmoji-leave-to {
  height: 0;
}
.ShowEmoji-enter-active,
.ShowEmoji-leave-active {
  transition: all 0.3s;
}
.ShowEmoji-enter-to,
.ShowEmoji-leave-from {
  height: 500px;
}
</style>

