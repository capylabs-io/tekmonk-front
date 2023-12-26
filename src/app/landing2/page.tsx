"use client";
import Image from 'next/image'
import React from 'react'
import { Dela_Gothic_One , Kanit } from 'next/font/google'
import { Button } from '@/components/common/Button'
import { ArrowRight } from 'lucide-react'
import { LandingCard } from '@/components/landing/LandingCard'
import { useRouter } from 'next/navigation';

const delaGothicOne = Dela_Gothic_One({ weight: '400', subsets: ['latin'] })
const kanit = Kanit({ weight: '400', subsets: ['latin'] })
export default function Landing() {
    const router = useRouter()
    const handleOnClick = () => {
        router.push('/login')
    }
    return (
        <>
            <nav className='w-full flex justify-between p-4'>
                <Image src='/image/app-logo.png' alt='app logo' width={159} height={32} />
            </nav>
            <div className="w-full relative flex justify-center bg-no-repeat bg-cover max-h-[360px]">
                <Image src='/image/left-banner-pic.png' alt='left banner' className='absolute left-0 mt-48' width={280} height={200} />
                <Image src='/image/right-banner-pic.png' alt='right banner' className='absolute right-0 mt-48' width={280} height={200} />

            </div>
            <div className='z-50 flex flex-col items-center text-center'>
                <div className={`mt-3 text-[64px] text-primary-950 font-semibold ${kanit.className}`}>Vui chơi, sáng tạo và
                    kết nối cộng đồng
                </div>
                <div className='text-2xl text-gray-500'>
                    Được tin dùng bởi hàng nghìn học sinh
                    và phụ huynh của Tekmonk
                </div>
            </div>
            <div className='w-full flex justify-center gap-x-8 mt-40'>
                <div className='rounded-xl shadow-[0_8px_0_0_#E4E7EC] p-6'>
                    <div className='p-5 bg-gradient-to-r from-primary-50 to-[#FBF3FA] rounded-full flex justify-center items-center'><Image src='/image/home/parent-icon.png' alt='parent' width={70} height={70}/></div>
                </div>
            </div>
            <div className='bg-cover bg-no-repeat h-[360px] bg-gradient-to-t from-[#EE94E5]/10 to-[#E079D4] absolute bottom-0'/>
        </>
    )
}
