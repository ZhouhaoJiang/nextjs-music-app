import React from "react";
import {
    Avatar,
    Card,
    CardBody,
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
import { SearchIcon } from "../components/SearchIcon.tsx";
import RankIndex from "@/components/Rankdata.tsx";
import { Link } from "@nextui-org/link";

export default function App() {
    // const [selected, setSelected] = React.useState("login");
    const [selected, setSelected] = React.useState<string>("飙升榜")
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    // const [loadedRankData, setLoadedRankData] = React.useState<{ [key: string]: React.ReactNode }>({});
    // useEffect(() => {
    //     // 在这里加载所有的榜单数据
    //     const rankData = {
    //         "飙升榜": <RankIndex id={"19723756"}/>,
    //         "新歌榜": <RankIndex id={"3779629"}/>,
    //         "热歌榜": <RankIndex id={"3778678"}/>,
    //         "原创榜": <RankIndex id={"2884035"}/>,
    //     };
    //     setLoadedRankData(rankData);
    // }, []);

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
    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <AcmeLogo/>
                        <p className="font-bold text-inherit">Music</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-10" justify="start">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            首页
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="#" color="foreground">
                            排行榜
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            歌单
                        </Link>
                    </NavbarItem>
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                    }
                                    className="w-full"
                                    href="#"
                                    size="lg"
                                >
                                    {item}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                </NavbarContent>

                <NavbarContent as="div" justify="center">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[40rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<SearchIcon size={30} width={18} height={18}/>}
                        type="search"
                    />
                </NavbarContent>
                <NavbarContent as="div" className="items-center" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
            <div className="flex flex-col w-full">
                <Card className="max-w-full " style={{ margin: '0 5%', marginTop: '1%' }}>
                    <CardBody className="overflow-hidden">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={(key) => setSelected(key as string)}
                        >
                            {/*{Object.keys(loadedRankData).map((key) => (*/}
                            {/*    <Tab key={key} title={key}>*/}
                            {/*        {loadedRankData[key]}*/}
                            {/*    </Tab>*/}
                            {/*))}*/}
                            <Tab key="飙升榜" title="飙升榜">
                                <RankIndex id={"19723756"}/>
                            </Tab>
                            <Tab key="新歌榜" title="新歌榜">
                                <RankIndex id={"3779629"}/>
                            </Tab>
                            <Tab key="热歌榜" title="热歌榜">
                                <RankIndex id={"3778678"}/>
                            </Tab>
                            <Tab key="原创榜" title="原创榜">
                                <RankIndex id={"2884035"}/>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
