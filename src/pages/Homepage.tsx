// src/pages/Homepage.tsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@store/index'
import { fetchPosts } from '@store/postsSlice'
import PostCard from '@components/posts/PostCard'

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: posts, loading, error } = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <PostCard 
      posts={posts}
      loading={loading}
      error={error}
    />
  )
}

export default HomePage