import { COMMENT_LIKE, CommentDB, CommentDBandCreators, LikeDislikeCommentDB } from "../models/Comment"
import { LikeDislikeDB, POST_LIKE, PostDB, PostDBandCreators } from "../models/Post"
import { BaseDatabase } from "./BaseDatabase"
import { PostDatabase } from "./PostDatabase"
import { UserDatabase } from "./UserDatabase"

export class CommentDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "post_comments"
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"

    public insertComment = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(commentDB)
    }

    public getCommentsAndCreators = async (id: string): Promise<CommentDBandCreators[]> => {
        const result = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                `${CommentDatabase.TABLE_COMMENTS}.id`,
                `${CommentDatabase.TABLE_COMMENTS}.post_id`,
                `${CommentDatabase.TABLE_COMMENTS}.content`,
                `${CommentDatabase.TABLE_COMMENTS}.likes`,
                `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
                `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.id as creator_id`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            ).where({ post_id: id })

        return result as CommentDBandCreators[]
    }

    public findPostById = async (id: string): Promise<PostDB | undefined> => {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).select().where({ id })

        return result as PostDB | undefined
    }

    public updateComment = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
            .update(commentDB)
            .where({ id: commentDB.id })
    }

    public findCommentAndCreatorById = async (id: string): Promise<CommentDBandCreators | undefined> => {
        const [result] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                `${CommentDatabase.TABLE_COMMENTS}.id`,
                `${CommentDatabase.TABLE_COMMENTS}.content`,
                `${CommentDatabase.TABLE_COMMENTS}.likes`,
                `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
                `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.id as creator_id`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `=`,
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ [`${CommentDatabase.TABLE_COMMENTS}.id`]: id })

        return result as CommentDBandCreators | undefined
    }

    public findCommentLikeDislike = async (likeDislikeCommentDB: LikeDislikeCommentDB): Promise<COMMENT_LIKE | undefined> => {
        const [result] = await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .select()
            .where({
                user_id: likeDislikeCommentDB.user_id,
                comment_id: likeDislikeCommentDB.comment_id
            })

        if (result === undefined) {
            return undefined

        } else if (result.like === 1) {
            return COMMENT_LIKE.ALREADY_LIKED

        } else {
            return COMMENT_LIKE.ALREADY_DISLIKED
        }

    }

    public removeCommentLikeDislike = async (likeDislikeCommentDB: LikeDislikeCommentDB): Promise<void> => {
        await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .delete()
            .where({
                user_id: likeDislikeCommentDB.user_id,
                comment_id: likeDislikeCommentDB.comment_id
            })
    }

    public updateCommentLikeDislike = async (likeDislikeCommentDB: LikeDislikeCommentDB): Promise<void> => {
        await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .update(likeDislikeCommentDB)
            .where({
                user_id: likeDislikeCommentDB.user_id,
                comment_id: likeDislikeCommentDB.comment_id
            })
    }

    public insertCommentLikeDislike = async (likeDislikeCommentDB: LikeDislikeCommentDB): Promise<void> => {
        await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .insert(likeDislikeCommentDB)
    }
}