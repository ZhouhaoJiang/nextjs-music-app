import React, { useState } from "react";
import {
    Avatar, Button, ButtonGroup,
    Card,
    CardBody, CardHeader, Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Tab,
    Tabs
} from "@nextui-org/react";
import { AcmeLogo } from "../components/MusicLogo.tsx";
import { SearchIcon } from "../components/icon/SearchIcon.tsx";
import RankIndex from "@/components/Rankdata.tsx";
import { Link } from "@nextui-org/link";
import VideoPlayer from "@/components/VideoPlayer.tsx";
import VideoPlayerButton from "@/components/icon/VideoPlayerButton.tsx";
import { RankingList, Performance } from "@icon-park/react";
import RecommendPlaylists from "@/components/RecommendPlaylists.tsx";
import IndexFrame from "@/pages/components/IndexFrame.tsx";
import BannerIndex from "@/pages/components/BannerIndex.tsx";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentId, setCurrentId, setCurrentPlayTime, setShowVideoPlayer } from "@/redux/store.tsx";


export default function App() {
    // const [selected, setSelected] = React.useState("login");
    const [selected, setSelected] = React.useState<string>("飙升榜")
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];
    const [currentSongData, setCurrentSongData] = useState({});
    const router = useRouter()

    // store
    const dispatch = useDispatch();
    const showVideoPlayer = useSelector((state: any) => state.player.showVideoPlayer);
    const currentPlayTime = useSelector(setCurrentPlayTime)

    const handleVideoPlayerToggle = () => {
        dispatch(setShowVideoPlayer());
    };


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
                    <NavbarItem isActive={router.pathname === '/playlist'}>
                        <Link color="foreground" href="#">
                            歌单
                        </Link>
                    </NavbarItem></NavbarContent>
            }/>
            <BannerIndex/>
            <div className="flex flex-col w-full z-0 lg:hidden">
                <Card
                    shadow="sm"
                    className="max-w-full mx-[5%] mt-[1%]"
                >
                    <CardBody className="">
                        <div className="flex flex-row flex-wrap space-x-4">
                            <Button color="primary" variant="shadow">One</Button>
                            <Button color="primary" variant="shadow">Two</Button>
                            <Button color="primary" variant="shadow">Three</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="flex flex-col w-full z-0">
                <Card
                    shadow="sm"
                    className="max-w-full mx-[5%] mt-[1%]"
                >
                    <CardHeader className="flex gap-3">
                        <Performance theme="multi-color" size="20" fill={['#333', '#2F88FF', '#FFF', '#43CCF8']}
                                     strokeWidth={3} strokeLinecap="square"/>
                        <h1 className="text-sm">推荐歌单→</h1>
                    </CardHeader>
                    <Divider/>
                    <CardBody className="overflow-hidden">
                        <RecommendPlaylists cat={"全部"}/>
                    </CardBody>
                </Card>
            </div>
            <div className="flex flex-col w-full z-0">
                <Card className="max-w-full mx-[5%] mt-[1%]">
                    <CardHeader className="flex gap-3">
                        <RankingList theme="multi-color" size="20" fill={['#333', '#2F88FF', '#FFF', '#43CCF8']}
                                     strokeWidth={3} strokeLinecap="square"/>
                        <h1 className="text-small">歌曲排行榜→</h1>
                    </CardHeader>
                    <Divider/>
                    <CardBody className="overflow-hidden">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={(key) => setSelected(key as string)}
                        >
                            <Tab key="飙升榜" title="飙升榜">
                                <RankIndex id={"19723756"} setCurrentSongData={setCurrentSongData}/>
                            </Tab>
                            <Tab key="新歌榜" title="新歌榜">
                                <RankIndex id={"3779629"} setCurrentSongData={setCurrentSongData}/>
                            </Tab>
                            <Tab key="热歌榜" title="热歌榜">
                                <RankIndex id={"3778678"} setCurrentSongData={setCurrentSongData}/>
                            </Tab>
                            <Tab key="原创榜" title="原创榜">
                                <RankIndex id={"2884035"} setCurrentSongData={setCurrentSongData}/>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
            <div className="z-10">
                <div className="fixed">
                    <VideoPlayerButton onClick={handleVideoPlayerToggle}/>
                </div>
                <div className={`fixed bottom-16 right-5 z-10 ${!showVideoPlayer && 'hidden'}`}>
                    <VideoPlayer/>
                </div>
            </div>
        </>
    );
}
