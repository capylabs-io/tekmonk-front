import { useProfileStore } from '@/store/ProfileStore'
import { X } from 'lucide-react'
import React from 'react'
import { Input } from '../common/Input'
import { TextArea } from '../common/TextArea'
import { Button } from '../common/Button'
import { InputFileUpdload } from '../common/InputFileUpload'

export const CreateProfileModal = () => {
    const [isShowing, hide] = useProfileStore((state) => [state.isShowing, state.hide])
    return (
        isShowing && (
            <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
                <div className="relative mx-auto flex w-[688px] flex-col justify-center gap-y-5 rounded-3xl bg-white py-6">
                    <button
                        type="button"
                        onClick={hide}
                        className="absolute right-4 top-4 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                        <X size={16} className="" />
                    </button>

                    <div className='w-full text-center px-6'>
                        <div className='text-2xl font-bold text-primary-900'>Đăng mới</div>
                        <div className='text-sm text-gray-600'>Khoe ngay dự án mới của mình cho các đồng môn nhé! </div>
                    </div>
                    <hr className='border-t border-gray-200' />
                    <div className='px-6'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-primary-900'>
                                Tên dự án
                            </span>
                            <Input type='text' placeholder='VD: Chatbot Miracle' customClassNames='max-w-[424px]' customInputClassNames='text-sm' />
                        </div>
                        <div className='flex justify-between text-sm mt-5'>
                            <span className='text-primary-900'>
                                Website URL
                            </span>
                            <Input type='text' placeholder='www.MiracleChat.com' customClassNames='max-w-[424px]' customInputClassNames='text-sm' />
                        </div>
                    </div>
                    <hr className='border-t border-gray-200' />
                    <div className='px-6'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-primary-900'>
                                Thumbnail dự án
                            </span>
                            <InputFileUpdload customClassNames='max-w-[424px]' customInputClassNames='text-sm'/>
                        </div>
                    </div>
                    <hr className='border-t border-gray-200' />
                    <div className='px-6'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-primary-900'>
                                Tags
                            </span>
                            <Input type='text' placeholder='VD: B2C, AI, design,....' customClassNames='max-w-[424px]' customInputClassNames='text-sm' />
                        </div>
                        <div className='flex justify-between text-sm mt-5'>
                            <span className='text-primary-900'>
                                Mô tả
                            </span>
                            <TextArea placeholder='Viết vài dòng giới thiệu tổng quan dự án' customClassName='max-w-[424px]' customInputClassName='w-full !text-sm' />
                        </div>
                    </div>

                    <hr className='border-t border-gray-200' />
                    <div className='flex gap-x-3 w-ful px-6'>
                        <Button outlined className='w-full !rounded-3xl' onClick={hide}>Huỷ</Button>
                        <Button className='w-full !rounded-3xl'>Đăng tải</Button>
                    </div>
                </div>
            </div>
        )
    )
}
