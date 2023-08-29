import { styled } from "styled-components";

export const HeaderButton = styled.button`
    position: fixed;
    right: 20px;
    border: none;
    background-color: transparent;
    align-items: center;
    /* font-family: Noto Sans; */
    font-size: 18px;
    font-weight: 600;
    line-height: 50px;
    letter-spacing: 0em;
    color: #4088CB;
`;

export const Container = styled.div`
  padding: 20px;
`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CommentItem = styled.li`
  margin-bottom: 20px;
  background-color: #f0f0f0; /* Gray background */
  padding: 10px;
  border-radius: 4px;
`;

export const CommentContent = styled.p`
  font-size: 16px;
`;
export const CommentUser = styled.p`
font-size: 12px;
color: #6F6F6F;
/* font-family: IBM Plex Sans; */
font-weight: 400;
line-height: 16px;
`;

export const CommentButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const CommentButton = styled.button`
  background-color: #f0f0f0;
  border: none;
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
`;

export const NewCommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #373737;
  background-color: #f0f0f0;
`;

export const SolidButton = styled.button`
  /* padding: 10px 20px; */
  margin: 5px;
  background: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 365px;
  height: 51px;
  top: 587px;
  left: 29px;
  /* padding: 13px 133px 13px 133px; */
  border-radius: 27px;
  gap: 10px;
  /* font-family: Noto Sans; */
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
`;
