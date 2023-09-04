import { BASE_URL } from "../../constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import useForms from "../../hooks/useForms";
import { goToHome, goToSignUpPage } from "../../router/Coordinator"
import { Container, Title, Logo, Subtitle, OutlinedButton, Line, Input, SolidButton, ButtonContainer, Form } from "./LoginPageStyled"
import logo from "../../assets/logo.svg"
import axios from "axios";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { form, onChange } = useForms({ email: "", password: "" });

  const enviaLogin = async (event) => {
    event.preventDefault();
    try {
      const body = {
        email: form.email,
        password: form.password
      }
      const res = await axios.post(`${BASE_URL}/users/login`, body);
      console.log(res)
      localStorage.setItem("token", res.data.token)
      goToHome(navigate)

    } catch (error) {
      alert(error?.response?.data)
      console.error(error?.response?.data);
    }
  };

  return (
    <>
      <Container>
        <img src={logo} />
        <Title>LabEddit</Title>
        <Subtitle>O projeto de rede social da Labenu</Subtitle>
        <form onSubmit={enviaLogin}>
          <Form >
            <Input placeholder="Email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={onChange}
            />
            <Input placeholder="Password"
              type="password"
              name="password"
              required
              value={form.password}
              onChange={onChange}
            />

          </Form>
          <ButtonContainer>
            <SolidButton>Continuar</SolidButton>
            <Line></Line>

            <OutlinedButton onClick={() => goToSignUpPage(navigate)}>Crie uma conta!</OutlinedButton>
          </ButtonContainer>
        </form>
      </Container>
    </>
  )
}