import React from 'react'
import Image from 'next/image'
import { delaGothicOne } from '../layout'
import { Button } from '@/components/common/Button'
import { RecruitmentCard } from '@/components/recruitment/RecruitmentCard'

function Recruitment() {
    return (
        <div className='h-screen relative'>
            <nav className='w-full flex justify-between p-4'>
                <Image src='/image/app-logo.png' alt='app logo' width={159} height={32} />
            </nav>
            <div className="w-full flex items-center justify-center gap-x-48 relative bg-[url('/image/recruitment/recruitment-banner.png')] bg-no-repeat bg-cover h-[300px]">
                <div className='text-white'>
                    <div className={`${delaGothicOne.className} text-5xl !leading-[64px`}>
                        TUYỂN DỤNG TEKMONK
                    </div>
                    <div className='text-bodyLg mt-5'>
                        Tham gia trở thành giáo viên của Tekmonk ngay hôm nay.
                    </div>
                    <div className='flex gap-x-2 mt-5'>
                        <Button className="text-sm !rounded-3xl px-6">Tải mô tả công việc</Button>
                        <Button className="text-sm !bg-transparent !border !border-white !rounded-3xl !px-16">Liên hệ</Button>
                    </div>
                </div>
                <Image src='/image/recruitment/recruitment-pic.png' alt='left banner' className='' width={222} height={200} />
            </div>
            <div className='w-full flex flex-wrap gap-y-8 gap-x-16 justify-center mt-5'>
                <RecruitmentCard imageUrl='/image/recruitment/recruitment-card-pic.png' title='Giáo viên lập trình Frontend ngôn ngữ VueJs (2 năm kinh nghiệm)' description='Mức lương: 8-20 tỷ' tags={['Hà Nội', 'Còn 18 ngày', 'VueJs']} />
                <RecruitmentCard imageUrl='/image/recruitment/recruitment-card-pic.png' title='Giáo viên lập trình Frontend ngôn ngữ VueJs (2 năm kinh nghiệm)' description='Mức lương: 8-20 tỷ' tags={['Hà Nội', 'Còn 18 ngày', 'VueJs']} />
                <RecruitmentCard imageUrl='/image/recruitment/recruitment-card-pic.png' title='Giáo viên lập trình Frontend ngôn ngữ VueJs (2 năm kinh nghiệm)' description='Mức lương: 8-20 tỷ' tags={['Hà Nội', 'Còn 18 ngày', 'VueJs']} />
                <RecruitmentCard imageUrl='/image/recruitment/recruitment-card-pic.png' title='Giáo viên lập trình Frontend ngôn ngữ VueJs (2 năm kinh nghiệm)' description='Mức lương: 8-20 tỷ' tags={['Hà Nội', 'Còn 18 ngày', 'VueJs']} />
                <RecruitmentCard imageUrl='/image/recruitment/recruitment-card-pic.png' title='Giáo viên lập trình Frontend ngôn ngữ VueJs (2 năm kinh nghiệm)' description='Mức lương: 8-20 tỷ' tags={['Hà Nội', 'Còn 18 ngày', 'VueJs']} />
                <RecruitmentCard imageUrl='/image/recruitment/recruitment-card-pic.png' title='Giáo viên lập trình Frontend ngôn ngữ VueJs (2 năm kinh nghiệm)' description='Mức lương: 8-20 tỷ' tags={['Hà Nội', 'Còn 18 ngày', 'VueJs']} />
            </div>
        </div>
    )
}

export default Recruitment