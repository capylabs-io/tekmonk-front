"use client";  

import Image from "next/image";  
import { useRouter } from "next/navigation";  
import { useLayoutEffect, useState, useEffect } from "react";  

export default function ContestHeader() {  
    const router = useRouter();  
    const [isMenuOpen, setIsMenuOpen] = useState(false);  

    const toggleMenu = () => {  
        setIsMenuOpen(!isMenuOpen);  
    };  

    useLayoutEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (isMenuOpen) {
            html.classList.add('overflow-hidden', 'h-full');
            body.classList.add('overflow-hidden', 'h-full');
            html.style.position = 'fixed';
            html.style.width = '100%';
        } else {
            html.classList.remove('overflow-hidden', 'h-full');
            body.classList.remove('overflow-hidden', 'h-full');
            html.style.position = '';
            html.style.width = '';
        }

        // Debug logging
        console.log('Menu state:', isMenuOpen);
        console.log('HTML classes:', html.className);
        console.log('BODY classes:', body.className);

        return () => {
            html.classList.remove('overflow-hidden', 'h-full');
            body.classList.remove('overflow-hidden', 'h-full');
            html.style.position = '';
            html.style.width = '';
        };
    }, [isMenuOpen]);

    // Debug effect
    useEffect(() => {
        const checkScroll = () => {
            if (isMenuOpen && window.scrollY !== 0) {
                console.warn('Unexpected scroll detected while menu is open');
            }
        };

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [isMenuOpen]);

    return (  
        <>  
            <div className="h-16 w-full flex items-center justify-between pl-12 pr-12 border-b   
                max-tabletHeader:pl-4 max-tabletHeader:pr-4 relative z-20
            ">  
                <Image  
                    src="/image/app-logox2.png"  
                    alt="app logo"  
                    width={159}  
                    height={32}  
                    className="hover:cursor-pointer h-8 w-40"  
                    onClick={() => router.push('/home')}  
                />  
                
                {/* Menu cho màn hình lớn */}  
                <div className="flex w-64 h-full items-center justify-around text-gray-950   
                    max-tabletHeader:hidden  
                ">  
                    <div className="text-gray-950 text-bodyLg">Thể lệ</div>  
                    <div>Bài dự thi</div>  
                    <div>Đăng nhập</div>  
                </div>  

                {/* Nút hamburger cho màn hình nhỏ */}  
                <div className="max-tabletHeader:block hidden">  
                    <button onClick={toggleMenu} className="text-gray-950">  
                        {/* Biểu tượng hamburger */}  
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">  
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />  
                        </svg>  
                    </button>  
                </div>  
            </div>  

            {/* Màn hình màu xám khi menu mở */}  
            {isMenuOpen && (  
                <div className="fixed inset-0 bg-gray-500 opacity-50 z-40 overflow-hidden h-screen" onClick={toggleMenu}></div>  
            )}  

            {/* Menu dropdown cho màn hình nhỏ */}  
            <div className={`absolute top-16 flex flex-col h-[calc(100vh-4rem)] justify-between right-0 w-2/3 bottom-0 bg-white shadow-md border-t border-gray-200 transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>  
                <ul className="flex flex-col items-center py-2 text-gray-950">  
                    <li className="py-2 w-full flex justify-center items-center cursor-pointer hover:bg-gray-100" onClick={() => router.push('/rules')}>Thể lệ</li>  
                    <li className="py-2 w-full flex justify-center items-center cursor-pointer hover:bg-gray-100" onClick={() => router.push('/contest')}>Bài dự thi</li>  
                    <li className="py-2 w-full flex justify-center items-center cursor-pointer hover:bg-gray-100" onClick={() => router.push('/login')}>Đăng nhập</li>  
                </ul> 
                {/* Account section */}
                <div className="flex items-center cursor-pointer py-1 px-3 border border-t border-gray-200">
                    <Image
                        className="w-[30px] h-[30px] rounded-full mr-3 border border-gray-100"
                        src="/image/contest/gold.png"
                        alt="User profile picture"
                        width={40}
                        height={40}
                    />
                    <div className="flex flex-col">
                    <span className="text-sm font-semibold flex items-center">
                        {"Henry Nguyen"}
                    </span>
                    <span className="text-xs text-gray-500">Xem Profile</span>
                    </div>
                </div>
            </div>  
        </>  
    );  
}