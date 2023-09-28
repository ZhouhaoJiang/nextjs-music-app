async function fetchRankData(id: string) {
    try {
        // 获取当前时间戳
        const timestamp = new Date().getTime()
        const response = await fetch(`https://clouldmusicapi.sleepnow.work/playlist/track/all?id=${id}&timestamp=${timestamp}&limit=18`, { credentials: 'include' });

        if (!response.ok) {
            if (response.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok');
            }
        }
        console.info(response)
        const responseBody = await response.json();

        return responseBody?.songs || [];
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

interface MusicInfo {
    id: number;
    name: string;
    musicUrl: string;
    picUrl: string;
    lrc: string
}

async function fetchMusicInfo(id: number): Promise<MusicInfo | null> {
    try {
        const urlResponse = await fetch(`https://clouldmusicapi.sleepnow.work/song/url?id=${id}`, { credentials: 'include' });
        const picUrlResponse = await fetch(`https://clouldmusicapi.sleepnow.work/song/detail?ids=${id}`, { credentials: 'include' });
        const lrcResponse = await fetch(`https://clouldmusicapi.sleepnow.work/lyric?id=${id}`, { credentials: 'include' });
        if (!urlResponse.ok || !picUrlResponse.ok) {
            if (urlResponse.status === 404 || picUrlResponse.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok');
            }
        }
        const urlResponseBody = await urlResponse.json();
        const picUrlResponseBody = await picUrlResponse.json();
        const lrcResponseBody = await lrcResponse.json()

        const musicUrl = urlResponseBody?.data.url
        const picUrl = picUrlResponseBody?.songs[0].al.picUrl
        const name = picUrlResponseBody?.songs[0].name
        const lrc = lrcResponseBody?.lrc

        const musicInfo: MusicInfo = {
            id: id,
            name: name || '',
            musicUrl: name || '',
            picUrl: picUrl || '',
            lrc: lrc || '',
        };

        return musicInfo;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
