import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Button } from '../common/button/Button';
import Image from 'next/image';
import { useUserAvatarStore } from '@/store/UserAvatarStore';
import { cn } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import qs from 'qs';
import { useUserStore } from '@/store/UserStore';
import { ReqGetAvatarConfig, ReqUpdateAvatarConfig } from '@/requests/avatar-config';
import { ReqGetUserShopItems } from '@/requests/shop-item-user';
import { AvatarConfig } from '@/types/common-types';
import { ReqGetShopItems } from '@/requests/shopItem';
import classNames from 'classnames';
import { CheckCircle2 } from 'lucide-react';
import { useSnackbarStore } from '@/store/SnackbarStore';
import { AvatarLayer } from './AvatarLayer';

type Props = {
  onSubmit?: () => void,
  onClose?: () => void
}
export const AvatarConfigModal = ({ onSubmit }: Props) => {
  const [isShowing, hide] = useUserAvatarStore((state) => [state.isShowing, state.hide])
  const [userInfo, getMe] = useUserStore((state) => [
    state.userInfo, state.getMe
  ]);
  const [showSuccess, showError] = useSnackbarStore((state) => [state.success, state.error])
  const [currentAvatar, setCurrentAvatar] = useState<AvatarConfig | null>({
    frontHair: null,
    backHair: null,
    cloth: null,
    mouth: null,
    eye: null,
    theme: null,
    special: null,
  })
  const { data: dataAvatarConfig } = useQuery({
    queryKey: ["avatar-config", userInfo?.id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: ["frontHair", "backHair", "cloth", "mouth", "eye", "theme", "special"],
        filters: {
          user: {
            id: {
              $eq: Number(userInfo?.id),
            }
          },
        },

      });
      const res = await ReqGetAvatarConfig(queryString);
      return res.data;
    },
    enabled: !!userInfo?.id,
    refetchOnWindowFocus: false,
  });

  const { data: dataDefaultShopItem } = useQuery({
    queryKey: ["shop-item"],
    queryFn: async () => {
      const queryString = qs.stringify({
        filters: {
          type: {
            $eq: 'default',
          },
        },
        populate: "*",
      });
      const response = await ReqGetShopItems(queryString);
      return response.data;
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });
  const { data: dataUser } = useQuery({
    queryKey: ["my-items"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: ["shop_item", "shop_item.category", "user"],
          filters: {
            user: {
              id: userInfo?.id,
            },
          },
        });
        return await ReqGetUserShopItems(queryString);
      } catch (error) {
        console.log("Error: ", error);
        return { data: [] };
      }
    },
  });
  const { mutate: updateAvatarConfig } = useMutation({
    mutationKey: ["update-avatar-config", dataAvatarConfig?.[0]?.id],
    mutationFn: async () => {
      const data = {
        frontHair: currentAvatar?.frontHair,
        backHair: currentAvatar?.backHair,
        cloth: currentAvatar?.cloth,
        mouth: currentAvatar?.mouth,
        eye: currentAvatar?.eye,
        theme: currentAvatar?.theme,
        special: currentAvatar?.special,
      }
      if (dataAvatarConfig?.[0]?.id) {
        const res = await ReqUpdateAvatarConfig(Number(dataAvatarConfig?.[0]?.id), data);
        return res;
      }
    },
    onSuccess: () => {
      // Cập nhật state currentAvatar sau khi mutation thành công
      setCurrentAvatar(prev => ({
        ...prev,
        frontHair: currentAvatar?.frontHair,
        backHair: currentAvatar?.backHair,
        cloth: currentAvatar?.cloth,
        mouth: currentAvatar?.mouth,
        eye: currentAvatar?.eye,
        theme: currentAvatar?.theme,
        special: currentAvatar?.special,
      }));
      getMe();
      hide()
      onSubmit && onSubmit()
      showSuccess("Cập nhật ảnh đại diện thành công", "Vui lòng xem lại ảnh đại diện của bạn");
    },
    onError: (error) => {
      console.log("Error: ", error);
      showError("Cập nhật ảnh đại diện thất bại", "Vui lòng thử lại sau");
    }
  });
  const handleResetDefault = useCallback(() => {
    if (!dataDefaultShopItem) return;
    setCurrentAvatar({
      frontHair: dataDefaultShopItem?.find(item => item.category.code === 'FRONT_HAIR'),
      backHair: dataDefaultShopItem?.find(item => item.category.code === 'BACK_HAIR'),
      cloth: dataDefaultShopItem?.find(item => item.category.code === 'CLOTH'),
      mouth: dataDefaultShopItem?.find(item => item.category.code === 'MOUTH'),
      eye: dataDefaultShopItem?.find(item => item.category.code === 'EYE'),
      theme: null,
      special: null,
    })
  }, [dataDefaultShopItem])
  useEffect(() => {
    if (dataAvatarConfig && dataAvatarConfig.length > 0) {
      setCurrentAvatar(dataAvatarConfig[0])
    }
  }, [dataAvatarConfig])
  useEffect(() => {
    getMe();
  }, [])
  const userAvatarConfig = useMemo(() => {
    return (
      currentAvatar ? <AvatarLayer avatarConfig={currentAvatar} customClassName="w-[200px] h-[200px] rounded-xl" /> :
        <div className="border-2 flex justify-center items-end border-gray-30 rounded-xl relative overflow-hidden w-[200px] h-[200px] ">
          <Image src="/image/profile/avatar-x2.png" className='self-end z-[2] absolute' height={200} width={200} alt='pic'>
          </Image>
        </div>
    )
  }, [currentAvatar])
  const dateUserByCategory = (category: string) => {
    return dataUser && dataUser?.data.length > 0 ? dataUser?.data?.filter(item => item.shop_item.category?.code === category) : []
  }

  const clothContent = useMemo(() => (
    <div className='flex gap-6 h-full'>
      {userAvatarConfig}
      <div className='w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30 overflow-y-auto'>
        <div className='grid grid-cols-3 gap-4 h-max'>
          {
            dateUserByCategory('CLOTH').length > 0 && dateUserByCategory('CLOTH').map((item) => {
              return (
                <div key={item.id} className={classNames('border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end w-[130px] h-[130px] cursor-pointer relative')} onClick={() => {
                  setCurrentAvatar(prev => ({
                    ...prev,
                    cloth: item.shop_item,
                    special: null,
                  }))
                }} style={{
                  boxShadow: "0 2px 0 0 #DDD0DD"
                }}>
                  {currentAvatar?.cloth?.id === item.shop_item.id && <div className='absolute top-0 left-0 w-full h-full bg-primary-20/50 z-[2] flex justify-center items-center'>
                    <CheckCircle2 className='text-primary-50' size={30} />
                  </div>}
                  <Image src={item.shop_item.image || ''} height={120} width={120} alt='pic' className='z-[1]'>
                  </Image>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  ), [currentAvatar, dateUserByCategory])
  const frontHairContent = useMemo(() => (
    <div className='flex gap-6 h-full'>
      {userAvatarConfig}

      <div className='w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30 overflow-y-auto'>
        <div className='grid grid-cols-3 gap-4 h-max'>
          {
            dateUserByCategory('FRONT_HAIR').length > 0 && dateUserByCategory('FRONT_HAIR').map((item) => {
              return (
                <div key={item.id} className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end w-[130px] h-[130px] cursor-pointer relative' onClick={() => {
                  setCurrentAvatar(prev => ({
                    ...prev,
                    frontHair: item.shop_item,
                    special: null,
                  }))
                }} style={{
                  boxShadow: "0 2px 0 0 #DDD0DD"
                }}>
                  {currentAvatar?.frontHair?.id === item.shop_item.id && <div className='absolute top-0 left-0 w-full h-full bg-primary-20/50 z-[3] flex justify-center items-center'>
                    <CheckCircle2 className='text-primary-50' size={30} />
                  </div>}
                  <Image src={item.shop_item.image || ''} className='z-[2] absolute' height={120} width={120} alt='pic'>
                  </Image>
                  <Image src="/image/avatar/cloth/cloth1.svg" className='self-end z-[1] absolute' height={120} width={120} alt='pic'>
                  </Image>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  ), [currentAvatar, dateUserByCategory])
  const backHairContent = useMemo(() => (
    <div className='flex gap-6 h-full'>
      {userAvatarConfig}

      <div className='w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30 overflow-y-auto'>
        <div className='grid grid-cols-3 gap-4 h-max'>        {
          dateUserByCategory('BACK_HAIR').length > 0 && dateUserByCategory('BACK_HAIR').map((item) => {
            return (
              <div key={item.id} className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end w-[130px] h-[130px] cursor-pointer relative' onClick={() => {
                setCurrentAvatar(prev => ({
                  ...prev,
                  backHair: item.shop_item,
                  special: null,

                }))
              }} style={{
                boxShadow: "0 2px 0 0 #DDD0DD"
              }}>
                {currentAvatar?.backHair?.id === item.shop_item.id && <div className='absolute top-0 left-0 w-full h-full bg-primary-20/50 z-[3] flex justify-center items-center'>
                  <CheckCircle2 className='text-primary-50' size={30} />
                </div>}
                <Image src={item.shop_item.image || ''} className='z-[1] absolute' height={120} width={120} alt='pic'>
                </Image>
                <Image src="/image/avatar/cloth/cloth1.svg" className='self-end z-[2] absolute' height={120} width={120} alt='pic'>
                </Image>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  ), [currentAvatar, dateUserByCategory])
  const eyeContent = useMemo(() => (
    <div className='flex gap-6 h-full'>
      {userAvatarConfig}
      <div className='w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30 overflow-y-auto'>
        <div className='grid grid-cols-3 gap-4 h-max'>        {
          dateUserByCategory('EYE').length > 0 && dateUserByCategory('EYE').map((item) => {
            return (
              <div key={item.id} className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end w-[130px] h-[130px] cursor-pointer relative' onClick={() => {
                setCurrentAvatar(prev => ({
                  ...prev,
                  eye: item.shop_item,
                  special: null,
                }))
              }} style={{
                boxShadow: "0 2px 0 0 #DDD0DD"
              }}>
                {currentAvatar?.eye?.id === item.shop_item.id && <div className='absolute top-0 left-0 w-full h-full bg-primary-20/50 z-[3] flex justify-center items-center'>
                  <CheckCircle2 className='text-primary-50' size={30} />
                </div>}
                <Image src={item.shop_item.image || ''} className='z-[2] absolute' height={120} width={120} alt='pic'>
                </Image>
                <Image src="/image/avatar/cloth/cloth1.svg" className='self-end z-[1] absolute' height={120} width={120} alt='pic'>
                </Image>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  ), [currentAvatar, dateUserByCategory])
  const mouthContent = useMemo(() => (
    <div className='flex gap-6 h-full'>
      {userAvatarConfig}
      <div className='w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30 overflow-y-auto'>
        <div className='grid grid-cols-3 gap-4 h-max'>
          {
            dateUserByCategory('MOUTH').length > 0 && dateUserByCategory('MOUTH').map((item) => {
              return (
                <div key={item.id} className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end w-[130px] h-[130px] cursor-pointer relative' onClick={() => {
                  setCurrentAvatar(prev => ({
                    ...prev,
                    mouth: item.shop_item,
                    special: null,
                  }))
                }} style={{
                  boxShadow: "0 2px 0 0 #DDD0DD"
                }}>
                  {currentAvatar?.mouth?.id === item.shop_item.id && <div className='absolute top-0 left-0 w-full h-full bg-primary-20/50 z-[3] flex justify-center items-center'>
                    <CheckCircle2 className='text-primary-50' size={30} />
                  </div>}
                  <Image src={item.shop_item.image || ''} className='z-[2] absolute' height={120} width={120} alt='pic'>
                  </Image>
                  <Image src="/image/avatar/cloth/cloth1.svg" className='self-end z-[1] absolute' height={120} width={120} alt='pic'>
                  </Image>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  ), [currentAvatar, dateUserByCategory])
  const themeContent = useMemo(() => (
    <div className='flex gap-6 h-full'>
      {userAvatarConfig}
      <div className='w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30 overflow-y-auto'>
        <div className='grid grid-cols-3 gap-4 h-max'>        {
          dateUserByCategory('THEME').length > 0 && dateUserByCategory('THEME').map((item) => {
            return (
              <div
                key={item.id}
                className="border-2 border-gray-30 rounded-xl flex justify-center items-end w-[130px] h-[130px] relative cursor-pointer" onClick={() => {
                  setCurrentAvatar(prev => ({
                    ...prev,
                    theme: item.shop_item,
                    special: null,
                  }))
                }}
                style={{
                  boxShadow: "0 2px 0 0 #DDD0DD",
                }}
              >
                {
                  currentAvatar?.theme?.id === item.shop_item.id && <div className='absolute top-0 left-0 w-full h-full bg-primary-20/50 z-[3] flex justify-center items-center'>
                    <CheckCircle2 className='text-primary-50' size={30} />
                  </div>
                }
                <Image src={item.shop_item.image || ''} className='z-[2] absolute object-cover' height={120} width={120} alt='pic'>
                </Image>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  ), [currentAvatar, dateUserByCategory])
  const specialContent = useMemo(() => (
    <div className='flex gap-6 h-full'>
      {userAvatarConfig}
      <div className='w-[calc(100%-200px)] h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30 overflow-y-auto'>
        <div className='grid grid-cols-3 gap-4 h-max'>        {
          dateUserByCategory('SPECIAL').length > 0 && dateUserByCategory('SPECIAL').map((item) => {
            return (
              <div
                key={item.id}
                className="border-2 border-gray-30  rounded-xl flex justify-center items-end w-[130px] h-[130px] relative cursor-pointer"
                onClick={() => {
                  setCurrentAvatar(prev => ({
                    ...prev,
                    special: item.shop_item
                  }))
                }}
                style={{
                  boxShadow: "0 2px 0 0 #DDD0DD",
                }}
              >
                {
                  currentAvatar?.special?.id === item.shop_item.id && <div className='absolute top-0 left-0 w-full h-full bg-primary-20/50 z-[3] flex justify-center items-center'>
                    <CheckCircle2 className='text-primary-50' size={30} />
                  </div>
                }
                <Image src={item.shop_item.image || ''} className='z-[2] absolute object-cover' height={120} width={120} alt='pic'>
                </Image>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  ), [currentAvatar, dateUserByCategory])
  const tabs = [
    {
      value: "cloth",
      title: "Trang phục",
      content: clothContent
    },
    {
      value: "frontHair",
      title: "Tóc trước",
      content: frontHairContent
    },
    {
      value: "backHair",
      title: "Tóc sau",
      content: backHairContent
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
      <div className="relative mx-auto w-max flex flex-col h-[80%] rounded-3xl bg-white overflow-y-auto p-6">
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
          <div className="flex gap-2 items-center">
            <Button className="w-[150px] !font-medium border border-primary-70"
              onClick={handleResetDefault}
              style={{
                boxShadow:
                  "0px 4px 0px #9a1595"
              }}>
              <div className="!text-sm !font-normal">Đặt lại</div>
            </Button>
            <Button className="w-[150px] !font-medium border border-primary-70" onClick={updateAvatarConfig} style={{
              boxShadow:
                "0px 4px 0px #9a1595"
            }}>
              <div className="!text-sm !font-normal">Xác nhận</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
