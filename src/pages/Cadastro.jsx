import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: usuario, password: senha }),
        });


        if (!response.ok) {
          throw new Error("Erro no servidor ao tentar cadastrar.");
        }

        const data = await response.json();

        if (data.success) {
          alert("Cadastro realizado com sucesso!");
          navigate("/login");
        } else {
          alert(data.message || "Erro ao criar usuário");
        }
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert(error.message || "Erro ao conectar no servidor");
      }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Cadastro</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleCadastro}>
          Criar Conta
        </button>

        <button style={styles.registerButton} onClick={() => navigate("/login")}>
          Voltar para Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" },
  loginBox: {
    width: "400px",
    padding: "40px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: { fontSize: "26px", fontWeight: "bold", marginBottom: "20px" },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  registerButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default Cadastro;
