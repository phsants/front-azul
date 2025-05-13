import React from "react";
import styles from "./styles";

function MesesSelecao({ form, setForm }) {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Função para selecionar/deselecionar todos os meses
  const toggleTodosMeses = () => {
    if (Array.isArray(form.meses_selecionados) && form.meses_selecionados.length === meses.length) {
      // Se todos já estão selecionados, deseleciona todos
      setForm({ ...form, meses_selecionados: [] });
    } else {
      // Seleciona todos os meses
      setForm({ ...form, meses_selecionados: [...meses] });
    }
  };

  // Função para lidar com a mudança de um checkbox individual
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      // Certifique-se de que prev.meses_selecionados é um array antes de fazer a manipulação
      if (!Array.isArray(prev.meses_selecionados)) {
        return { ...prev, meses_selecionados: checked ? [value] : [] };
      }

      const newMeses = checked
        ? [...prev.meses_selecionados, value]
        : prev.meses_selecionados.filter((mes) => mes !== value);

      return { ...prev, meses_selecionados: newMeses };
    });
  };

  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>Meses</label>
      {/* Botão "Selecionar/Deselecionar Todos" */}
      <button
        type="button"
        onClick={toggleTodosMeses}
        style={styles.toggleButton}
      >
        {Array.isArray(form.meses_selecionados) && form.meses_selecionados.length === meses.length ? "Deselecionar Todos" : "Selecionar Todos"}
      </button>
      <div style={styles.checkboxContainer}>
        {meses.map((mes) => (
          <label key={mes} style={styles.checkboxItem}>
            <input
              type="checkbox"
              value={mes}
              checked={Array.isArray(form.meses_selecionados) && form.meses_selecionados.includes(mes)}
              onChange={handleCheckboxChange}
              style={styles.checkboxInput}
            />
            <span style={styles.checkboxLabel}>{mes}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default MesesSelecao;