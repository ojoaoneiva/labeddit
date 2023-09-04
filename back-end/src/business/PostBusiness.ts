import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInput, CreatePostOutput } from "../dtos/post/createPost.dto";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Post";
import { GetPostInput, GetPostOutput } from "../dtos/post/getPost.dto";
import { EditPostInput, EditPostOutput } from "../dtos/post/editPost.dto";
import { NotFoundError } from "../erros/NotFoundError";
import { ForbiddenError } from "../erros/ForbiddenError";
import { DeletePostInput, DeletePostOutput } from "../dtos/post/deletePost.dto";
import { USER_ROLES } from "../models/User";
import { LikeOrDislikePostInput, LikeOrDislikePostOutput } from "../dtos/post/likeOrDislikePost.dto";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createPost = async (input: CreatePostInput): Promise<CreatePostOutput> => {
        const { content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }
        const id = this.idGenerator.generate()

        const post = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const postDB = post.toPostDB()
        await this.postDatabase.insertPost(postDB)

        const output: CreatePostOutput = undefined
        return output
    }

    public getPosts = async (input: GetPostInput): Promise<GetPostOutput> => {
        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const PostDBandCreators = await this.postDatabase.getPostsAndCreators()

        const posts = PostDBandCreators.map((PostDB) => {
            const post = new Post(
                PostDB.id,
                PostDB.content,
                PostDB.likes,
                PostDB.dislikes,
                PostDB.created_at,
                PostDB.updated_at,
                PostDB.creator_id,
                PostDB.creator_name,
            )
            return post.toBusinessModel()
        })

        const output: GetPostOutput = posts
        return output
    }

    // public editPost = async (input: EditPostInput): Promise<EditPostOutput> => {
    //     const { content, token, idToEdit } = input

    //     const payload = this.tokenManager.getPayload(token)

    //     if (!payload) {
    //         throw new UnauthorizedError()
    //     }

    //     const postDB = await this.postDatabase.findPostById(idToEdit)
    //     if (!postDB) {
    //         throw new NotFoundError("Post com essa id não existe")
    //     }

    //     if (payload.id !== postDB.creator_id) {
    //         throw new ForbiddenError("somente quem criou o post pode editá-lo")
    //     }

    //     const post = new Post(
    //         postDB.id,
    //         postDB.content,
    //         postDB.likes,
    //         postDB.dislikes,
    //         postDB.created_at,
    //         postDB.updated_at,
    //         postDB.creator_id,
    //         payload.name
    //     )

    //     post.setContent(content)

    //     const updatedPostDB = post.toPostDB()
    //     await this.postDatabase.updatePost(updatedPostDB)

    //     const output: EditPostOutput = undefined
    //     return output
    // }

    // public deletePost = async (input: DeletePostInput): Promise<DeletePostOutput> => {
    //     const { token, idToDelete } = input

    //     const payload = this.tokenManager.getPayload(token)

    //     if (!payload) {
    //         throw new UnauthorizedError()
    //     }

    //     const postDB = await this.postDatabase.findPostById(idToDelete)
    //     if (!postDB) {
    //         throw new NotFoundError("Post com essa id não existe")
    //     }

    //     if (payload.role !== USER_ROLES.ADMIN) {
    //         if (payload.id !== postDB.creator_id) {
    //             throw new ForbiddenError("somente quem criou o post pode deletá-lo")
    //         }
    //     }

    //     await this.postDatabase.deletePost(idToDelete)

    //     const output: DeletePostOutput = undefined
    //     return output
    // }

    public likeOrDislikePost = async (input: LikeOrDislikePostInput): Promise<LikeOrDislikePostOutput> => {
        const { token, postId, like } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDBandCreator = await this.postDatabase.findPostAndCreatorById(postId)

        if (!postDBandCreator) {
            throw new NotFoundError("Post com essa id não existe")
        }

        const post = new Post(
            postDBandCreator.id,
            postDBandCreator.content,
            postDBandCreator.likes,
            postDBandCreator.dislikes,
            postDBandCreator.created_at,
            postDBandCreator.updated_at,
            postDBandCreator.creator_id,
            postDBandCreator.creator_name
        )

        const likeSQL = like ? 1 : 0

        const likeDislikeDB: LikeDislikeDB = {
            user_id: payload.id,
            post_id: postId,
            like: likeSQL
        }

        const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB)

        if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
            }
        } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
            if (like === false) {
                await this.postDatabase.removeLikeDislike(likeDislikeDB)
                post.removeDislike()
            } else {
                await this.postDatabase.updateLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
            }
        } else {
            await this.postDatabase.insertLikeDislike(likeDislikeDB)
            if (like) {
                post.addLike()
            } else {
                post.addDislike()
            }
            
        }

        const updatedPostDB = post.toPostDB()
        await this.postDatabase.updatePost(updatedPostDB)

        const output: LikeOrDislikePostOutput = undefined
        return output
    }
}