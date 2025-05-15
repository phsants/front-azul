import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from '@/components/ui/spinner';
import { Toast } from '@/components/ui/toast';

function Cadastro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  const handleCadastro = async () => {
    setLoading(true); // Mostra spinner
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
        setToast({ message: "Cadastro realizado com sucesso!", type: "success", visible: true });

        // Espera 2s antes de navegar
        setTimeout(() => {
          setToast({ message: '', type: 'success', visible: false });
          navigate("/login");
        }, 2000);

      } else {
        setToast({ message: data.message || "Erro ao criar usuário", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setToast({ message: error.message || "Erro ao conectar no servidor", type: "error", visible: true });
    } finally {
      setLoading(false); // Oculta spinner
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
        <button style={styles.button} onClick={handleCadastro} disabled={loading}>
          {loading ? "Cadastrando..." : "Criar Conta"}
        </button>

        <button style={styles.registerButton} onClick={() => navigate("/login")}>
          Voltar para Login
        </button>
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
