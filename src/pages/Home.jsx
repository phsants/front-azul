import React from "react";

function Home() {
  function logout() {
      localStorage.removeItem("token"); // Apaga o token
      window.location.href = "/login";   // Redireciona para login
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo!</h1>
      <p style={styles.text}>Você está logado e acessou a área protegida.</p>
      <button onClick={logout} style={styles.button}>
        Sair
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: "32px",
    marginBottom: "16px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "24px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Home;
