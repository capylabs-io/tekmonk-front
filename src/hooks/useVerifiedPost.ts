import { getListPost, updatePost } from '@/requests/post'
import { useLoadingStore } from '@/store/LoadingStore'
import { useSnackbarStore } from '@/store/SnackbarStore'
import { useUserStore } from '@/store/UserStore'
import { PostType, PostVerificationType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { get } from 'lodash'
import qs from 'qs'
import React, { useEffect, useMemo, useState } from 'react'

export const useVerifiedPost = () => {
  // const [listPost, setListPost] = useState<PostType[]>()
  const [userInfo] = useUserStore((state) => [state.userInfo])
  const [showLoading, hideLoading] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSuccess, showError] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);
  const [activeTab, setActiveTab] = useState("");
  const [currentPost, setCurrentPost] = useState<PostType | null>(null);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [togglePostDialog, setTogglePostDialog] = useState(false);
  const [toggleConfirmDialog, setToggleConfirmDialog] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["posts", page, limit, activeTab],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          pagination: {
            page: page,
            pageSize: limit,
          },
          // filters: {
          //   isVerified: {
          //     $in: activeTab !== 'history' ? [PostVerificationType.PENDING] : [PostVerificationType.DENIED, PostVerificationType.ACCEPTED],
          //   },
          // },
          sort: ["id:asc"],
          populate: "*",
        },
          { encodeValuesOnly: true }
        );
        return await getListPost(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
  const listPost = useMemo(() => {
    return data ? data.data?.filter((item) => activeTab === 'history' ? item.isVerified !== PostVerificationType.PENDING : item.isVerified === PostVerificationType.PENDING) : []
  }, [data, activeTab])
  const handleVerified = async (data: PostType | null) => {
    try {
      showLoading()
      if (!data) return
      const { id, ...form } = data
      if (!id) return
      const res = await updatePost(id, form)
      if (res) {
        showSuccess('Thành công', 'Phê duyệt bài viết thành công!')
      }
    } catch (error) {
      console.log('error', error);
      showError('Thất bại', 'Phê duyệt bài viết thất bại!')
    } finally {
      hideLoading()
      refetch()
    }
  }
  const handleVerifiedPost = async (data: PostType) => {
    if (data.isVerified === PostVerificationType.DENIED) {
      setCurrentPost(data)
      setToggleConfirmDialog(true)
    } else {
      handleVerified(data)
    }

  }
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }
  return {
    togglePostDialog,
    toggleConfirmDialog,
    listPost,
    currentPost,
    setCurrentPost,
    setTogglePostDialog,
    handleTabChange,
    setToggleConfirmDialog,
    handleVerifiedPost,
    handleVerified
  }
}
