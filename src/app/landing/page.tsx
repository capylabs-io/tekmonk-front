import Image from 'next/image'
import React from 'react'
import { Dela_Gothic_One } from 'next/font/google'

const delaGothicOne = Dela_Gothic_One({weight: '400',subsets: ['latin'] , variable: '--font-dela'})
export default function Landing() {
    return (
        <>
            <nav className='w-full flex justify-between p-4'>
                <Image src='/image/app-logo.png' alt='app logo' width={159} height={32} />
            </nav>
            <div className='w-full relative flex justify-center'>
                <Image src='/image/landing-banner.png' alt='landing banner' width={1440} height={663} className='absolute left-0 top-0' />
                <div className='absolute left-0 mt-48'>
                    <Image src='/image/left-banner-pic.png' alt='left banner' width={280} height={200} />
                </div>
                <div className='absolute right-0 mt-48'>
                    <Image src='/image/right-banner-pic.png' alt='right banner' width={280} height={200} />
                </div>
                <div className='z-50 flex flex-col items-center mt-[266px]'>
                    <Image src='/image/text-logo.png' alt='right banner' width={490} height={129} />
                    <div className={`mt-6 text-3xl text-gray-500 ${delaGothicOne.variable}`}>HỌC VIỆN CỦA NHỮNG GIẤC MƠ</div>
                </div>
            </div>
            <div className='w-full flex justify-center gap-x-8 my-10'>
                <div className='relative flex flex-col items-center justify-center rounded-3xl bg-[#C0FEE7] w-[332px] min-h-[212px] text-center p-6 rotate-[-5.772deg] gap-y-2'>
                    <Image src='/image/landing-pic-1.png' alt='landing pic 1' width={120} height={120} className='absolute -top-10' />
                    <div className={`${delaGothicOne.variable} font-bold`}>CỬA HÀNG</div>
                    <div>Cá nhân hoá hồ sơ của bản thân với những phụ kiện đặc sắc chỉ có tại TekDojo</div>
                </div>
                <div className='relative flex flex-col items-center justify-center rounded-3xl bg-[#FDF7AE] w-[360px] min-h-[230px] text-center p-6 gap-y-2'>
                    <Image src='/image/landing-pic-2.png' alt='landing pic 1' width={120} height={120} className='absolute -top-10' />
                    <div>XẾP HẠNG</div>
                    <div>Vinh danh những code thủ tay to nhất tại TekMonk và TekDojo</div>
                </div>
                <div className='relative flex flex-col items-center justify-center rounded-3xl bg-[#C6F1FE] w-[332px] min-h-[212px] text-center p-6 rotate-[3deg] gap-y-2'>
                    <Image src='/image/landing-pic-3.png' alt='landing pic 1' width={120} height={120} className='absolute -top-10' />
                    <div>PHÒNG LAB</div>
                    <div>Chia sẻ và trải nghiệm các sản phẩm với tất cả đồng môn ở TekDojo</div>
                </div>
            </div>
            <div className='mt-3'>

            </div>
        </>
    )
}
