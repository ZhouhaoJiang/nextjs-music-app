import { apiUrl } from "@/public/apiUrl.tsx";
import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    useDisclosure
} from "@nextui-org/react";
import Login from "@/pages/user/login.tsx";
import route from "color-convert/route";
import { useRouter } from "next/router";


interface UserInfo {
    profile: {
        nickname: string,
        avatarUrl: string,
    }
}

export async function fetchLoginStatus() {
    try {
        const response = await fetch(`${apiUrl}/login/status`, { credentials: 'include' });
        if (!response.ok) {
            if (response.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok');
            }
        }
        const responseBody = await response.json();
        return responseBody?.data || [];
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export async function fetchUserInfo() {
    try {
        const response = await fetch(`${apiUrl}/user/account`, { credentials: 'include' });
        if (!response.ok) {
            if (response.status === 404) {
                console.error('Data not found');
            } else {
                console.info('Network response was not ok');
            }
        }
        const responseBody = await response.json();

        return responseBody || []
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export default function UserLogin() {
    const router = useRouter()
    const [UserInfo, setUserInfo] = useState<UserInfo>()
    const [loginStatus, setLoginStatus] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const logOut = () => {
        fetch(`${apiUrl}/logout`, { credentials: 'include' })
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loginStatus = await fetchLoginStatus();
                console.info(loginStatus)
                if (loginStatus?.account != null) {
                    const userInfoData = await fetchUserInfo();
                    setUserInfo(userInfoData);
                    setLoginStatus(true);
                } else {
                    console.log("User is not logged in.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    if (!loginStatus) {
        return (
            <Button color="primary" onClick={() => {
                router.push('/user/login')
            }}>
                Log In
            </Button>
        );
    }

    // console.info("11111111111")
    // console.info(UserInfo)
    // 登录的resp.code为200 且有cookie ,未登录的code为301 且无cookie
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    size="sm"
                    src={UserInfo?.profile?.avatarUrl}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{UserInfo?.profile?.nickname}</p>
                </DropdownItem>
                {/*<DropdownItem key="settings">My Settings</DropdownItem>*/}
                {/*<DropdownItem key="team_settings">Team Settings</DropdownItem>*/}
                {/*<DropdownItem key="analytics">Analytics</DropdownItem>*/}
                {/*<DropdownItem key="system">System</DropdownItem>*/}
                {/*<DropdownItem key="configurations">Configurations</DropdownItem>*/}
                {/*<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>*/}
                <DropdownItem key="logout" color="danger" onClick={logOut}>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}