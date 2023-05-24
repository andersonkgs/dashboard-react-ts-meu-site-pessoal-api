import React from "react";

import styles from "./Table.module.css";

export interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    handleEdit?: (item: T) => void;
    handleDelete?: (item: T) => void;
}

export const Table = <T,>({ columns, data, handleEdit, handleDelete }: TableProps<T>): JSX.Element => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className={styles.th}>{column.header}</th>
                    ))}
                    {(handleEdit || handleDelete) && <th className={styles.th}>Ações</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((column, columnIndex) => (
                            column.accessor == "image" ?
                                <td key={columnIndex} className={styles.td}>
                                    <img src={item[column.accessor] as string} className={styles.img} alt="Imagem" />
                                </td>
                                :
                                <td key={columnIndex} className={styles.td}>{item[column.accessor]}</td>
                        ))}
                        {(handleEdit || handleDelete) && (
                            <td className={styles.td}>
                                {handleEdit && <button onClick={() => handleEdit(item)}>Editar</button>}
                                {handleDelete && <button onClick={() => handleDelete(item)}>Excluir</button>}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
