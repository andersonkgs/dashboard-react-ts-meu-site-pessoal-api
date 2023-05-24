import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import Select from "../../../components/forms/Select";
import Textarea from "../../../components/forms/Textarea";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";

import { Experiencia, createOrUpdateExperiencia } from "../../../services/experienciaService";

const ManipularExperiencia: React.FC = () => {
    const navigate = useNavigate();
    const experiencia = useLocation().state as Experiencia;

    const initialValues: Experiencia = {
        tipo: "",
        titulo: "",
        descricao: "",
        local: "",
        dataInicio: "",
        dataFim: "",
    };

    const validationSchema = Yup.object().shape({
        tipo: Yup.string().required("Campo obrigatório"),
        titulo: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string().required("Campo obrigatório"),
        local: Yup.string().required("Campo obrigatório"),
        dataInicio: Yup.string().optional(),
        dataFim: Yup.string().required("Campo obrigatório"),
    });

    const onSubmit = async (values: Experiencia, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateExperiencia(values);
            resetForm();
            navigate("/curriculo/experiencia/listar");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao enviar formulário!");
        }
       
    };
    
    return (
        <Form
            initialValues={experiencia || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                
                <>
                    
                    {
                        !experiencia ?
                            <Title>Cadastrar experiência</Title>
                            :
                            <Title>Editar experiência</Title>
                    }

                    <Select
                        label="Tipo de experiência"
                        name="tipo"
                        options={[
                        { value: "Academica", label: "Acadêmica" },
                        { value: "Profissional", label: "Profissional" },
                        ]}
                        errors={errors.tipo}
                        touched={touched.tipo}
                    />
                        
                    <Input
                        label="Título"
                        name="titulo"
                        errors={errors.titulo}
                        touched={touched.titulo}
                    />

                    <Textarea
                        label="Descrição"
                        name="descricao"
                        errors={errors.descricao}
                        touched={touched.descricao}
                    />

                    <Input
                        label="Local"
                        name="local"
                        errors={errors.local}
                        touched={touched.local}
                    />

                    <Input
                        label="Data Inicio"
                        name="dataInicio"
                        errors={errors.dataInicio}
                        touched={touched.dataInicio}
                    />

                    <Input
                        label="Data Fim"
                        name="dataFim"
                        errors={errors.dataFim}
                        touched={touched.dataFim}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularExperiencia;
