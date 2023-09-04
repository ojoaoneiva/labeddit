import { CreatePostInput, CreatePostOutput } from "../dtos/post/createPost.dto";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Post";
import { GetPostInput, GetPostOutput } from "../dtos/post/getPost.dto";
import { NotFoundError } from "../erros/NotFoundError";
import { ForbiddenError } from "../erros/ForbiddenError";
import { USER_ROLES } from "../models/User";
import { LikeOrDislikePostInput, LikeOrDislikePostOutput } from "../dtos/post/likeOrDislikePost.dto";
import { CommentDatabase } from "../database/CommentDatabase";
import { CreateCommentInput, CreateCommentOutput } from "../dtos/comment/createComment.dto";
import { GetCommentInput, GetCommentOutput } from "../dtos/comment/getComment.dto";
import { COMMENT_LIKE, Comment, LikeDislikeCommentDB } from "../models/Comment";
import { PostDatabase } from "../database/PostDatabase";
import { LikeOrDislikeCommentInput, LikeOrDislikeCommentOutput } from "../dtos/comment/likeOrDislikeComment.dto";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createComment = async (input: CreateCommentInput): Promise<CreateCommentOutput> => {
        const { content, token, idToComment } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }
        const id = this.idGenerator.generate()

        const comment = new Comment(
            id,
            idToComment,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const commentDB = comment.toCommentDB()
        await this.commentDatabase.insertComment(commentDB)

        const output: CreateCommentOutput = undefined
        return output
    }

    public getComment = async (input: GetCommentInput): Promise<GetCommentOutput> => {
        const { token, idToComment } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

         const postDB = await this.postDatabase.findPostById(idToComment)
         if (!postDB) {
             throw new NotFoundError("Post com essa id não existe")
         }

        const CommentDBandCreators = await this.commentDatabase.getCommentsAndCreators(idToComment)

        const comments = CommentDBandCreators.map((CommentDB) => {
            const comment = new Comment(
                CommentDB.id,
                CommentDB.post_id,
                CommentDB.content,
                CommentDB.likes,
                CommentDB.dislikes,
                CommentDB.created_at,
                CommentDB.updated_at,
                CommentDB.creator_id,
                CommentDB.creator_name,
            )
            return comment.toBusinessModel()
        })

        const output: GetCommentOutput = comments
        return output
    }

    public likeOrDislikeComment = async (input: LikeOrDislikeCommentInput): Promise<LikeOrDislikeCommentOutput> => {
        const { token, postId, like } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDBandCreator = await this.commentDatabase.findCommentAndCreatorById(postId)

        if (!commentDBandCreator) {
            throw new NotFoundError("Post com essa id não existe")
        }

        const comment = new Comment(
            commentDBandCreator.id,
            commentDBandCreator.post_id,
            commentDBandCreator.content,
            commentDBandCreator.likes,
            commentDBandCreator.dislikes,
            commentDBandCreator.created_at,
            commentDBandCreator.updated_at,
            commentDBandCreator.creator_id,
            commentDBandCreator.creator_name
        )

        const likeSQL = like ? 1 : 0

        const likeDislikeCommentDB: LikeDislikeCommentDB = {
            user_id: payload.id,
            comment_id: postId,
            like: likeSQL
        }

        const likeDislikeExists = await this.commentDatabase.findCommentLikeDislike(likeDislikeCommentDB)

        if (likeDislikeExists === COMMENT_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.commentDatabase.removeCommentLikeDislike(likeDislikeCommentDB)
                comment.removeLike()
            } else {
                await this.commentDatabase.updateCommentLikeDislike(likeDislikeCommentDB)
                comment.removeLike()
                comment.addDislike()
            }
        } else if (likeDislikeExists === COMMENT_LIKE.ALREADY_DISLIKED) {
            if (like === false) {
                await this.commentDatabase.removeCommentLikeDislike(likeDislikeCommentDB)
                comment.removeDislike()
            } else {
                await this.commentDatabase.updateCommentLikeDislike(likeDislikeCommentDB)
                comment.removeDislike()
                comment.addLike()
            }
        } else {
            await this.commentDatabase.insertCommentLikeDislike(likeDislikeCommentDB)
            if (like) {
                comment.addLike()
            } else {
                comment.addDislike()
            }
            
        }

        const updatedCommentDB = comment.toCommentDB()
        await this.commentDatabase.updateComment(updatedCommentDB)

        const output: LikeOrDislikeCommentOutput = undefined
        return output
    }
}