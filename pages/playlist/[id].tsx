import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    divider,
    Image, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, Pagination,
    Table,
    TableBody,
    TableCell, TableColumn, TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import fetchPlayListInfo from "@/components/FetchPlayListInfo.tsx";
import PlayListInfo from "@/models/PlayListInfo.tsx";
import IndexFrame from "@/pages/components/IndexFrame.tsx";
import { Phonograph, Play, PlayOne } from "@icon-park/react";
import VideoPlayerButton from "@/components/icon/VideoPlayerButton.tsx";
import VideoPlayer from "@/components/VideoPlayer.tsx";
import { Link } from "@nextui-org/link";
import { NewtonsCradle } from "@uiball/loaders";

export default function PlaylistDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [playListInfo, setPlayListInfo] = useState<PlayListInfo | null>(null)
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(8);
    const [pages, setPages] = useState(1);

    console.info(`歌单：${id}`)
    useEffect(() => {
        if (id) {
            fetchPlayListInfo(id)
                .then(
                    (data) => {
                        setPlayListInfo(data)
                        const pages = Math.ceil(playListInfo?.songList.length / rowsPerPage);
                        setPages(pages)
                        // 设置初始页码为1
                        setPage(1);
                    }
                )
                .catch(err => console.error(err))
                .finally(() => setLoading(false))
        }
    }, [id])
    console.info(playListInfo)

    // 格式化时间戳
    const [createTime, setCreateTime] = useState("");
    useEffect(() => {
        if (playListInfo?.createTime) {
            const date = new Date(playListInfo.createTime);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const formattedDate = `${year}-${month}-${day}`;
            setCreateTime(formattedDate);
        }
    }, [playListInfo?.createTime]); // useEffect 依赖 playListInfo?.createTime

    const [showVideoPlayer, setShowVideoPlayer] = useState(true);
    const [currentId, setCurrentId] = useState('');

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const items = playListInfo?.songList.slice(start, end) || [];

    if (isLoading) {
        return (
            <>
                <IndexFrame Title={
                    <NavbarContent className="hidden sm:flex gap-4" justify="start">
                        <NavbarItem isActive={router.pathname === '/'}>
                            <Link color="foreground" href="/">
                                首页
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive={router.pathname === '/ranking'}>
                            <Link href="#" color="foreground">
                                排行榜
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link color="foreground" href="#">
                                歌单
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                }/>
                <Card className="mx-[5%] mt-[1%] justify-center items-center">
                    {/*顶部*/}
                    <CardHeader>
                        <div className="overflow-hidden flex flex-row items-center grid-cols-2 gap-5 ml-[1%]">
                            <div className="">
                                <p className="text-sm whitespace-nowrap border-1 border-blue-500 text-blue-700 px-2 py-1 inline-block rounded-full">歌单</p>
                            </div>
                            <div className="overflow-hidden flex flex-row  gap-5">
                                <div className="animate-scrolling flex flex-row">
                                    <p className=" text-sm whitespace-nowrap md:text-xl lg:text-xl">{playListInfo?.name}</p>
                                </div>
                                <div className="animate-scrolling flex flex-row">
                                    <p className="text-sm whitespace-nowrap md:text-xl lg:text-xl">{playListInfo?.name}</p>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody className="justify-center items-center">
                        <NewtonsCradle
                            size={40}
                            speed={1.4}
                            color="black"
                        />
                    </CardBody>
                </Card>

            </>
        )
    }

    return (
        <>
            <IndexFrame Title={
                <NavbarContent className="hidden sm:flex gap-4" justify="start">
                    <NavbarItem isActive={router.pathname === '/'}>
                        <Link color="foreground" href="/">
                            首页
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={router.pathname === '/ranking'}>
                        <Link href="#" color="foreground">
                            排行榜
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link color="foreground" href="#">
                            歌单
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            }/>
            <Card className="mx-[5%] mt-[1%]">
                {/*顶部*/}
                <CardHeader>
                    <div className="overflow-hidden flex flex-row items-center grid-cols-2 gap-5 ml-[1%]">
                        <div className="">
                            <p className="text-sm whitespace-nowrap border-1 border-blue-500 text-blue-700 px-2 py-1 inline-block rounded-full">歌单</p>
                        </div>
                        <div className="overflow-hidden flex flex-row  gap-5">
                            <div className="animate-scrolling flex flex-row">
                                <p className=" text-sm whitespace-nowrap md:text-xl lg:text-xl">{playListInfo?.name}</p>
                            </div>
                            <div className="animate-scrolling flex flex-row">
                                <p className="text-sm whitespace-nowrap md:text-xl lg:text-xl">{playListInfo?.name}</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody className="items-center">
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <div className="w-2/5 md:w-2/6 lg:w-1/6  ">
                                <Image
                                    // isZoomed
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={playListInfo?.name}
                                    src={playListInfo?.coverImgUrl}
                                />
                            </div>
                            <div className="flex flex-col lg:w-5/6 md:w-4/6 sm:w-full flex-grow">
                                <User
                                    name={playListInfo?.createUser}
                                    description={playListInfo?.createUserSignature}
                                    avatarProps={{
                                        src: playListInfo?.createUserAvatar
                                    }}
                                    className="justify-start"
                                />
                                {/*介绍块*/}
                                <p className="flex-grow text-gray-500 hidden sm:block">简介:{playListInfo?.description}</p>
                                <p className="text-sm text-gray-500">创建时间：{createTime}</p>
                                <div className="flex flex-row">
                                    <Button
                                        size="md"
                                        color="default"
                                        startContent={
                                            <Play
                                                theme="multi-color"
                                                size="35"
                                                fill={['#333', '#2F88FF', '#FFF', '#43CCF8']}
                                                strokeWidth={3}
                                                strokeLinecap="square"
                                            />
                                        }
                                        className="bg-transparent"
                                    >
                                        播放全部
                                    </Button>
                                </div>
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </CardBody>
                <Divider/>
                <CardBody className="w-full">
                    <div className="flex flex-row">
                        <Table
                            isStriped
                            aria-label="Example static collection table"
                            bottomContent={
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        color="secondary"
                                        page={page}
                                        total={pages}
                                        onChange={handleChangePage}
                                    />
                                </div>}
                            classNames={{
                                wrapper: "min-h-[222px]",
                            }}
                        >
                            <TableHeader>
                                <TableColumn>音乐标题</TableColumn>
                                <TableColumn>歌手</TableColumn>
                                <TableColumn>专辑</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {items.map((song: any, index: number) => (
                                    <TableRow key={index}
                                              className="whitespace-nowrap overflow-x-auto overflow-scroll scrollbar-hide">
                                        <TableCell>
                                            <div className="flex flex-row">
                                                <Play theme="multi-color" size="20"
                                                      fill={['#333', '#2F88FF', '#FFF', '#43CCF8']} strokeWidth={3}
                                                      strokeLinecap="square"/>
                                                {song.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{song.ar[0].name}</TableCell>
                                        <TableCell>{song.al.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
            <div className="z-10">
                <div className="fixed">
                    <VideoPlayerButton onClick={() => setShowVideoPlayer(!showVideoPlayer)}/>
                </div>
                <div className={`fixed bottom-16 right-5 z-10 ${showVideoPlayer && "hidden"} `}>
                    <VideoPlayer currentId={currentId}/>
                </div>
            </div>

            {/*<div className="flex flex-row">*/}
            {/*    <Card className="max-w-full mx-[5%] mt-[5%] flex flex-row">*/}
            {/*        <CardBody className="flex flex-row">*/}
            {/*            <Image*/}
            {/*                // isZoomed*/}
            {/*                shadow="sm"*/}
            {/*                radius="lg"*/}
            {/*                width="100%"*/}
            {/*                alt={playListInfo?.name}*/}
            {/*                className="w-[30%] object-cover h-[30%px]"*/}
            {/*                src={playListInfo?.coverImgUrl}/>*/}
            {/*        </CardBody>*/}
            {/*    </Card>*/}
            {/*</div>*/}
        </>
    )
}