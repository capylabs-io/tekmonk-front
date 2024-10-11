// "use client"
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// export default function ContestHeader() {
//     const router = useRouter();
//     return(
//         <>
//             <div className="h-16 w-full flex items-center justify-between pl-12 pr-12 border-b 
//                 max-mobile:pl-4 max-mobile:pr-4
//             ">
//                 <Image
//                     src="/image/app-logox2.png"
//                     alt="app logo"
//                     width={159}
//                     height={32}
//                     className="hover:cursor-pointer h-8 w-40"
//                     onClick={() => router.push('/home')}
//                 />
//                 <div className="flex w-64 h-full items-center justify-around text-gray-950 
//                     max-mobile:hidden
//                 ">
//                     <div className="text-gray-950 text-bodyLg">Thể lệ</div>
//                     <div>Bài dự thi</div>
//                     <div>Đăng nhập</div>
//                 </div>
//             </div>
//         </>
//     )
// }

"use client";  
import Image from "next/image";  
import { useRouter } from "next/navigation";  
import { useState } from "react";  

export default function ContestHeader() {  
    const router = useRouter();  
    const [isMenuOpen, setIsMenuOpen] = useState(false);  

    const toggleMenu = () => {  
        setIsMenuOpen(!isMenuOpen);  
    };  

    return (  
        <>  
            <div className="h-16 w-full flex items-center justify-between pl-12 pr-12 border-b   
                max-tabletHeader:pl-4 max-tabletHeader:pr-4  
            ">  
                <Image  
                    src="/image/app-logox2.png"
                    alt="app logo"  
                    width={159}  
                    height={32}  
                    className="hover:cursor-pointer h-8 w-40"  
                    // onClick={() => router.push('/home')}  
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
                <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" onClick={toggleMenu}></div>  
            )}  

            {/* Menu dropdown cho màn hình nhỏ */}  
            <div className={`absolute top-16 right-0 w-48 h-full bg-white shadow-md border-t border-gray-200 transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>  
                <div className="flex flex-col items-center py-2 text-gray-950">  
                    <div className="py-2 cursor-pointer hover:bg-gray-100" onClick={() => router.push('/rules')}>Thể lệ</div>  
                    <div className="py-2 cursor-pointer hover:bg-gray-100" onClick={() => router.push('/contest')}>Bài dự thi</div>  
                    <div className="py-2 cursor-pointer hover:bg-gray-100" onClick={() => router.push('/login')}>Đăng nhập</div>  
                </div>  
            </div>  
        </>  
    );  
}