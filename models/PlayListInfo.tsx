import MusicInfo from "@/models/MusicInfo.tsx";

export default interface PlayListInfo {
    name: string,
    id: number,
    userId: number,
    coverImgUrl: string,
    description: string,
    createUser: string,
    createUserAvatar: string,
    createUserSignature: string,
    createTime: number,
    playCount: string,
    songList: any,
}