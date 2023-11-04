import React, { ChangeEvent, useState } from 'react'
import IndexFrame from "@/pages/components/IndexFrame.tsx";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Input,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/router";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { apiUrl } from "@/public/apiUrl.tsx";
import { Orbit } from "@uiball/loaders";


export default function Login() {
    const router = useRouter()
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [loginMessage, setLoginMessage] = useState("")

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        // 使用 `phone` 和 `password` 调用API进行验证
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/login/cellphone?phone=${phone}&password=${password}`, { credentials: 'include' })
            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Data not found');
                } else {
                    console.info('Network response was not ok');
                }
            }
            const responseBody = await response.json();
            console.info(responseBody)
            if (responseBody.code == 501) {
                setLoading(false)
                setLoginMessage("登录失败，请检查网络")
            } else if (responseBody.code == 400) {
                setLoading(false)
                setLoginMessage("登录失败，请检查网络")
            } else if (responseBody.code == 502) {
                setLoading(false)
                setLoginMessage(responseBody.message)
            } else if (responseBody.code == 200) {
                await router.push('/')
            }
        } catch (error) {
            console.error(error)
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };
    return (
        <>
            <div className="flex flex-col">
                {/*pointer-events-none禁止元素*/}
                <div className="blur-sm">
                    <IndexFrame
                        Title={<NavbarContent className="hidden sm:flex gap-4" justify="start">
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
                        }
                    />
                </div>
                <div className="flex flex-col items-center justify-center mt-[10%]">
                    {loading && (
                        <div className="z-50 flex flex-col items-center">
                            <Orbit size={25} speed={1.5} color="black"/>
                        </div>
                    )}
                    <Card
                        shadow="sm"
                        className={`mx-[5%] lg:w-[30%] ${loading ? 'blur-sm' : ''}`}
                    >
                        <CardHeader>
                            登录网易云账号
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                            <div className="w-full flex flex-col">
                                <div className="grid grid-rows-2 gap-2 w-full">
                                    <Input
                                        size="lg"
                                        type="phoneNumber"
                                        variant="flat"
                                        label="手机号"
                                        onChange={handlePhoneChange}
                                    />
                                    <Input
                                        size="lg"
                                        label="密码"
                                        variant="flat"
                                        onChange={handlePasswordChange}
                                        endContent={
                                            <button className="focus:outline-none" type="button"
                                                    onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeFilledIcon
                                                        className="text-2xl text-default-400 pointer-events-none"/>

                                                ) : (
                                                    <EyeSlashFilledIcon
                                                        className="text-2xl text-default-400 pointer-events-none"/>
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                    />
                                    <text className="accent-red-500 items-center text-center">{loginMessage}</text>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="grid grid-cols-2 gap-2">
                            <Button color="primary" onClick={handleLogin}>
                                登录
                            </Button>
                            <Button color="danger" variant="flat" onClick={() => {
                                router.back()
                            }}>
                                取消
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}