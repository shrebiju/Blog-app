// src/components/posts/PostForm.tsx
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { postSchema } from '@utils/validationSchemas'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/index'
import { addPost, updatePost } from '@store/postsSlice'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import ButtonCard from '@components/ButtonCard'
import { InputField } from '@components/InputField'

type PostFormData = {
  title: string
  body: string
}

type PostFormProps = {
  mode?: 'create' | 'edit'
}

const PostForm = ({ mode = 'create' }: PostFormProps) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { items: posts, loading: postsLoading } = useSelector((state: RootState) => state.posts)

  const existingPost = mode === 'edit' ? posts.find((p) => p.id === Number(id)) : null

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: existingPost?.title || '',
      body: existingPost?.body || ''
    }
  })

  useEffect(() => {
    if (mode === 'edit' && !postsLoading && !existingPost) {
      navigate('/dashboard/posts/list')
    }
  }, [mode, existingPost, postsLoading, navigate])

  const onSubmit = async (data: PostFormData) => {
    if (mode === 'create') {
      await dispatch(addPost({ title: data.title, body: data.body }))
      reset()
      navigate('/dashboard/posts/list')
    } else if (mode === 'edit' && id) {
      await dispatch(updatePost({ id: Number(id), title: data.title, body: data.body }))
      navigate('/dashboard/posts/list')
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {mode === 'create' ? 'Create Post' : 'Edit Post'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          placeholder="Post title"
          {...register('title')}
          error={errors.title?.message}
        />

        <div>
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value || ''}
                onChange={field.onChange}
                placeholder="Write your Blog post here..."
                className="bg-white"
              />
            )}
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        <ButtonCard
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          size="medium"
          className="w-full"
        >
          {isSubmitting 
            ? mode === 'create' 
              ? 'Creating...' 
              : 'Updating...'
            : mode === 'create' 
              ? 'Create Post' 
              : 'Update Post'}
        </ButtonCard>
      </form>
    </div>
  )
}

export default PostForm