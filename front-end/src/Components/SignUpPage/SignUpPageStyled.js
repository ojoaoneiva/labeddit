import { styled } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  padding: 10%;
`;

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

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: left;
  color: #373737;
  margin-bottom: 60%;
  margin-top: 40px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-bottom: 20%;
`;

export const Input = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  height: 30px;
  border: 1px solid #D5D8DE;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
`;

export const BlueText = styled.span`
  color: #4088CB;
`;

export const CheckContainer = styled.div`
  display: flex;
    div{
        padding: 20px 0;
        font-size: 16px;
        font-weight: 400;
        text-align: left;
    }
    input{
        margin: 0 10px 0 0;
    }
`;

export const SolidButton = styled.button`
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
  border-radius: 27px;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
`;
