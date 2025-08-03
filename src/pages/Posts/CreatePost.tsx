import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { postSchema } from '@utils/validationSchemas'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@store/index'
import { addPost } from '@store/postsSlice'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import ButtonCard from '@components/ButtonCard'
import { InputField } from '@components/InputField'

type PostFormData = {
  title: string
  body: string
}

const CreatePost = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
  })

  const onSubmit = async (data: PostFormData) => {
    await dispatch(addPost({ title: data.title, body: data.body }))
    reset()
    navigate('/dashboard/posts/list')
  }

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <InputField
          placeholder="Post title"
          {...register('title')}
          error={errors.title?.message}
        />

        {/* Rich Text Body */}
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

        {/* Submit */}
        <ButtonCard
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          size="medium"
          className="w-full"
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </ButtonCard>
      </form>
    </div>
  )
}

export default CreatePost