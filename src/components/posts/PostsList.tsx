// // src/components/posts/PostsList.tsx
// import { type Post } from '@store/postsSlice'
// import PostCard from './PostCard'
// import Spinner from '@components/Spinner'
// import ButtonCard from '@components/ButtonCard'
// import { useNavigate } from 'react-router-dom'

// type PostsListProps = {
//   posts: Post[]
//   loading: boolean
//   error?: string | null
//   showActions?: boolean
//   onEdit?: (post: Post) => void
//   onDelete?: (id: number) => void
//   showCreateButton?: boolean
// }

// const PostsList = ({
//   posts,
//   loading,
//   error,
//   showActions = false,
//   onEdit,
//   onDelete,
//   showCreateButton = false
// }: PostsListProps) => {
//   const navigate = useNavigate()

//   if (loading) {
//     return (
//       <div className="mt-10">
//         <Spinner size="h-12 w-12" color="border-blue-600" />
//       </div>
//     )
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-500">{error}</p>
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold flex items-center gap-2">
//           Blog
//         </h1>
//         {showCreateButton && (
//           <ButtonCard
//             onClick={() => navigate('/dashboard/posts/create')}
//             size="small"
//           >
//             Create Post
//           </ButtonCard>
//         )}
//       </div>

//       {posts.length === 0 ? (
//         <p className="text-center text-gray-500">No posts available</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {posts.map((post) => (
//             <PostCard
//               key={post.id}
//               post={post}
//               showActions={showActions}
//               onEdit={onEdit}
//               onDelete={onDelete}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default PostsList