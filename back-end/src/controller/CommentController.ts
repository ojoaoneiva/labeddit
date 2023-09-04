import { Request, Response } from 'express';
import { ZodError } from "zod";
import { BaseError } from "../erros/BaseError";
import { CommentBusiness } from '../business/CommentBusiness'
import { GetCommentSchema } from '../dtos/comment/getComment.dto';
import { CreateCommentSchema } from '../dtos/comment/createComment.dto';
import { LikeOrDislikeCommentSchema } from '../dtos/comment/likeOrDislikeComment.dto';

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness,
    ){}

    public createComment = async (req: Request, res: Response) => {
        try{
            const input = CreateCommentSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
                idToComment: req.params.id
            })

            const output = await this.commentBusiness.createComment(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if(error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getComment = async (req: Request, res: Response) => {
        try{
            const input = GetCommentSchema.parse({
                token: req.headers.authorization,
                idToComment: req.params.id
            })

            const output = await this.commentBusiness.getComment(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if(error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public likeOrDislikeComment = async (req: Request, res: Response) => {
        try{
            const input = LikeOrDislikeCommentSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
                like: req.body.like
            })

            const output = await this.commentBusiness.likeOrDislikeComment(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if(error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}
