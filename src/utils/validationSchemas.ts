import * as yup from 'yup'

export const postSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  body: yup
    .string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters'),
})
