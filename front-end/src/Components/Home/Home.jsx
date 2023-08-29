import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../router/Coordinator";
import { Header } from "../Header/Header";
import { HeaderButton } from "./HomeStyled";
import React, { useState } from "react";
import {
    Container,
  CommentList,
  CommentItem,
  CommentContent,
  CommentButtons,
  CommentButton,
  SolidButton,
  CommentCount,
  NewCommentContainer,
  NewCommentInput,
  CommentUser,
  SubmitButton
} from "./HomeStyled";
import FaThumbsUp from "../../assets/like.svg";
import FaThumbsDown from "../../assets/dislike.svg";
import FaComment from "../../assets/comment.svg";

export const Home = () => {   
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([
        {
            id: 1,
            user: "labaluno83 ",
            text: "Porque a maioria dos desenvolvedores usam Linux? ou as empresas de tecnologia usam Linux ?",
            likes: 10,
            dislikes: 2,
            comments: 5,
        },
        {
            id: 2,
            user: "labaluno8 ",
            text: "Qual super poder você gostaria de ter?",
            likes: 15,
            dislikes: 1,
            comments: 3,
        },
        {
            id: 3,
            user: "labaluno33",
            text: "Se você pudesser ter qualquer tipo de pet, qual você escolheria?",
            likes: 15,
            dislikes: 1,
            comments: 3,
        },
        {
            id: 4,
            user: "labaluno823 ",
            text: "Se você tivesse que comer apenas uma coisa para o resto de sua vida, o que você escolheria?",
            likes: 15,
            dislikes: 1,
            comments: 3,
        },
        // Add more comments here
    ]);

 

    const handleLike = (commentId) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          )
        );
      };
    
      const handleDislike = (commentId) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, dislikes: comment.dislikes + 1 }
              : comment
          )
        );
      };
    
      const handleComment = (commentId) => {
        // Handle comment action here
      };
    
      const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
      };
    
      const handleSubmitComment = () => {
        if (newComment.trim() !== "") {
          setComments((prevComments) => [
            ...prevComments,
            {
              id: prevComments.length + 1,
              text: newComment,
              likes: 0,
              dislikes: 0,
              comments: 0,
            },
          ]);
          setNewComment("");
        }
      };

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <HeaderButton onClick={() => goToLoginPage(navigate)}>Logout</HeaderButton>
            <Container>
                <NewCommentContainer>
        <NewCommentInput
          placeholder="Escreva seu post..."
          value={newComment}
          onChange={handleNewCommentChange}
        />
        <SolidButton onClick={handleSubmitComment}>Postar</SolidButton>
      </NewCommentContainer>
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentUser>{comment.user}</CommentUser>
            <CommentContent>{comment.text}</CommentContent>
            <CommentButtons>
              <CommentButton onClick={() => handleLike(comment.id)}>
                <img src={FaThumbsUp} /> {comment.likes}
              </CommentButton>
              <CommentButton onClick={() => handleDislike(comment.id)}>
                <img src={FaThumbsDown} /> {comment.dislikes}
              </CommentButton>
              <CommentButton onClick={() => handleComment(comment.id)}>
                <img src={FaComment} /> {comment.comments}
              </CommentButton>
            </CommentButtons>
          </CommentItem>
        ))}
      </CommentList>
      
    </Container>
        </>
    )
}