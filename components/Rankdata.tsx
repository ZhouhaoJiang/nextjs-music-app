import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";


async function fetchData(id: string) {
    console.log(process.env.NODE_ENV);
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
        const responseBody = await response.json();

        return responseBody?.songs || [];
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}


// 接受传递的列表 id，和设置当前音乐id的方法 setCurrentId()
export default function RankIndex({ id, setCurrentId, setCurrentSongData }: {
    id: string,
    setCurrentId: (id: string) => void,
    setCurrentSongData: (data: any) => void
}) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(id)
            .then(
                (data) => {
                    setList(data); // 将新的列表设置为状态变量的值
                    setLoading(false)
                }
            )
    }, [id, setCurrentSongData])
    if (loading) {
        return (
            <div style={{ margin: '0 5%' }}>
                <div className="gap-5 grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-6 md:grid-cols-6">
                    {[...Array(6)].map((_, index) => (
                        <Card className="w-[50%px] space-y-5 p-4" key={index}>
                            <Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-full rounded-lg">
                                    <div className="h-3 w-5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-6 z-0">
            {list.slice(0, 18).map((item: any, index) => (
                <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onClick={() => {
                        setCurrentId(item.id);
                        setCurrentSongData(item);
                    }} // 设置当前播放的音乐 id
                >
                    <CardBody className="overflow-visible p-0 z-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.name}
                            className="w-full object-cover h-[20%px]"
                            src={item.al.picUrl}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.name}</b>
                        <p className="text-default-500">{item.ar[0].name}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

