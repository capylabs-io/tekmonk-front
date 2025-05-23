"use client";
import React from 'react'
import { Input } from "@/components/common/Input";
import { ArrowLeft } from 'lucide-react'
import moment from 'moment'
import Image from "next/image";
import { CommonTag } from '../common/CommonTag';
import { get } from 'lodash';
import { TNews } from '@/types/common-types';
import { useCustomRouter } from '../common/router/CustomRouter';
import { ROUTE } from '@/contants/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { CommonEmptyState } from '../common/CommonEmptyState';
type Props = {
  data: TNews[]
  value: string
  onSearch: (value: string) => void
  onBack: () => void
}
export const SearchNewContent = ({ data, value, onSearch, onBack }: Props) => {
  const router = useCustomRouter();
  const [searchValue, setSearchValue] = useState(value);
  const [textSearch, setTextSearch] = useState(value);

  const handleRedirect = (id: number) => {
    router.push(`${ROUTE.NEWS}/${id}`);
  };
  useEffect(() => {
    setSearchValue(value);
  }, [value]);
  return (
    <div className='container mx-auto col-span-3'>
      <div className='flex items-center gap-4'>
        <button className='flex items-center justify-center gap-2 border border-gray-20 rounded-xl w-12 h-12' onClick={() => {
          onBack()
        }}>
          <ArrowLeft size={16} />
        </button>
        <Input
          type="text"
          placeholder="Tìm kiếm article theo từ khoá"
          isSearch={true}
          value={searchValue}
          onChange={setSearchValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setTextSearch(searchValue);
              onSearch(searchValue);
            }
          }}
        />

      </div>
      {textSearch !== '' && <div className='mt-4 text-gray-50 text-SubheadMd'>
        Tìm thấy <span className='text-primary-95'>{data?.length}</span> kết quả phù hợp với từ khoá: <span className='text-primary-95'>&quot;{textSearch}&quot;</span>
      </div>
      }
      <div className="flex flex-col gap-4 mt-4">
        {data &&
          data.map((newsItem) => (
            <>
              <div
                key={newsItem.id}
                className="h-[220px] w-full flex items-center gap-2 justify-center"
              >
                <div className="flex-1 flex flex-col gap-2 overflow-hidden h-full">
                  <div className="flex gap-2">
                    {newsItem.tags?.split(",").map((tag, index) => (
                      <CommonTag onClick={() => {
                        onSearch(tag.trim())
                      }} key={index}>{tag.trim()}</CommonTag>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 flex-grow">
                    <div
                      className="text-HeadingSm text-gray-95 max-h-16 w-full overflow-hidden hover:cursor-pointer hover:underline hover:text-primary-95"
                      onClick={() => handleRedirect(newsItem.id)}
                      dangerouslySetInnerHTML={{
                        __html: (get(newsItem, "title", "") || "")
                          .replace(/<[^>]+>/g, "")
                          .trim()
                          .slice(0, 80)
                          .concat(
                            get(newsItem, "title", "").length > 100 ? "..." : ""
                          ),
                      }}
                    ></div>

                    <div
                      className="text-BodyMd text-gray-95 max-h-12 overflow-hidden hover:cursor-pointer"
                      onClick={() => handleRedirect(newsItem.id)}
                      dangerouslySetInnerHTML={{
                        __html:
                          get(newsItem, "content", "")
                            .replace(/<[^>]+>/g, "")
                            .substring(0, 200) + "...",
                      }}
                    ></div>
                  </div>

                  <time className="text-BodySm text-gray-70">
                    {moment(newsItem.startTime).format("DD/MM/YYYY HH:mm")}
                  </time>
                </div>

                <Image
                  src={newsItem.thumbnail ? newsItem.thumbnail : ""}
                  alt=""
                  width={200}
                  height={200}
                  className="h-[200px] object-cover rounded-2xl hover:cursor-pointer"
                />
              </div>
              <div className="w-full h-[1px] bg-gray-20 my-4"></div>
            </>
          ))}
        {data && data.length === 0 && (
          <CommonEmptyState />
        )}
      </div>
    </div>
  )
}
