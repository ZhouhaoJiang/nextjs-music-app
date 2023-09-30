import React from "react";
import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";
import { HeartIcon } from "./icon/HeartIcon";
import { PauseCircleIcon } from "./icon/PauseCircleIcon";
import { NextIcon } from "./icon/NextIcon";
import { PreviousIcon } from "./icon/PreviousIcon";
import { RepeatOneIcon } from "./icon/RepeatOneIcon";
import { ShuffleIcon } from "./icon/ShuffleIcon";

export default function VideoPlayer({ id, currentSong }: { id: string, currentSong: any }) {
    const [liked, setLiked] = React.useState(false);

    console.info(currentSong);

    async function fetchSongUrl() {
        console.log(process.env.NODE_ENV);
        try {
            // 获取当前音乐的播放 url
            const response = await fetch(`https://https://clouldmusicapi.sleepnow.work/song/url/v1?id=${id}&level=standard`, { credentials: 'include' });

            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Data not found');
                } else {
                    console.info('Network response was not ok');
                }
            }
            const responseBody = await response.json();

            return responseBody?.songs || [];
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }

    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
            // style={{ maxWidth: "500px", maxHeight: "200px" }}
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Album cover"
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src={currentSong && currentSong.al ? currentSong.al.picUrl : "./images/album-cover.png"}
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">{currentSong ? currentSong.name : "Daily Mix"}</h3>
                                <p className="text-small text-foreground/80">{currentSong && currentSong.ar && currentSong.ar[0] ? currentSong.ar[0].name : "12 Tracks"}</p>
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
                            <Progress
                                aria-label="Music progress"
                                classNames={{
                                    indicator: "bg-default-800 dark:bg-white",
                                    track: "bg-default-500/30",
                                }}
                                color="default"
                                size="sm"
                                value={33}
                            />
                            <div className="flex justify-between">
                                <p className="text-small">1:23</p>
                                <p className="text-small text-foreground/50">4:32</p>
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
                            <Button
                                isIconOnly
                                className="w-auto h-auto data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
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
