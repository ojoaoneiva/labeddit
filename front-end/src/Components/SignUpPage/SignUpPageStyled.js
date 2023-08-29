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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90vh;
  padding: 10%; /* Add padding for spacing */
`;

export const Title = styled.h1`
  /* margin-bottom: 10px; */
  /* font-family: "IBM Plex Sans"; */
  font-size: 36px;
  font-weight: 700;
  line-height: 47px;
  letter-spacing: 0em;
  text-align: left;
  color: #373737;
  margin-bottom: 50%;
  margin-top: 40px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100vw;
  /* padding: 10px; */
  margin: 20px;
  align-items: center;
  /* justify-content: center; */
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-radius: 4px;
  height: 30px;
  border: 1px solid #D5D8DE;
  /* margin: 0 10%; */
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* font-family: Noto Sans; */
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  width: 80vw;
`;

export const BlueText = styled.span`
  color: #4088CB;
`;

export const CheckContainer = styled.div`
  display: flex;
    div{
        padding: 20px 0;
        /* font-family: Noto Sans; */
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
    }
    input{
        margin: 0 10px 0 0;
    }
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
