import z from 'zod'

export interface DeletePostInput {
    token: string,
    idToDelete: string
}

export type DeletePostOutput = undefined

export const DeletePostSchema = z.object({
    token: z.string().min(1),
    idToDelete: z.string().min(1)
}).transform(data => data as DeletePostInput)