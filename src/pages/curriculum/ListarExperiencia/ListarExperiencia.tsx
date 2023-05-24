import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../components/common/Table";

import { 
    Experiencia,
    deleteExperiencia,
    getExperiencias 
} from "../../../services/experienciaService";

const ListarExperiencia: React.FC = () => {
    const navigate = useNavigate();
    const [experiencias, setExperiencias] = React.useState<Experiencia[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencias();
            setExperiencias(experiencias);
        } catch (error) {
            console.log("Erro ao buscar experiências", error);            
        }
    };

    useEffect(() => {
        fetchExperiencias();
    }, []);

    const handleEdit = (experiencia: Experiencia) => {
        navigate("/curriculo/experiencia/atualizar", { state: experiencia });
    };

    const handleDelete = async (experiencia: Experiencia) => {
        try {
            await deleteExperiencia(experiencia.id);
            fetchExperiencias();
            alert("Experiência excluída com sucesso!");
        } catch (error) {
            console.log("Erro ao tentar excluir experiência.", error);
            alert("Ocorreu um erro ao tentar excluir a experiência!");
        }
        
    };

    const columns: Column<Experiencia>[] = [
        { header: "Tipo", accessor: "tipo" },
        { header: "Título", accessor: "titulo" },
        { header: "Descrição", accessor: "descricao" },
        { header: "Local", accessor: "local" },
        { header: "Data Início", accessor: "dataInicio" },
        { header: "Data Fim", accessor: "dataFim" },
    ];

    return (
        <Table
            columns={columns}
            data={experiencias}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default ListarExperiencia;
