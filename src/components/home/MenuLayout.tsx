'use client'
import React from 'react'
import { MenuCard } from './MenuCard'
import classNames from 'classnames'
import { Bell, Home, ShoppingCart, User, Zap } from 'lucide-react'

type Props = {
    customClassName?: string
}
const BASE_CLASS = 'grow'
export const MenuLayout = ({ customClassName }: Props) => {
    return (
        <div className={classNames(BASE_CLASS, customClassName)}>
            <MenuCard title='Trang chủ' active={true} iconElement={<Home size={20} />} />
            <MenuCard title='Thông báo' active={false} iconElement={<Bell size={20} />} />
            <MenuCard title='Cửa hàng' active={false} iconElement={<ShoppingCart size={20} />} />
            <MenuCard title='Bảng xếp hạng' active={false} iconElement={<Zap size={20} />} />
            <MenuCard title='Hồ sơ' active={false} iconElement={<User size={20} />} />
        </div>
    )
}
    