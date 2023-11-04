import React, { useState } from "react";
import {
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import { AcmeLogo } from "@/components/MusicLogo.tsx";
import { SearchIcon } from "@/components/icon/SearchIcon.tsx";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/router";
import UserLogin from "@/pages/components/UserLogin.tsx";

export default function IndexFrame({ Title }: { Title: any }) {
    // const [selected, setSelected] = React.useState("login");
    const [selected, setSelected] = React.useState<string>("飙升榜")
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter();

    const menuItems = [
        "首页",
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


    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                {/*左侧导航栏*/}
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
                {/*高亮显示*/}
                {Title}
                <NavbarMenu>
                    <NavbarMenuItem>
                        <Link
                            className="w-full"
                            href="/"
                            size="lg"
                        >
                            首页
                        </Link>
                    </NavbarMenuItem>
                </NavbarMenu>
                {/*搜索*/}
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
                <UserLogin/>
            </Navbar>
        </>
    );
}
