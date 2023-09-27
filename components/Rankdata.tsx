import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";


async function fetchData(id: string) {
    console.log(process.env.NODE_ENV);
    try {
        // 获取当前时间戳
        const timestamp = new Date().getTime()
        console.info(timestamp)
        const response = await fetch(`https://clouldmusicapi.sleepnow.work/playlist/track/all?id=${id}&timestap=${timestamp}&limit=15`, { credentials: 'include' });

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


export default function RankIndex({ id }: { id: string }) {
    const [list, setList] = useState<{ title: string; img: string; price: string; }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(id)
            .then(
                (data) => {
                    const newList = data.map((item: any) => {
                        return {
                            title: item.name,
                            img: item.al.picUrl,
                            price: item.ar[0].name,
                        }
                    })
                    setList(newList); // 将新的列表设置为状态变量的值
                    setLoading(false)
                }
            )
    }, [id])
    if (loading) {
        return (
            <div style={{ margin: '0 5%' }}>
                <div className="gap-5 grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 md:grid-cols-5">
                    {[...Array(5)].map((_, index) => (
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
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-5 z-0">
            {list.slice(0, 15).map((item, index) => (
                <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onPress={() => console.log("item pressed")}
                >
                    <CardBody className="overflow-visible p-0 z-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.title}
                            className="w-full object-cover h-[20%px]"
                            src={item.img}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.title}</b>
                        <p className="text-default-500">{item.price}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

