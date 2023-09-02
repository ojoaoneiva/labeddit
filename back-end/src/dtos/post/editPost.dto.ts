import z from 'zod'

export interface EditPostInput {
    content: string,
    token: string,
    idToEdit: string
}

export type EditPostOutput = undefined

export const EditPostSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1),
    idToEdit: z.string().min(1)
}).transform(data => data as EditPostInput)