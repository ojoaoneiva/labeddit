import z from 'zod'
import { PostModel } from '../../models/Post'

export interface GetPostInput {
    token: string
}

export type GetPostOutput = PostModel[]

export const GetPostSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as GetPostInput)