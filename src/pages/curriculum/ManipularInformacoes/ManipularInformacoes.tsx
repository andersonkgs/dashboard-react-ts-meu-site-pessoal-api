import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AxiosError } from "axios";

import styles from "./ManipularInformacoes.module.css";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import Textarea from "../../../components/forms/Textarea";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";
import InformacoesCard from "./InformacoesCard";

import { 
    Informacoes,
    getInformacoes,
    deleteInformacoes,
    createOrUpdateInformacoes
} from "../../../services/informacoesService";

const ManipularInformacoes: React.FC = () => {
    const [informacoes, setInformacoes] = useState<Informacoes>();

    const initialValues: Informacoes = {
        foto: "",
        nome: "",
        cargo: "",
        sobre: "",
    };

    const validationSchema = Yup.object().shape({
        foto: Yup.string().required("Campo obrigatório"),
        nome: Yup.string().required("Campo obrigatório"),
        cargo: Yup.string().required("Campo obrigatório"),
        sobre: Yup.string().required("Campo obrigatório"),
    });

    const fetchInformacao = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status !== 404) {
                    console.error("Erro ao buscar informações:", error);        
                }
            } else {
                console.error("Ocorreu um erro desconhecido ao buscar informações:", error);
            }
        }
    };

    useEffect(() => {
        fetchInformacao();
    }, []);

    const onSubmit = async (values: Informacoes) => {
        try {
            await createOrUpdateInformacoes(values);
            setInformacoes(values);
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
        }
        
    };

    const handleDelete = async () => {
        try {
            await deleteInformacoes(informacoes?.id); // Ver se esta linha de codigo está correta
            setInformacoes(undefined);
            alert("Informações excluídas com sucesso!");
        } catch (error) {
            console.error("Erro ao tentar excluir informações:", error);
            alert("Ocorreu um erro ao tentar excluir as informações. Tente novamente.");
        }
    };

    return (
        <div className={styles.container}>

            <Form
                initialValues={informacoes || initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (

                    <>

                        <Title>Informações</Title>

                        <Input
                            label="Foto"
                            name="foto"
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label="Nome"
                            name="nome"
                            errors={errors.nome}
                            touched={touched.nome}
                        />

                        <Input
                            label="Cargo"
                            name="cargo"
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <Textarea
                            label="Sobre mim"
                            name="sobre"
                            errors={errors.sobre}
                            touched={touched.sobre}
                        />

                        <Button type="submit">Salvar</Button>

                    </>
                )}
                
            </Form>

            {informacoes &&
                <div className={styles.cardContainer}>
                    <InformacoesCard informacoes={informacoes} />
                    <Button onClick={handleDelete} red>Excluir</Button>
                </div>
            }
        </div> 
    );
};

export default ManipularInformacoes;
