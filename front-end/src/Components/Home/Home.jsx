import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { goToLoginPage } from "../../router/Coordinator";
import { Header } from "../Header/Header";
import { HeaderButton } from "./HomeStyled";
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

  const [posts, setPosts] = useState([]);

  const logout =() => {
    localStorage.removeItem("token")
    goToLoginPage(navigate)
  };

  useEffect(() => {
    getPosts();
  }, []);
  
  const getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/`, config);
      setPosts(response.data);
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
  
  // const getComments = async (id) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/comments/${id}`, config);
  //     setPosts(response.data);
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  const getComments = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${id}`, config);
      setComments(response.data)
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

  const [newPost, setNewPost] = useState("");
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(null);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  };

  const toggleComments = async (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null); // Close comments if already expanded
      setComments([]); // Clear comments when collapsing
    } else {
      setExpandedPostId(postId); // Expand comments for this post
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
        </NewCommentContainer>
        <CommentList>
          {posts.map((post) => (
            <CommentItem key={post.id}>
              <CommentUser>{post.creator.name}</CommentUser>
              <CommentContent>{post.content}</CommentContent>
              <CommentButtons>
                <CommentButton onClick={() => likePost(post.id)}>
                  <img src={FaThumbsUp} /> {post.likes}
                </CommentButton>
                <CommentButton onClick={() => dislikePost(post.id)}>
                  <img src={FaThumbsDown} /> {post.dislikes}
                </CommentButton>
                <CommentButton onClick={() => toggleComments(post.id)}>
                  <img src={FaComment} /> {post.comments}
                </CommentButton>
              </CommentButtons>

              {expandedPostId === post.id && (
                <div>
                  {comments.map((comment) => (
                    <CommentItem key={comment.id}>
                    <CommentUser>{comment.creator.name}</CommentUser>
                    <CommentContent>{comment.content}</CommentContent>
                    <CommentButtons>
                      <CommentButton onClick={() => likeComment(comment.id, post.id)}>
                        <img src={FaThumbsUp} /> {comment.likes}
                      </CommentButton>
                      <CommentButton onClick={() => dislikeComment(comment.id, post.id)}>
                        <img src={FaThumbsDown} /> {comment.dislikes}
                      </CommentButton>
                    </CommentButtons>
                  </CommentItem>
                  ))}
                  <NewCommentContainer>
                    <NewCommentInput
                      placeholder="Escreva um comentário..."
                    value={newComment}
                    onChange={handleNewCommentChange}
                    />
                    <SolidButton onClick={() => createComment(post.id)}>Postar</SolidButton>
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