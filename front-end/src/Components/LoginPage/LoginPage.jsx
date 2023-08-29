// import { HeaderStyle } from './HeaderStyled'
import { useNavigate } from "react-router-dom";
import { goToHome, goToSignUpPage } from "../../router/Coordinator"
import { Header } from "../Header/Header"
import {Container, Title, Subtitle, OutlinedButton, Line, Input, SolidButton, ButtonContainer} from "./LoginPageStyled"
import logo from "../../assets/logo.svg"

export const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <>
        <Container>
            <img src={logo}/>
      <Title>LabEddit</Title>
      <Subtitle>O projeto de rede social da Labenu</Subtitle>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <ButtonContainer>
        <SolidButton onClick={() => goToHome(navigate)}>Continuar</SolidButton>
        <Line></Line>
        <OutlinedButton onClick={() => goToSignUpPage(navigate)}>Crie uma conta!</OutlinedButton>
      </ButtonContainer>
    </Container>
        </>
    )
}