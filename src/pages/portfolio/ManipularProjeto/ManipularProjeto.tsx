import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";

import { Projeto, createOrUpdateProjeto } from "../../../services/portfolioService";

const ManipularProjeto = () => {
    const navigate = useNavigate();
    const portfolio = useLocation().state as Projeto;

    const initialValues: Projeto = {
        description: "",
        image: "",
        link: ""
    };

    const validationSchema = Yup.object().shape({
        description: Yup.string().required("Campo obrigatório"),
        image: Yup.string().required("Campo obrigatório"),
        link: Yup.string().required("Campo obrigatório"),
    });

    const onSubmit = async (values: Projeto, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateProjeto(values);            
            resetForm();
            navigate("/portfolio/listar");
            alert("Formulário enviado com sucesso!");    
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao enviar formulário!");
        }
    };

    return (
        <Form
            initialValues={portfolio || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
             
                <>
                    {
                        !portfolio ?
                            <Title>Cadastrar projeto</Title>
                            :
                            <Title>Editar projeto</Title>
                    }

                    <Input
                        label="Descrição"
                        name="description"
                        errors={errors.description}
                        touched={touched.description}
                    />
                                              
                    <Input
                        label="Imagem"
                        name="image"
                        errors={errors.image}
                        touched={touched.image}
                    />

                    <Input
                        label="Link"
                        name="link"
                        errors={errors.link}
                        touched={touched.link}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularProjeto;
