export default interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string | undefined;
    coverPicture: string | undefined;
    profilePicture: string | undefined;
    following: string[];
    followers: string[];
    isAdmin: boolean;
    desc: string | undefined;
    city: string | undefined;
    from: string | undefined;
    relationship: number | undefined;
}