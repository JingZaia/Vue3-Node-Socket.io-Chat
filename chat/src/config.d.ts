//限制接收数据类型
interface ChatType {
    name: string;
    receiver: string;
    img: string;
    message: string;
    time: Date;
}

export { ChatType }