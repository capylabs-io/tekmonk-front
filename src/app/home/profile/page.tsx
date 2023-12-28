"use client";
import React from 'react'
import Image from 'next/image'
import { useUserStore } from '@/store/UserStore'
import { Button } from '@/components/common/Button'
import { FileEdit, Settings } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/Tabs"
import { Progress } from '@/components/common/Progress'
import { UserStat } from '@/components/profile/UserStat'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { New } from '@/components/home/New'
import { delaGothicOne } from '@/app/layout'

export default function Profile() {
    const [userInfo, userCertificate] = useUserStore((state) => [state.userInfo, state.userCertificate])
    const certificates = [
        {
            name: 'Lập trình Python - Lớp Cơ bản',
            type: 'Khoá học Code',
            mission: '10',
            progress: '10%',
            imageUrl: '/image/profile/certificate-logo.png'
        },
        {
            name: 'Lập trình Python -Lớp Nâng Cao',
            type: 'Khoá học Code',
            mission: '10',
            progress: '10%',
            imageUrl: '/image/profile/certificate-logo.png'
        },
        {
            name: 'Lập trình Blockchain Game',
            type: 'Khoá học Code',
            mission: '10',
            progress: '10%',
            imageUrl: '/image/profile/certificate-logo.png'
        },
        {
            name: 'Lập trình Web - Lớp Cơ bản',
            type: 'Khoá học Code',
            mission: '10',
            progress: '10%',
            imageUrl: '/image/profile/certificate-logo.png'
        }
    ]
    const achievements = [
        {
            name: 'Học bá lập trình',
            imageUrl: '/image/profile/achievement1.png'
        },
        {
            name: 'Nhà sáng tạo Game',
            imageUrl: '/image/profile/achievement2.png'
        },
        {
            name: 'Bậc thầy sáng tạo',
            imageUrl: '/image/profile/achievement3.png'
        },
        {
            name: 'Pháp sư CSS',
            imageUrl: '/image/profile/achievement.png'
        }
    ]

    const data = [
        {
            subject: 'PHẢN BIỆN',
            A: 55,
            fullMark: 100,
        },
        {
            subject: 'SÁNG TẠO',
            A: 80,
            fullMark: 100,
        },
        {
            subject: 'LÀM VIỆC NHÓM',
            A: 52,
            fullMark: 100,
        },
        {
            subject: 'XỬ LÝ TÌNH HUỐNG',
            A: 44,
            fullMark: 100,
        },
        {
            subject: 'LẬP TRÌNH',
            A: 86,
            fullMark: 100,
        },
        {
            subject: 'TỰ NGHIÊN CỨU',
            A: 83,
            fullMark: 100,
        },
    ];
    return (
        <>
            <div className='text-xl text-primary-900 px-8'>
                Hồ sơ cá nhân
            </div>
            <div className="w-full flex justify-center bg-[url('/image/profile/profile-banner.png')] bg-no-repeat bg-cover h-[220px] relative mt-4">
                <div className="border-[5px] border-white p-3 rounded-full flex flex-col bg-[#FEF0C7] bg-[url('/image/profile/avatar-x2.png')] items-center justify-center absolute left-8 -bottom-8 h-[152px] w-[152px]" />
            </div>
            <div className='flex w-full justify-between mt-14 px-6'>
                <div>
                    <div className='truncate flex gap-x-2 items-center'>
                        <span className='text-xl font-bold text-primary-950'>{userInfo?.username}
                        </span>
                        <span className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}>
                            {userInfo?.userRank}
                        </span>
                    </div>
                    <div className='text-base text-primary-950'>{userInfo?.specialName}</div>
                </div>
                <div className='flex gap-x-2'>
                    <Button outlined className='text-primary-900 text-sm'>Hồ sơ nghiêm túc</Button>
                    <Button outlined><Settings size={24} className='text-primary-600' /></Button>
                </div>
            </div>
            <Tabs defaultValue="personal" className="w-full mt-5">
                <TabsList className='w-full border-b border-gray-200'>
                    <TabsTrigger value="personal">Cá nhân</TabsTrigger>
                    <TabsTrigger value="project">Dự án</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="overflow-y-auto">
                    <div className='px-6 mt-3'>
                        <div className='text-primary-900'>
                            TIẾN TRÌNH
                        </div>
                        {
                            userCertificate && userCertificate.map((certificate) => {
                                return (
                                    <div className='flex gap-x-2 items-center' key={certificate.name}>
                                        <Image src={certificate.imageUrl || ''} alt='certificate' width={120} height={120} className='mt-5' />
                                        <div className='flex flex-col w-full'>
                                            <span className='text-primary-950 text-xl'>
                                                {certificate.name}
                                            </span>
                                            <div className='flex w-full justify-between items-center mt-1'>
                                                <div className='text-base text-gray-600'>
                                                    {certificate.type}
                                                </div>
                                                <div className='text-sm'>
                                                    <span className='text-primary-950 font-bold'>1/{certificate.mission} nhiệm vụ</span>
                                                    <span className='text-gray-600'> ({certificate.progress})</span>
                                                </div>
                                            </div>
                                            <Progress value={10} className='mt-3 h-3' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr className='border-t border-gray-200 my-4' />
                    <div className='px-6 mt-3'>
                        <div className='text-primary-900'>
                            THÔNG SỐ CHUNG
                        </div>
                        <UserStat />
                    </div>
                    <hr className='border-t border-gray-200 my-4' />
                    <div className='px-6 mt-3'>
                        <div className='w-full flex justify-between items-center'>
                            <span className='text-primary-900'>
                                CHỨNG CHỈ
                            </span>
                            <FileEdit size={24} />
                        </div>
                        <div className='py-4 flex flex-wrap justify-center gap-x-12'>
                            {
                                certificates.map((certificate) => {
                                    return (
                                        <div className='flex flex-col items-center justify-center w-[120px] text-center' key={certificate.name}>
                                            <Image src={certificate.imageUrl || ''} alt='certificate' width={120} height={120} className='mt-5' />
                                            <span className='text-sm mt-2'>
                                                {certificate.name}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                            <Button outlined className='text-xs text-gray-900 mt-4'>Xem tất cả</Button>
                        </div>
                    </div>
                    <hr className='border-t border-gray-200 my-4' />
                    <div className='px-6 mt-3'>
                        <div className='w-full flex justify-between items-center'>
                            <span className='text-primary-900'>
                                THÀNH TỰU
                            </span>
                            <FileEdit size={24} />
                        </div>
                        <div className='py-4 flex flex-wrap justify-center gap-x-12 items-center'>
                            {
                                achievements.map((achievement) => {
                                    return (
                                        <div className='flex flex-col items-center justify-center w-[120px] text-center' key={achievement.name}>
                                            <Image src={achievement.imageUrl || ''} alt='certificate' width={120} height={120} className='mt-5' />
                                            <span className='text-sm mt-2'>
                                                {achievement.name}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                            <Button outlined className='text-xs text-gray-900 mt-4'>Xem tất cả</Button>
                        </div>
                    </div>
                    <hr className='border-t border-gray-200 my-4' />

                    <div className='px-6 mt-3'>
                        <div className='text-primary-900'>
                            KĨ NĂNG
                        </div>
                        <div className='mt-7 leading-1'>
                            <p className='text-gray-700 text-xs'>
                                LỰC CHIẾN
                            </p>
                            <p className={`${delaGothicOne.className} text-primary-700 text-[40px]`}>
                                67
                            </p>
                        </div>
                        <ResponsiveContainer width="100%" height={400}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis />
                                <Radar name="Mike" dataKey="A" stroke="#E4E7EC" fill="#DC58C8" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </TabsContent>
                <TabsContent value="project" className="overflow-y-auto">
                    <New imageUrl="bg-[url('/image/home/profile-pic.png')]" thumbnailUrl='/image/new/new-pic.png' userName='Andy Lou' specialName='Bá Vương Học Đường'
                        userRank={
                            <span className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}>
                                IV
                            </span>
                        } createdAt='23s' likedCount='6.2' commentCount='61' />
                </TabsContent>
            </Tabs >
        </>
    )
}
