import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '@api/axiosInstance'
import { toast } from 'react-toastify'

export type Post = {
  id: number
  title: string
  body: string
}

type PostsState = {
  items: Post[]
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
}

// Async actions
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/posts')
    return res.data.posts || res.data
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch posts')
  }
})

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ title, body }: { title: string; body: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/posts/add', { title, body, userId: 1 })
      toast.success('Post created successfully!')
      return res.data
    } catch (err: any) {
      toast.error('Failed to create post')
      return rejectWithValue(err.message || 'Failed to create post')
    }
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, title, body }: { id: number; title: string; body: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/posts/${id}`, { title, body })
      toast.success('Post updated successfully!')
      return res.data
    } catch (err: any) {
      toast.error('Failed to update post')
      return rejectWithValue(err.message || 'Failed to update post')
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/posts/${id}`)
      toast.success('Post deleted successfully!')
      return id
    } catch (err: any) {
      toast.error('Failed to delete post')
      return rejectWithValue(err.message || 'Failed to delete post')
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        toast.error(action.payload as string)
      })

      // Add
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.unshift(action.payload)
      })

      // Update
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id)
        if (index >= 0) {
          state.items[index] = action.payload
        }
      })

      // Delete
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
  },
})

export default postsSlice.reducer
