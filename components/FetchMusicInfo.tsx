import MusicInfo from "@/models/MusicInfo.tsx";
import { apiUrl } from "@/public/apiUrl.tsx";

async function fetchRankData(id: string) {
    try {
        // 获取当前时间戳
        const timestamp = new Date().getTime()
        const response = await fetch(`${apiUrl}/playlist/track/all?id=${id}&timestamp=${timestamp}&limit=18`, { credentials: 'include' });

        if (!response.ok) {
            if (response.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok')
            }
        }
        const responseBody = await response.json();

        return responseBody?.songs || [];
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export default async function fetchMusicInfo(id: number): Promise<MusicInfo | null> {
    try {
        const [urlResponse, picUrlResponse, lrcResponse] = await Promise.all([
            fetch(`${apiUrl}/song/url?id=${id}`, { credentials: 'include' }),
            // fetch(`https://music.iqwq.cn/?id=${id}&type=netease`, { credentials: 'include' }),
            fetch(`${apiUrl}/song/detail?ids=${id}`, { credentials: 'include' }),
            fetch(`${apiUrl}/lyric?id=${id}`, { credentials: 'include' })
        ]);
        if (!urlResponse.ok || !picUrlResponse.ok || !lrcResponse) {
            if (urlResponse.status === 404 || picUrlResponse.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok');
            }
        }
        const urlResponseBody = await urlResponse.json();
        const picUrlResponseBody = await picUrlResponse.json();
        const lrcResponseBody = await lrcResponse.json()

        const musicUrl = urlResponseBody?.data[0].url
        // const musicUrl = urlResponseBody?.data[0].link
        const arName = picUrlResponseBody?.songs[0].ar[0].name
        const picUrl = picUrlResponseBody?.songs[0].al.picUrl
        const musicName = picUrlResponseBody?.songs[0].name
        const lrc = lrcResponseBody?.lrc.lyric

        const musicInfo: MusicInfo = {
            id: id,
            arName: arName || '',
            musicName: musicName || '',
            musicUrl: musicUrl || '',
            picUrl: picUrl || '',
            lrc: lrc || '',
        };

        return musicInfo;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
