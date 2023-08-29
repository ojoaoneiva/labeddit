import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Title = styled.h1`
  margin-bottom: 10px;
  /* font-family: "IBM Plex Sans"; */
  font-size: 36px;
  font-weight: 700;
  line-height: 47px;
  letter-spacing: 0em;
  text-align: left;
  color: #373737;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  /* font-family: IBM Plex Sans; */
  font-weight: 300;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #D5D8DE;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 13px 133px 13px 133px;
  border-radius: 27px;
  gap: 10px;
  /* font-family: Noto Sans; */
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
`;

export const Line = styled.div`
width: 363.0055158939032px;
top: 656px;
left: 33px;
/* border: 1px; */
/* background: linear-gradient(0deg, #ACACAC, #ACACAC),
linear-gradient(90deg, #FF6489 0%, #F9B24E 100%); */
border: 1px solid;
border-image-source: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%),
linear-gradient(0deg, #ACACAC, #ACACAC);
`;

export const OutlinedButton = styled.button`
  /* padding: 10px 20px; */
  margin: 5px;
  background-color: transparent;
  color: #FE7E02;
  border-radius: 4px;
  cursor: pointer;
  width: 365px;
  height: 51px;
  top: 676px;
  left: 29px;
  /* padding: 13px 133px 13px 133px; */
  border-radius: 27px;
  border: 1px;
  gap: 10px;
  border: 1px solid #FE7E02;
  /* font-family: Noto Sans; */
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;

`;