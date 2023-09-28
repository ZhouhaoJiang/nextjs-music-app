import { useState, useEffect } from "react";

export function VideoPlayer({ music_url }: { music_url: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audio = new Audio(music_url);

    useEffect(() => {
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    const togglePlayPause = () => {
        setIsPlaying((prevState) => !prevState);
    };

    return (
        <div>
            {/* 播放/暂停按钮 */}
            <button onClick={togglePlayPause}>
                {isPlaying ? "暂停" : "播放"}
            </button>
        </div>
    );
}
