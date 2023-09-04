import z from 'zod'

export interface CreateCommentInput {
    content: string,
    token: string,
    idToComment: string
}

export type CreateCommentOutput = undefined 

export const CreateCommentSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1),
    idToComment: z.string().min(1)
}).transform(data => data as CreateCommentInput)