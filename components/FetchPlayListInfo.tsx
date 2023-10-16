import { apiUrl } from "@/public/apiUrl.tsx";
import PlayListInfo from "@/models/PlayListInfo.tsx";


export default async function fetchPlayListInfo(id: any) {
    try {


        const [musicResp, playListInfoResp] = await Promise.all([
                fetch(`${apiUrl}/playlist/track/all?id=${id}`, { credentials: 'include' }),
                fetch(`${apiUrl}/playlist/detail?id=${id}`, { credentials: 'include' })
            ]
        )
        if (!playListInfoResp.ok) {
            if (playListInfoResp.status === 404 || musicResp.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok')
            }
        }
        const playListInfoRespBody = await playListInfoResp.json()
        const musicRespBody = await musicResp.json()
        const playListInfo: PlayListInfo = {
            name: playListInfoRespBody?.playlist?.name,
            id: playListInfoRespBody?.playlist?.id,
            userId: playListInfoRespBody?.playlist?.userId,
            coverImgUrl: playListInfoRespBody?.playlist?.coverImgUrl,
            description: playListInfoRespBody?.playlist?.description,
            createUser: playListInfoRespBody?.playlist?.creator?.nickname,
            createUserAvatar: playListInfoRespBody?.playlist?.creator?.avatarUrl,
            createUserSignature: playListInfoRespBody?.playlist.creator?.signature,
            createTime: playListInfoRespBody?.playlist?.createTime,
            playCount: playListInfoRespBody?.playlist?.playCount,
            songList: musicRespBody?.songs,
        }

        return playListInfo
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}