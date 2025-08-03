// src/pages/Posts/PostListPage.tsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, deletePost, type Post } from '@store/postsSlice'
import type { RootState, AppDispatch } from '@store/index'
import PostCard from '@components/posts/PostCard'
import { useNavigate } from 'react-router-dom'

const ListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { items: posts, loading } = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleEdit = (post: Post) => {
    navigate(`/dashboard/posts/edit/${post.id}`)
  }

  const handleDelete = (id: number) => {
    dispatch(deletePost(id))
  }

  return (
    <PostCard
      posts={posts}
      loading={loading}
      showCreateButton={true}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

export default ListPage