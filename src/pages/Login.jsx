import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from '@/components/ui/spinner';
import { Toast } from '@/components/ui/toast';

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  const handleLogin = async () => {
    setLoading(true); // Mostra spinner
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password: senha }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        setToast({ message: "Login realizado com sucesso!", type: "success", visible: true });

        // Espera 2 segundos antes de navegar
        setTimeout(() => {
          setToast({ message: '', type: 'success', visible: false });
          navigate("/", { replace: true });
        }, 2000);
      } else {
        setToast({ message: data.error || "Usuário ou senha incorretos", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setToast({ message: "Erro ao conectar no servidor", type: "error", visible: true });
    } finally {
      setLoading(false); // Oculta spinner
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
        <button style={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <button style={styles.registerButton} onClick={() => navigate("/cadastro")}>
          Criar Conta
        </button>
      </div>

      <div style={styles.imageContainer}>
        <img src="/images/logograndeVerde.jpeg" alt="Viagem" style={styles.image} />
      </div>

      {/* Toast fixo */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}

      {/* Spinner centralizado flutuante */}
      {loading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <Spinner size={10} />
        </div>
      )}
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
