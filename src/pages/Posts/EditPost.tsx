import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { postSchema } from '@utils/validationSchemas'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@store/index'
import { updatePost } from '@store/postsSlice'
import ButtonCard from '@components/ButtonCard'

type PostFormData = {
  title: string
  body: string
}

const EditPost = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { items: posts, loading } = useSelector((state: RootState) => state.posts)
  const existingPost = posts.find((p) => p.id === Number(id))
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
    defaultValues: existingPost || { title: '', body: '' },
  })

  useEffect(() => {
    if (!loading && !existingPost) {
      navigate('/dashboard')
    } else if (existingPost) {
      reset(existingPost)
    }
  }, [existingPost, loading, navigate, reset])

  const onSubmit = async (data: PostFormData) => {
    if (!id) return
    await dispatch(updatePost({ id: Number(id), title: data.title, body: data.body }))
    navigate('/dashboard')
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Post title"
            {...register('title')}
            className="w-full border p-2 rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="Post content"
            {...register('body')}
            className="w-full border p-2 rounded"
            rows={5}
          />
          {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        </div>
        <ButtonCard
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          color="primary"
          size="small"
        >
          {isSubmitting ? 'Updating...' : 'Update Post'}
        </ButtonCard>
      </form>
    </div>
  )
}

export default EditPost
