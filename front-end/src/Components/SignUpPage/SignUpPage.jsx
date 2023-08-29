// import { HeaderStyle } from './HeaderStyled'
import { useNavigate } from "react-router-dom";
import { goToHome, goToLoginPage } from "../../router/Coordinator"
import { Header } from "../Header/Header"
import { Container, Title, HeaderButton, CheckContainer, BlueText, InputContainer, Input, SolidButton, ButtonContainer } from "./SignUpPageStyled"

export const SignUpPage = () => {
    const navigate = useNavigate();

    return (
        <>
        <Header/>
        <HeaderButton onClick={() => goToLoginPage(navigate)}>Entrar</HeaderButton>
            <Container>
                <Title>Olá, boas vindas ao LabEddit ;)</Title>
                <InputContainer>
                    <Input placeholder="Apelido" type="name" />
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Password" type="password" />
                </InputContainer>

                <ButtonContainer>
                    <div>
                        Ao continuar, você concorda com o nosso <BlueText>Contrato de usuário</BlueText> e nossa <BlueText>Política de Privacidade</BlueText>
                    </div>
                    <CheckContainer>
                    <input type="checkbox" />
                    <div>
                        Eu concordo em receber emails sobre coisas legais no Labeddit
                    </div>
                    </CheckContainer>
                    <SolidButton onClick={() => goToHome(navigate)}>Continuar</SolidButton>
                </ButtonContainer>
            </Container>
        </>
    )
}