import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../Components/Header/Header";
import {LoginPage} from "../Components/LoginPage/LoginPage"
import {SignUpPage} from "../Components/SignUpPage/SignUpPage"
import {Home} from "../Components/Home/Home"

export const Routess = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/SignUpPage/" element={<SignUpPage />} />
        <Route path="/Home/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};