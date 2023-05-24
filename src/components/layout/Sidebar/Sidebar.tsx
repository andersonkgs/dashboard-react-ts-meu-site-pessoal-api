import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

import { useAuth } from "../../../contexts/AuthContext";

const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <div className={styles.sidebar}>
            <nav className={styles.navigation}>

                <ul>
                    <li>
                        <NavLink to= "/">
                            <h3>Painel inicial</h3>
                        </NavLink>
                    </li>
                </ul>
                
                <h3>Currículo</h3>
                <ul>
                    <li>
                        <NavLink to="/curriculo/informacoes">
                            Informações
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="curriculo/experiencia/cadastrar">
                            Cadastrar experiência
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="curriculo/experiencia/listar">
                            Listar experiências
                        </NavLink>
                    </li>
                </ul>
                
                <h3>Portfólio</h3>
                <ul>
                    <li>
                        <NavLink to="/projeto/cadastrar">
                            Cadastrar projeto
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/portfolio/listar">
                            Listar portfólio
                        </NavLink>
                    </li>
                </ul>
                
                <ul>
                    <li>
                        <NavLink onClick={logout} to= "/login">
                            <h3>Sair</h3>
                        </NavLink>
                    </li>
                </ul>

            </nav>
        </div>
    );
};

export default Sidebar;
