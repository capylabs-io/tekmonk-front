"use client"
import { ArrowLeft, Clock4, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState('Viewing party CKTG 2023 Đồng hành bởi Youtube Gaming')
    const [eventTime, setEventTime] = useState('Chủ Nhật, 03/12/2023 (15:00 - 23:00)')
    const [eventVenue, setEventVenue] = useState('Nhà thi đấu Tây Hồ')
    const [address, setAddress] = useState('Số 101 Đ. Xuân La, Xuân La, District Tay Ho, Ha Noi City')
    const [month, setMonth] = useState('THÁNG 12')
    const [day, setDay] = useState('03')
    const [weekday, setWeekday] = useState('Chủ Nhật')
    const [content, setContent] = useState('')
    const router = useRouter();
    const handleBackRoute = () => {
        router.back()
    }
    return (
        <div className="mt-3">
            <div className="text-primary-900 flex gap-x-2 px-6 items-center cursor-pointer" onClick={handleBackRoute}>
                <ArrowLeft size={18} className="text-gray-600" />
                <span>Sự kiện {params.id}</span>
            </div>
            <div className="w-full flex justify-center bg-[url('/image/event/event-banner.png')] bg-no-repeat bg-cover h-[256px] relative mt-4" />
            <div className='w-2/3 mx-auto border-r border-l border-b border-gray-200 h-max'>
                <div className='px-4 pt-8 flex justify-between'>
                    <div>
                        <div className='text-2xl font-bold'>{title}</div>
                        <div className='mt-4 text-base flex gap-x-2 items-center text-primary-950'>
                            <Clock4 size={16} />
                            <span>{eventTime}</span>
                        </div>
                        <div className='mt-2 text-base flex gap-x-2 items-start text-primary-950'>
                            <MapPin size={16} className='mt-1' />
                            <div>
                                <div>{eventVenue}</div>
                                <div className='text-sm text-gray-500'>{address}</div>
                            </div>
                        </div>
                    </div>
                    <div className="!rounded-[4px] border w-20 border-gray-200 shadow-[0_3px_0_0_#E4E7EC] text-center h-max">
                        <div className="bg-primary-600 text-white py-1 text-[10px] font-medium !rounded-t-[4px]">
                            {month}
                        </div>
                        <div className="px-2 py-1 !rounded-b-[4px]">
                            <div className="text-2xl text-primary-900 font-bold">{day}</div>
                            <div className="text-gray-600 text-[10px]">{weekday}</div>
                        </div>
                    </div>
                </div>
                <hr className="border-t border-gray-200 my-4" />
                <div className='p-4'>
                    <div className='text-primary-900'>THÔNG TIN</div>
                    <p>Sự kiện Viewing party CKTG 2023 Đồng hành bởi Youtube Gaming được diễn ra lúc 13h00 ngày 19/11/2023 tại 02 địa điểm</p>

                    <ol>
                        <li>Nhà thi đấu Rạch Miễu - Số 1 Hoa Phượng, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh</li>
                        <li>Nhà thi đấu Tây Hồ - Số 101 Đ. Xuân La, Xuân La, Tây Hồ, Hà Nội</li>
                    </ol>

                    <p>Sự kiện có soát vé, với 03 hạng vé như sau:</p>

                    <ul>
                        <li>Hạng vé Thách đấu: giá vé 249,000 đồng
                            <ul>
                                <li>​Quà tặng: ​01 Túi đeo chéo + 01 Túi vải + 01 code in-game + lối đi ưu tiên & chỗ ngồi đẹp</li>
                            </ul>
                        </li>
                        <li>Hạng vé Cao thủ: giá vé 149,000 đồng
                            <ul>
                                <li>​​​​​Quà tặng: 01 Nón bucket + vị trí ngồi đẹp</li>
                            </ul>
                        </li>
                        <li>Hạng vé Kim cương: giá vé 99,000 đồng
                            <ul>
                                <li>Vị trí ngồi trên khán đài</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}