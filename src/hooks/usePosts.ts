// import { useState, useEffect } from 'react'
// import axiosInstance from '@api/axiosInstance'

// export type Post = {
//   id: number
//   title: string
//   body: string
// }

// const usePosts = () => {
//   const [posts, setPosts] = useState<Post[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch all posts
//   const fetchPosts = async () => {
//     try {
//       setLoading(true)
//       const res = await axiosInstance.get('/posts')
//       setPosts(res.data.posts || res.data)
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch posts')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Create a post
//   const addPost = async (title: string, body: string) => {
//     try {
//       const res = await axiosInstance.post('/posts/add', {
//         title,
//         body,
//         userId: 1, 
//       })
//       setPosts(prev => [res.data, ...prev])
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   // Update a post
//   const updatePost = async (id: number, title: string, body: string) => {
//     try {
//       const res = await axiosInstance.put(`/posts/${id}`, {
//         title,
//         body,
//       })
//       setPosts(prev => prev.map(p => (p.id === id ? res.data : p)))
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   // Delete a post
//   const deletePost = async (id: number) => {
//     try {
//       await axiosInstance.delete(`/posts/${id}`)
//       setPosts(prev => prev.filter(p => p.id !== id))
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     fetchPosts()
//   }, [])

//   return { posts, loading, error, addPost, updatePost, deletePost }
// }

// export default usePosts
