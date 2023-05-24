import React from "react";

import styles from "./InformacoesCard.module.css";

import { Informacoes } from "../../../../services/informacoesService";

interface InformacoesCardProps {
    informacoes: Informacoes;
}

const InformacoesCard: React.FC<InformacoesCardProps> = ({ informacoes }) => {
    const { foto, nome, cargo, sobre } = informacoes;

    return (
        <div className={styles.card}>
            <img src={foto} alt={`${nome}'s foto`} className={styles.foto} />
            <div className={styles.content}>
                <h3 className={styles.nome}>{nome}</h3>
                <p className={styles.cargo}>{cargo}</p>
                <p className={styles.sobre}>{sobre}</p>
            </div>
        </div>
    );
};

export default InformacoesCard;
