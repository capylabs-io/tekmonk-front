import { ArrowLeft } from 'lucide-react'
import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { EventCard } from '@/components/event/EventCard';

export default function Event() {
  return (
    <div className="mt-3">
      <div className="text-primary-900 flex gap-x-2 px-6 items-center">
        <ArrowLeft size={18} className="text-gray-600" />
        <span>Sự kiện</span>
      </div>
      <div className="w-full flex justify-center bg-[url('/image/event/event-banner.png')] bg-no-repeat bg-cover h-[256px] relative mt-4" />
      
      <Tabs defaultValue="current" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="current">Sắp diễn ra</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="overflow-y-auto">
          <div className='m-8 flex flex-wrap gap-6'>
            <EventCard imageUrl='/image/event/event-pic-5.png' title='Viewing party CKTG 2023 Đồng hành bởi Youtube Gaming' createdAt='19/11/2023' id='1' />
            <EventCard imageUrl='/image/event/event-pic-1.png' title='Ngày hội Pizza Day của trường Tekmonk' createdAt='10/12/2023' id='2'/>
            <EventCard imageUrl='/image/event/event-pic-2.png' title='Ngày hội phát triển ứng dụng công nghệ cao' createdAt='15/11/2023' id='3'/>
            <EventCard imageUrl='/image/event/event-pic-3.png' title='Lễ hội cắm trại mùa Xuân' createdAt='19/11/2023' id='4'/>
            <EventCard imageUrl='/image/event/event-pic-4.png' title='Tiệc Noel và chào mừng năm mới của Teckmonk' createdAt='19/11/2023' id='5'/>
          </div>
        </TabsContent>
        <TabsContent value="history" className="overflow-y-auto">
        </TabsContent>
      </Tabs>
    </div>
  )
}
