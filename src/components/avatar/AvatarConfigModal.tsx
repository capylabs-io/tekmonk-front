import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Button } from '../common/button/Button';
import Image from 'next/image';
import { useUserAvatarStore } from '@/store/UserAvatarStore';
export const AvatarConfigModal = () => {
  const [isShowing, hide] = useUserAvatarStore((state) => [state.isShowing, state.hide])
  const clothContent = (
    <div className='flex gap-6 h-full'>
      <div className='bg-[#FFFAEB] bg-center bg-cover bg-no-repeat w-[200px] h-[200px] flex justify-center items-end rounded-2xl border-2 border-gray-30'>
        <Image src="/image/avatar/avatar-default.png" height={200} width={200} alt='pic'>
        </Image>
      </div>
      <div className='grid grid-cols-3 gap-2 w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30'>
        <div className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end h-[120px]' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
          <Image src="/image/avatar/cloth/cloth1.svg" height={120} width={120} alt='pic'>
          </Image>
        </div>
        <div className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end h-[120px]' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
          <Image src="/image/avatar/cloth/cloth2.svg" height={120} width={120} alt='pic'>
          </Image>
        </div>
      </div>
    </div>
  )
  const hairContent = (
    <div className='flex gap-6 h-full'>
      <div className='bg-[#FFFAEB] bg-center bg-cover bg-no-repeat w-[200px] h-[200px] flex justify-center items-end rounded-2xl border-2 border-gray-30'>
        <Image src="/image/avatar/avatar-default.png" height={200} width={200} alt='pic'>
        </Image>
      </div>
      <div className='grid grid-cols-3 gap-2 w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30'>
        <div className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end h-[120px] relative' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
          <Image src="/image/avatar/cloth/cloth1.svg" className='self-end z-[2] absolute' height={120} width={120} alt='pic'>
          </Image>
          <Image src="/image/avatar/hair/hair-back.svg" className='z-[1] absolute' height={120} width={120} alt='pic'>
          </Image>
          <Image src="/image/avatar/hair/hair-front.svg" className='z-[3] absolute' height={120} width={120} alt='pic'>
          </Image>
        </div>
        <div className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end h-[120px] relative' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
          <Image src="/image/avatar/cloth/cloth1.svg" className='self-end z-[2] absolute' height={120} width={120} alt='pic'>
          </Image>
          <Image src="/image/avatar/hair/hair1-back.svg" className='z-[1] absolute' height={120} width={120} alt='pic'>
          </Image>
          <Image src="/image/avatar/hair/hair1-front.svg" className='z-[3] absolute' height={120} width={120} alt='pic'>
          </Image>
        </div>
      </div>
    </div>
  )
  const eyeContent = (
    <div className='flex gap-6 h-full'>
      <div className='bg-[#FFFAEB] bg-center bg-cover bg-no-repeat w-[200px] h-[200px] flex justify-center items-end rounded-2xl border-2 border-gray-30'>
        <Image src="/image/avatar/avatar-default.png" height={200} width={200} alt='pic'>
        </Image>
      </div>
      <div className='grid grid-cols-3 gap-2 w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30'>
        <div className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end h-[120px] relative' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
          <Image src="/image/avatar/cloth/cloth1.svg" className='self-end z-[2] absolute' height={120} width={120} alt='pic'>
          </Image>
          <Image src="/image/avatar/eye/eye.svg" className='z-[3] absolute' height={120} width={120} alt='pic'>
          </Image>
        </div>
      </div>
    </div>
  )
  const mouthContent = (
    <div className='flex gap-6 h-full'>
      <div className='bg-[#FFFAEB] bg-center bg-cover bg-no-repeat w-[200px] h-[200px] flex justify-center items-end rounded-2xl border-2 border-gray-30'>
        <Image src="/image/avatar/avatar-default.png" height={200} width={200} alt='pic'>
        </Image>
      </div>
      <div className='grid grid-cols-3 gap-2 w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30'>
        <div className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end h-[120px] relative' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
          <Image src="/image/avatar/cloth/cloth1.svg" className='self-end z-[2] absolute' height={120} width={120} alt='pic'>
          </Image>
          <Image src="/image/avatar/mouth/mouth.svg" className='z-[3] absolute' height={120} width={120} alt='pic'>
          </Image>
        </div>
      </div>
    </div>
  )
  const themeContent = (
    <div className='flex gap-6 h-full'>
      <div className='bg-[#FFFAEB] bg-center bg-cover bg-no-repeat w-[200px] h-[200px] flex justify-center items-end rounded-2xl border-2 border-gray-30'>
        <Image src="/image/avatar/avatar-default.png" height={200} width={200} alt='pic'>
        </Image>
      </div>
      <div className='grid grid-cols-3 gap-2 w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30'>
        <div className='border-2 border-gray-30 bg-[url(/image/avatar/theme/theme.svg)]  bg-center bg-no-repeat bg-cover rounded-xl flex justify-center items-end h-[120px] relative' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
        </div>
        <div className='border-2 border-gray-30 bg-[url(/image/avatar/theme/theme1.svg)]  bg-center bg-no-repeat bg-cover rounded-xl flex justify-center items-end h-[120px] relative' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
        </div>
      </div>
    </div>
  )
  const specialContent = (
    <div className='flex gap-6 h-full'>
      <div className='bg-[#FFFAEB] bg-center bg-cover bg-no-repeat w-[200px] h-[200px] flex justify-center items-end rounded-2xl border-2 border-gray-30'>
        <Image src="/image/avatar/avatar-default.png" height={200} width={200} alt='pic'>
        </Image>
      </div>
      <div className='grid grid-cols-3 gap-2 w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30'>
        <div className='border-2 border-gray-30 bg-[url(/image/avatar/special/special.svg)]  bg-center bg-no-repeat bg-cover rounded-xl flex justify-center items-end h-[120px] relative' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
        </div>
        <div className='border-2 border-gray-30 bg-[url(/image/avatar/special/special1.svg)]  bg-center bg-no-repeat bg-cover rounded-xl flex justify-center items-end h-[120px] relative' style={{
          boxShadow: "0 2px 0 0 #DDD0DD"
        }}>
        </div>
      </div>
    </div>
  )
  const tabs = [
    {
      value: "cloth",
      title: "Trang phục",
      content: clothContent
    },
    {
      value: "hair",
      title: "Tóc",
      content: hairContent
    },
    {
      value: "eye",
      title: "Mắt",
      content: eyeContent
    },
    {
      value: "mouth",
      title: "Miệng",
      content: mouthContent
    },
    {
      value: "theme",
      title: "Ảnh nền",
      content: themeContent
    },
    {
      value: "special",
      title: "Đặc biệt",
      content: specialContent
    },
  ]

  return isShowing && (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
      <div className="relative mx-auto w-max flex flex-col h-[50%] rounded-3xl bg-white overflow-y-auto p-6">
        <div className='text-HeadingSm'>Tuỳ chỉnh ảnh đại diện</div>
        <Tabs defaultValue="cloth" className="w-full h-full overflow-y-auto mt-2">
          <TabsList className="w-full border-b border-gray-200 !justify-start">
            {
              tabs.map((tab, index) => (

                <TabsTrigger key={tab.value + index} value={tab.value}>{tab.title}</TabsTrigger>
              ))
            }
          </TabsList>
          {
            tabs.map((tab, index) => (
              <TabsContent key={tab.value + index} value={tab.value} className='h-[calc(100%-40px)] overflow-y-auto'>{tab.content}</TabsContent>
            ))
          }
        </Tabs>
        <hr className="border-t border-gray-30" />
        <div className="flex justify-between w-ful p-4">
          <Button className=" !bg-gray-00 border border-gray-20 !text-primary-95 w-[100px]" onClick={hide}
            style={{
              boxShadow:
                "0px 4px 0px #ebe4ec"
            }}>
            <div className="!text-sm !font-normal">Thoát</div>
          </Button>
          <Button className="w-[150px] !font-medium border border-primary-70" style={{
            boxShadow:
              "0px 4px 0px #9a1595"
          }}>
            <div className="!text-sm !font-normal">Huỷ</div>
          </Button>
        </div>
      </div>
    </div>
  )
}
