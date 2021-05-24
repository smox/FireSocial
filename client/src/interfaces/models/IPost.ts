export default interface IPost {
    _id: string;
    userId: string;
    title: string;
    text: string;
    img: string;
    likes: string[];
    updatedAt: string;
    createdAt: string;
}