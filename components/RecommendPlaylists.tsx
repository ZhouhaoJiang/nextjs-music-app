import { apiUrl } from "@/public/apiUrl.tsx";
import React, { useEffect, useState } from "react";
import PlayListInfo from "@/models/PlayListInfo.tsx";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { it } from "node:test";
import { router } from "next/client";
import { useRouter } from "next/router";
import { ThreeBody } from "@uiball/loaders";

async function fetchRecommendPlaylists(cat: string) {
    try {
        const timestamp = new Date().getTime()
        const response = await fetch(`${apiUrl}/top/playlist/highquality&cat=${cat}&timestamp=${timestamp}`, { credentials: 'include' });
        if (!response.ok) {
            if (response.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok');
            }
        }
        const responseBody = await response.json();
        return responseBody?.playlists || [];

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export default function RecommendPlaylists({ cat }: {
    cat: string
}) {
    const router = useRouter();
    const [list, setList] = useState<any>();
    const [loading, setLoading] = useState(true);

    // 添加localStorage
    const CACHE_KEY = `recommend_playlist`;
    const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 60分钟，单位是毫秒

    useEffect(() => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);

            // 检查缓存数据是否过期
            if (Date.now() - parsedData.timestamp < CACHE_EXPIRATION_TIME) {
                setList(parsedData.data);
            } else {
                fetchRecommendPlaylists(cat)
                    .then(
                        (data) => {
                            setList(data);
                            // 更新 localStorage 中的数据
                            const cacheData = {
                                data: data,
                                timestamp: Date.now(),
                            };
                            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
                        }
                    )
                    .finally(() => setLoading(false))
            }
        }
        fetchRecommendPlaylists(cat)
            .then(
                (data) => {
                    setList(data);
                    // 更新 localStorage 中的数据
                    const cacheData = {
                        data: data,
                        timestamp: Date.now(),
                    };
                    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
                }
            )
            .finally(() => setLoading(false))
    }, [cat]);
    // console.info(list)
    // if (loading) {
    //     return (
    //         <div className="flex flex-row justify-center items-center">
    //             <ThreeBody
    //                 size={35}
    //                 speed={1.1}
    //                 color="black"
    //             />
    //         </div>
    //     )
    // }

    return (
        // <div className="gap-2 grid grid-cols-3 z-0 overflow-scroll md:grid-cols-3 lg:grid-cols-6">
        <div className="flex overflow-x-auto overflow-scroll space-x-2">
            {list?.slice(1, 13).map((item: any, index: number) => (
                <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onClick={
                        () => {
                            console.info(item.id)
                            router.push(`/playlist/${item.id}`)
                        }
                    }
                    className="flex-none w-[30%] sm:w-1/3 md:w-1/6 lg:w-1/6"
                    // className="flex-none w-1/3 md:w-1/6 lg:w-1/6"
                >
                    <CardBody className="overflow-visible scrollbar-hide p-0 z-0">
                        <Image
                            isZoomed
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.name}
                            className="w-full object-cover h-[20%px]"
                            src={item.coverImgUrl}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <div className="whitespace-nowrap overflow-scroll scrollbar-hide w-full">
                            <b>{item.name}</b>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}