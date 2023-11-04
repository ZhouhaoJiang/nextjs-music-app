import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose }: { isOpen: any, onClose: any }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        // 处理登录逻辑
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Remember Me:", rememberMe);
        // 关闭模态框
        onClose();
    };

    return (
        <div
            className={`modal ${isOpen ? "block" : "hidden"} fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center`}>
            <div className="modal-content bg-white w-96 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Log in</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label>Remember me</label>
                </div>
                <div className="flex justify-between items-center">
                    <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                    <button onClick={handleLogin} className="button-primary">Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
