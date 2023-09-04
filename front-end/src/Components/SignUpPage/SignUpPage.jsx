import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import useForms from "../../hooks/useForms";
import { useNavigate } from "react-router-dom";
import { goToHome, goToLoginPage } from "../../router/Coordinator"
import { Header } from "../Header/Header"
import { Container, Title, HeaderButton, CheckContainer, BlueText, InputContainer, Input, SolidButton, ButtonContainer } from "./SignUpPageStyled"

export const SignUpPage = () => {
  const navigate = useNavigate();

  const { form, onChange } = useForms({ name: "", email: "", password: "" });

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const body = {
        name: form.name,
        email: form.email,
        password: form.password
      }
      const res = await axios.post(`${BASE_URL}/users/signup`, body);
      console.log(res)
      localStorage.setItem("token", res.data.token)
      // cleanForm();
      goToHome(navigate)

    } catch (error) {
      alert(error?.response?.data)
      console.error(error?.response?.data);
    }
  };

  return (
    <>
      <Header />
      <HeaderButton onClick={() => goToLoginPage(navigate)}>Entrar</HeaderButton>
      <Container>
        <Title>Olá, boas vindas ao LabEddit ;)</Title>
        <form onSubmit={signUp}>
          <InputContainer>
            <Input placeholder="Apelido"
              id="name"
              name="name"
              type="name"
              required
              value={form.name}
              onChange={onChange}
            />
            <Input placeholder="Email"
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
            />
            <Input placeholder="Password"
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={onChange}
            />
          </InputContainer>

          <ButtonContainer>
            <div>
              Ao continuar, você concorda com o nosso <BlueText>Contrato de usuário</BlueText> e nossa <BlueText>Política de Privacidade</BlueText>
            </div>
            <CheckContainer>
              <input type="checkbox" required />
              <div>
                Eu concordo em receber emails sobre coisas legais no Labeddit
              </div>
            </CheckContainer>
            <SolidButton>Cadastrar</SolidButton>
          </ButtonContainer>
        </form>
      </Container>
    </>
  )
}