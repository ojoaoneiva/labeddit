import z from 'zod'

export interface CreatePostInput {
    content: string,
    token: string
}

export type CreatePostOutput = undefined 

export const CreatePostSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreatePostInput)