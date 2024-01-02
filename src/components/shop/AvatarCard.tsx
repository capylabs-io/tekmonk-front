"use client"
import React from 'react'
import Image from 'next/image'

type Props = {
    imageUrl: string;
    title: string;
    price: string;
    onClick?: () => void;
}
export const AvatarCard = ({ imageUrl, title, price, onClick }: Props) => {
    const handleOnClick = () => {
        onClick && onClick?.()
    }
    return (
                    <div className="w-[170px] cursor-pointer" onClick={handleOnClick}>
                        <Image
                            src={imageUrl}
                            alt="avatar pic"
                            width={170}
                            height={100}
                            className="rounded-xl"
                        />
                        <div className="w-full mt-2 text-sm text-black truncate">{title}</div>
                        <div className="w-full mt-2 text-sm text-primary-900 flex gap-x-2">
                            <Image
                                src="/image/home/coin.png"
                                alt="coin pic"
                                width={24}
                                height={24}
                            />
                            {price}
                        </div>
                    </div>       
    )
}
