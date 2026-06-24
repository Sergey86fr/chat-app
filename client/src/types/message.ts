export interface Message {
    _id: string;
    senderId: string;      // ObjectId в виде строки
    receiverId: string;    // ObjectId в виде строки
    text?: string;         // опционально, может не быть, если есть image
    image?: string;        // опционально
    createdAt: string;
    updatedAt?: string;
}