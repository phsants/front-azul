import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Painel de Controle</h1>
      <div className={styles.grid}>
        <div className={styles.card} onClick={() => navigate("/dashboard")}>
          <h2>📊 Dashboard</h2>
          <p>Visualizar relatórios e gráficos das pesquisas</p>
        </div>
        <div className={styles.card} onClick={() => navigate("/pesquisas")}>
          <h2>📝 Pesquisas</h2>
          <p>Cadastrar, editar e visualizar pesquisas</p>
        </div>
        <div className={styles.card} onClick={() => navigate("/agendamentos")}>
          <h2>🕒 Agendamentos</h2>
          <p>Gerenciar e configurar agendamentos de pesquisas</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
