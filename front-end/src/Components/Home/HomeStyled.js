import { styled } from "styled-components";

export const HeaderButton = styled.button`
    position: fixed;
    right: 20px;
    border: none;
    background-color: transparent;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #4088CB;
`;

export const Container = styled.div`
  height: 100vh;
  padding: 10%;
`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CommentItem = styled.li`
  margin-bottom: 20px;
  background-color: #FBFBFB;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #E0E0E0
`;

export const CommentContent = styled.p`
  font-size: 16px;
`;
export const CommentUser = styled.p`
font-size: 12px;
color: #6F6F6F;
font-weight: 400;
`;

export const CommentButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const CommentButton = styled.button`
border: 0.8px solid #ECECEC;
background-color: transparent;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const CommentCount = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 5px;
`;

export const NewCommentContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const LikeDislike = styled.div`
border: 0.8px solid #ECECEC;

  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  align-items: center;
  button{
    border: none;
background-color: transparent;
  }
`;

export const NewCommentInput = styled.input`
  width: 97%;
  padding-bottom: 8rem;
  padding-left: 10px;
  padding-top: 10px;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #373737;
  background-color: #f0f0f0;
`;

export const SolidButton = styled.button`
  margin: 5px;
  background: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  height: 51px;
  top: 586px;
  left: 29px;
  border-radius: 12px;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const Line = styled.div`
border: none;
margin: 10% 0;
    width: 97%;
    height: 1px;
    background: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%), #ACACAC;
`;