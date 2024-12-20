'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
import { Info, X } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

type Props = {
  customClassNames?: string
  error?: string // Added error prop
  placeholder?: string
  name?: string
  isRequired?: boolean
  isTooltip?: boolean
  tooltipContent?: string
  value?: string
  onValueChange?: (value: string) => void
}
export const InputTags = ({
  error, // Added error handling
  placeholder,
  isRequired,
  name = '',
  customClassNames,
  isTooltip = false,
  tooltipContent,
  value,
  onValueChange
}: Props) => {
  const [tags, setTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault()
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()])

        setInputValue('')
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  useEffect(() => {
    handleOnChange()
  }, [tags])

  const handleOnChange = () => {
    // tách bởi dấu phấy và dấu cách
    const tagsString = tags.join(', ')
    onValueChange && onValueChange(tagsString)
  }
  return (
    <TooltipProvider>
      <div className="space-y-1.5 w-full">
        <div className="relative block sm:flex w-full items-start">
          <div className="w-full sm:w-1/4 flex text-primary-950 text-SubheadSm items-center">
            <div>Tags</div>
            {isTooltip ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info
                      size={16}
                      className={`ml-1`}
                      color={`${isRequired ? '#DC58C8' : '#0000f7'}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="start"
                    className="max-w-[200px]"
                  >
                    <p>{tooltipContent}</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <>
                <span className="text-red-500">{isRequired ? ' *' : ''}</span>{' '}
              </>
            )}
          </div>

          <div className="w-full flex-wrap">
            <div className="min-h-[3rem] w-full rounded-xl border border-input bg-gray-50 px-3 py-2 text-sm">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-gray-100 text-gray-800 rounded-md text-sm"
                  >
                    <span className="px-2 py-1">{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="px-2 py-1 hover:bg-gray-200 rounded-r-md border-l border-gray-200 transition-colors"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {tag}</span>
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent min-w-[120px] w-full text-base font-normal outline-none bg-grey-50 border-grey-300 mt-1 placeholder:text-base"
                  placeholder={tags.length === 0 ? 'Nhập tags ...' : ''}
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-xs min-h-[48px]">{error}</div>
            )}
            <div className={`text-[14px] mt-1`}>
              Tags được phân cách bằng nút Enter
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
