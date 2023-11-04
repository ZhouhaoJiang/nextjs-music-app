import { apiUrl } from "@/public/apiUrl.tsx";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { z } from "zod";
import { ThreeBody } from "@uiball/loaders";
import { Link } from "@nextui-org/link";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentId, setCurrentPlayTime } from "@/redux/store.tsx";
// import BannerInfo from "@/models/BannerInfo.tsx";

type BannerInfo = {
    pic: string;
    song: {
        id: any
    }
};

export async function fetchBannerInfo() {
    try {
        const response = await fetch(`${apiUrl}/banner?type=2`, { credentials: 'include' });
        if (!response.ok) {
            if (response.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok')
            }
        }
        const responseBody = await response.json();
        return responseBody?.banners || [];
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export default function BannerIndex() {
    const [banners, setBanners] = useState<BannerInfo[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();
    const handleSetCurrentId = (id: any) => {
        dispatch(setCurrentId(id));
    };

    // 添加localStorage
    const CACHE_KEY = `recommend_playlist`;
    const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 60分钟，单位是毫秒

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchBannerInfo();
                if (data && data.length > 0) {
                    // 过滤掉 song.id 为空的条目
                    const filteredBanners = data.filter((banner: {
                        song: {
                            id: any;
                        };
                    }) => banner.song?.id);
                    setBanners(filteredBanners);
                    setLoading(false);
                } else {
                    console.error('Invalid or empty data received from API');
                }
            } catch (error) {
                console.error('Error fetching banner info:', error);
            }
        }

        fetchData()
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (banners.length > 1) {
            interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
            }, 3000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [banners]);

    if (loading) {
        return (
            <div className="flex flex-row justify-center items-center mt-[5%]">
                <ThreeBody
                    size={35}
                    speed={1.1}
                    color="black"
                />
            </div>
        )
    }
    const getPreviousIndex = (index: number) => (index - 1 + banners.length) % banners.length;
    const getNextIndex = (index: number) => (index + 1) % banners.length;

    return (
        <Card
            shadow="sm"
            className="max-w-full mx-[5%] mt-[1%]"
        >
            {/*//     <CardBody>*/}
            <div className="flex flex-row justify-center items-center">
                {banners.length > 0 && (
                    <>
                        <img
                            src={banners[getPreviousIndex(currentIndex)].pic}
                            alt={`Banner ${getPreviousIndex(currentIndex) + 1}`}
                            className="z-0 sm:w-2/5 opacity-70"
                        />
                        <img
                            src={banners[currentIndex].pic}
                            alt={`Banner ${currentIndex + 1}`}
                            className="z-10 sm:w-3/5"
                            onClick={() => {
                                handleSetCurrentId(banners[currentIndex].song.id)
                            }}
                        />
                        <img
                            src={banners[getNextIndex(currentIndex)].pic}
                            alt={`Banner ${getNextIndex(currentIndex) + 1}`}
                            className="z-0 sm:w-2/5 opacity-70"
                        />
                    </>
                )}
            </div>
            {/*</CardBody>*/}
        </Card>
    );
}