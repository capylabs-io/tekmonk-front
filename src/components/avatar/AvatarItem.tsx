import { CheckCircle2 } from 'lucide-react'
import React from 'react'
import Image from 'next/image';
import classNames from 'classnames';

type Props = {
  onItemClick?: () => void
  isActive?: boolean
  imageUrl?: string
  isBackHair?: boolean
  isAllowClothBackground?: boolean
  isDefault?: boolean
}
export const AvatarItem = ({ onItemClick, isActive, imageUrl, isBackHair, isAllowClothBackground, isDefault }: Props) => {
  return (
    <div className='border-2 border-gray-30 !bg-white rounded-xl flex justify-center items-end w-[130px] h-[130px] cursor-pointer relative' onClick={() => {
      onItemClick && onItemClick()
    }} style={{
      boxShadow: "0 2px 0 0 #DDD0DD"
    }}>
      {isDefault
        &&
        <div className='absolute top-1 right-1 w-max py-1 px-2 bg-gray-30 z-[5] flex justify-center items-center rounded-lg'>
          <div className='text-xs text-primary-900'>Mặc định</div>
        </div>
      }
      {
        isActive &&
        <div className='absolute top-0 left-0 w-full h-full bg-primary-20/50 z-[3] flex justify-center items-center'>
          <CheckCircle2 className='text-primary-50' size={30} />
        </div>
      }
      <Image src={imageUrl || ''} className={classNames('absolute', isBackHair ? 'z-[1]' : 'z-[2]')} height={120} width={120} alt='pic'>
      </Image>
      {
        isAllowClothBackground &&
        <Image src="/image/avatar/cloth/cloth1.svg" className={classNames('self-end absolute', isBackHair ? 'z-[2]' : 'z-[1]')} height={120} width={120} alt='pic'>
        </Image>
      }
    </div>
  )
}
