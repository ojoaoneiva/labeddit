import z from 'zod'
import { CommentModel } from '../../models/Comment'

export interface GetCommentInput {
    token: string,
    idToComment: string
}

export type GetCommentOutput = CommentModel[]

export const GetCommentSchema = z.object({
    token: z.string().min(1),
    idToComment: z.string().min(1)
}).transform(data => data as GetCommentInput)