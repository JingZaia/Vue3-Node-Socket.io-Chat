//限制接收数据类型
interface ChatType {
    name: string;
    receiver: string;
    img: string;
    message: string;
    time: Date;
}
//用户数据类型
interface UserType {
    uid: string,
    name: string,
    img: string
}
export { ChatType, UserType }