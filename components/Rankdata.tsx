import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";


async function fetchData(id: string) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/get_rank?rank_id=${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Data not found');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        const responseBody = await response.json();
        return responseBody?.data?.result?.tracks || [];
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
                            img: item.album.blurPicUrl,
                            price: item.artists[0].name,
                        }
                    })
                    setList(newList); // 将新的列表设置为状态变量的值
                    //等待2S
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            )
    }, [id])
    if (loading) {
        return (
            <div style={{ margin: '0 5%' }}>
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
                    {[...Array(6)].map((_, index) => (
                        <Card className="w-[50%px] space-y-5 p-4" key={index}>
                            <Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
            {list.slice(0, 18).map((item, index) => (
                <Card
                    shadow="sm"
                    key={index}
                    isPressable
                    onPress={() => console.log("item pressed")}
                >
                    <CardBody className="overflow-visible p-0">
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

