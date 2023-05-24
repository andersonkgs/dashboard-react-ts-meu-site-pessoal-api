import React from "react";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import Title from "../../components/common/Title";
import Button from "../../components/common/Button";

import { LoginData, login as loginService } from "../../services/authService";

import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const initialValues: LoginData = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("E-mail inválido!")
            .required("E-mail é obrigatório!"),
        password: Yup.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres.")
            .required("Senha é obrigatória!"),
    });

    const onSubmit = async (values: LoginData) => {
        try {
            const user = await loginService(values);
            login(user);
            navigate("/");
        } catch (error) {
            alert("Usuário e/ou senha inválidos!");
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>

                        <Title>MEU SITE PESSOAL</Title>

                        <Input
                            label="E-mail"
                            name="email"
                            type="email"
                            errors={errors.email}
                            touched={touched.email}
                        />

                        <Input
                            label="Senha"
                            name="password"
                            type="password"
                            errors={errors.password}
                            touched={touched.password}
                        />

                        <Button type="submit">Entrar</Button>
                    </>
                )}
            </Form>         
        </div>
    );
};

export default Login;
