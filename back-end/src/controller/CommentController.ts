import { Request, Response } from 'express';
import { ZodError } from "zod";
import { CreatePostOutput, CreatePostSchema } from "../dtos/post/createPost.dto";
import { BaseError } from "../erros/BaseError";
import { CommentBusiness } from '../business/CommentBusiness'
import { PostBusiness } from '../business/PostBusiness';
import { GetPostSchema } from '../dtos/post/getPost.dto';
import { EditPostSchema } from '../dtos/post/editPost.dto';
import { DeletePostSchema } from '../dtos/post/deletePost.dto';
import { LikeOrDislikePostSchema } from '../dtos/post/likeOrDislikePost.dto';
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
