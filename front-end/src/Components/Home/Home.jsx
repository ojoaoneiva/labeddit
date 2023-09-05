import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { goToLoginPage } from "../../router/Coordinator";
import { Header } from "../Header/Header";
import { HeaderButton, LikeDislike } from "./HomeStyled";
import { useEffect, useState } from "react";
import {
  Container,
  CommentList,
  CommentItem,
  CommentContent,
  CommentButtons,
  CommentButton,
  SolidButton,
  NewCommentContainer,
  NewCommentInput,
  Line,
  CommentUser
} from "./HomeStyled";
import FaThumbsUp from "../../assets/like.svg";
import FaThumbsDown from "../../assets/dislike.svg";
import FaComment from "../../assets/comment.svg";
import useProtectedPage from "../../hooks/useProtectedPage";

export const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token
    }
  };

  useProtectedPage();

  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [posts, setPosts] = useState([]);

  const logout = () => {
    localStorage.removeItem("token")
    goToLoginPage(navigate)
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/`, config);
      const postsData = response.data;

      const postsWithCommentCount = await Promise.all(
        postsData.map(async (post) => {
          const commentsResponse = await getComments(post.id);
          console.log(commentsResponse)
          return {
            ...post,
            commentCount: commentsResponse.length,
          };
        })
      );

      setPosts(postsWithCommentCount);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createPost = async () => {
    try {
      const body = {
        content: newPost
      }
      const response = await axios.post(`${BASE_URL}/posts/`, body, config);
      getPosts()
      setNewPost("")
    } catch (error) {
      console.log(error.response);
    }
  };

  const likePost = async (id) => {
    try {
      const body = {
        like: true
      }
      const response = await axios.put(`${BASE_URL}/posts/${id}/like`, body, config);
      getPosts()
    } catch (error) {
      console.log(error.response);
    }
  };

  const dislikePost = async (id) => {
    try {
      const body = {
        like: false
      }
      const response = await axios.put(`${BASE_URL}/posts/${id}/like`, body, config);
      getPosts()
    } catch (error) {
      console.log(error.response);
    }
  };

  const getComments = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${id}`, config);
      setComments(response.data)
      return response.data
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const createComment = async (id) => {
    try {
      const body = {
        content: newComment
      }
      const response = await axios.post(`${BASE_URL}/comments/${id}`, body, config);
      getComments(id);
      setNewComment("")
    } catch (error) {
      console.log(error.response);
    }
  };

  const likeComment = async (id, postId) => {
    try {
      const body = {
        like: true
      }
      const response = await axios.put(`${BASE_URL}/comments/${id}/like`, body, config);
      getComments(postId)
    } catch (error) {
      console.log(error.response);
    }
  };

  const dislikeComment = async (id, postId) => {
    try {
      const body = {
        like: false
      }
      const response = await axios.put(`${BASE_URL}/comments/${id}/like`, body, config);
      getComments(postId)
    } catch (error) {
      console.log(error.response);
    }
  };



  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  };

  const toggleComments = async (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
      setComments([]);
    } else {
      setExpandedPostId(postId);
      getComments(postId);
    }
  };

  return (
    <>
      <Header />
      <HeaderButton onClick={logout}>Logout</HeaderButton>
      <Container>
        <NewCommentContainer>
          <NewCommentInput
            placeholder="Escreva seu post..."
            value={newPost}
            onChange={handleNewPostChange}
          />
          <SolidButton onClick={createPost}>Postar</SolidButton>
          <Line></Line>
        </NewCommentContainer>
        <CommentList>
          {posts.map((post) => (
            <CommentItem key={post.id}>
              <CommentUser>Enviado por: {post.creator.name}</CommentUser>
              <CommentContent>{post.content}</CommentContent>

              <CommentButtons>
                <LikeDislike>
                  <button onClick={() => likePost(post.id)}>
                    <img src={FaThumbsUp} /> {post.likes - post.dislikes}
                  </button>
                  <button onClick={() => dislikePost(post.id)}>
                    <img src={FaThumbsDown} />
                  </button>
                </LikeDislike>
                <CommentButton onClick={() => toggleComments(post.id)}>
                  <img src={FaComment} /> {post.commentCount}
                </CommentButton>
              </CommentButtons>

              {expandedPostId === post.id && (
                <div>
                  {comments.map((comment) => (
                    <CommentItem key={comment.id}>
                      <CommentUser>{comment.creator.name}</CommentUser>
                      <CommentContent>{comment.content}</CommentContent>
                      <CommentButtons>
                        <LikeDislike>
                          <button onClick={() => likeComment(comment.id, post.id)}>
                            <img src={FaThumbsUp} /> {comment.likes - comment.dislikes}
                          </button>
                          <button onClick={() => dislikeComment(comment.id, post.id)}>
                            <img src={FaThumbsDown} />
                          </button>
                        </LikeDislike>
                      </CommentButtons>
                    </CommentItem>
                  ))}
                  <NewCommentContainer>
                    <NewCommentInput
                      placeholder="Adicionar um comentário..."
                      value={newComment}
                      onChange={handleNewCommentChange}
                    />
                    <SolidButton onClick={() => createComment(post.id)}>Responder</SolidButton>
                    <Line></Line>
                  </NewCommentContainer>
                </div>
              )}
            </CommentItem>
          ))}
        </CommentList>
      </Container>
    </>
  );
};