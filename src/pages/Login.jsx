import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password: senha }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token); // salva o token no navegador
        alert("Login realizado com sucesso!");
        navigate("/pesquisa");
      } else {
        alert(data.error || "Usuário ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao conectar no servidor");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
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
        <button style={styles.button} onClick={handleLogin}>
          Entrar
        </button>

        {/* Botão de Cadastro */}
        <button style={styles.registerButton} onClick={() => navigate("/cadastro")}>
          Criar Conta
        </button>
      </div>

      <div style={styles.imageContainer}>
        <img src="/images/logograndeVerde.jpeg" alt="Viagem" style={styles.image} />
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", width: "100vw", height: "100vh" },
  loginBox: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "#fff",
    boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
  },
  title: { fontSize: "26px", fontWeight: "bold", marginBottom: "20px" },
  input: {
    width: "80%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "80%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  },
  registerButton: {
    marginTop: "10px",
    width: "80%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  imageContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
};

export default Login;
