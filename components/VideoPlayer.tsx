import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Image, Button, Spinner } from "@nextui-org/react";
import { HeartIcon } from "./icon/HeartIcon";
import { PauseCircleIcon } from "./icon/PauseCircleIcon";
import { NextIcon } from "./icon/NextIcon";
import { PreviousIcon } from "./icon/PreviousIcon";
import { RepeatOneIcon } from "./icon/RepeatOneIcon";
import { ShuffleIcon } from "./icon/ShuffleIcon";
import fetchMusicInfo from "@/components/FetchMusicInfo.tsx";
import MusicInfo from "@/models/MusicInfo.tsx";

// 将秒数转换为时分秒格式
function formatTime(time: number) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function VideoPlayer({ currentId }: { currentId: string }) {
    const [liked, setLiked] = React.useState(false);
    const [currentSongData, setCurrentSongData] = useState<MusicInfo | null>(null)
    const defaultMusicInfo: MusicInfo = {
        id: 0,
        arName: "Daily Mix",
        musicName: "12 Tracks",
        musicUrl: "./images/album-cover.png",
        picUrl: "",
        lrc: ""
    };
    const audioRef: any = useRef();
    // 控制播放和暂停
    const togglePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        fetchMusicInfo(Number(currentId))
            .then((data: MusicInfo | null) => {
                if (data !== null) {
                    setCurrentSongData(data);
                    audioRef.current.ontimeupdate = () => {
                        setCurrentTime(audioRef.current?.currentTime || 0);
                    };
                    audioRef.current.onloadedmetadata = () => {
                        // setDuration(audioRef.current.duration);
                        setDuration(audioRef.current?.duration);
                    };
                    setTimeout(() => {
                        audioRef.current.play(); // 等待1秒后开始播放
                    }, 100);
                } else {
                    console.log("Data is null or fetching failed.");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [currentId]);


    const handleSeekBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        audioRef.current.currentTime = parseFloat(event.target.value);
        setCurrentTime(parseFloat(event.target.value));
    };


    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        {currentSongData ? (
                            <Image
                                alt="Album cover"
                                className="object-cover"
                                height={200}
                                shadow="md"
                                src={currentSongData.picUrl}
                                width="100%"
                            />
                        ) : (
                            <Spinner label="Loading..." color="warning"/>
                        )}
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">{currentSongData?.musicName ? currentSongData?.musicName : "Daily Mix"}</h3>
                                <p className="text-small text-foreground/80">{currentSongData?.arName ? currentSongData?.arName : "12 Tracks"}</p>
                                <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
                            </div>
                            <Button
                                isIconOnly
                                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                radius="full"
                                variant="light"
                                onPress={() => setLiked((v) => !v)}
                            >
                                <HeartIcon
                                    className={liked ? "[&>path]:stroke-transparent" : ""}
                                    fill={liked ? "currentColor" : "none"}
                                />
                            </Button>
                        </div>

                        <div className="flex flex-col mt-3 gap-1">
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleSeekBarChange}
                            />

                            <div className="flex justify-between">
                                <p className="text-small">{formatTime(currentTime)}</p>
                                <p className="text-small text-foreground/50">{formatTime(duration)}</p>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-center">
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <RepeatOneIcon className="text-foreground/80"/>
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <PreviousIcon/>
                            </Button>
                            <audio ref={audioRef} src={currentSongData?.musicUrl}/>
                            <Button
                                isIconOnly
                                className="w-auto h-auto data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                                onClick={togglePlay}
                            >
                                <PauseCircleIcon size={54}/>
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <NextIcon/>
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <ShuffleIcon className="text-foreground/80"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
