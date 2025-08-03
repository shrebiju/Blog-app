import { type Post } from '@store/postsSlice'
import ButtonCard from '@components/ButtonCard'
import Spinner from '@components/Spinner'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '@components/ConfirmModal'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'

type PostsGridProps = {
  posts: Post[]
  loading: boolean
  error?: string | null
  showCreateButton?: boolean
  onEdit?: (post: Post) => void
  onDelete?: (id: number) => void
}

const PostCard = ({
  posts,
  loading,
  error,
  showCreateButton = false,
  onEdit,
  onDelete,
}: PostsGridProps) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId !== null && onDelete) {
      onDelete(deleteId)
    }
    setIsModalOpen(false)
    setDeleteId(null)
  }

  if (loading) {
    return (
      <div className="mt-10">
        <Spinner size="h-12 w-12" color="border-blue-600" />
      </div>
    )
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Blog Posts
        </h1>
        {showCreateButton && isAuthenticated && (
          <ButtonCard
            onClick={() => navigate('/dashboard/posts/create')}
            size="small"
          >
            Create Post
          </ButtonCard>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.body}
                </p>

                {isAuthenticated && onEdit && (
                  <div className="flex gap-2 mt-4">
                    <ButtonCard
                      onClick={() => onEdit(post)}
                      size="small"
                      color="primary"
                    >
                      Edit
                    </ButtonCard>
                    <ButtonCard
                      onClick={() => handleDeleteClick(post.id)}
                      size="small"
                      color="danger"
                    >
                      Delete
                    </ButtonCard>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAuthenticated && (
        <ConfirmModal
          isOpen={isModalOpen}
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default PostCard