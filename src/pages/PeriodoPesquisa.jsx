import React, { useState } from "react";
import styles from "./styles";

function PeriodoPesquisa({ form, setForm }) {
  const [tipoPeriodo, setTipoPeriodo] = useState("");

  // Função para lidar com a mudança no tipo de período
  const handleTipoPeriodoChange = (e) => {
    const tipo = e.target.value;
    setTipoPeriodo(tipo);

    setForm({
      ...form,
      tipo_periodo: tipo,
      dia_especifico: tipo === "Dia Específico" ? form.dia_especifico : null, // Limpa se mudar
      dias_semana: tipo === "Semanal" ? form.dias_semana : []
    });
  };

  // Função para lidar com a mudança no dia da semana (semanal)
  const handleDiaSemanaChange = (e) => {
    const dia = e.target.value;
    setForm({ ...form, dias_semana: [dia] }); // Enviar como array
  };

  // Função para lidar com a mudança no intervalo de noites
  const handleNoitesChange = (e, tipo) => {
    let value = parseInt(e.target.value) || 0; // Garante que é um número válido

    if (value < 1) {
      value = 1; // Impede valores menores que 1
    }

    if (tipo === "min") {
      setForm({
        ...form,
        noites_min: value,
        noites_max: Math.max(value, form.noites_max) // Garante que max >= min
      });
    } else {
      setForm({
        ...form,
        noites_max: Math.max(value, form.noites_min) // Garante que max >= min
      });
    }
  };

  // Função para lidar com a seleção de um dia específico
  const handleDiaEspecificoChange = (dia) => {
    setForm({ ...form, dia_especifico: dia });
  };

  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>Período da Pesquisa</label>
      <select
        value={tipoPeriodo}
        onChange={handleTipoPeriodoChange}
        style={styles.input}
        required
      >
        <option value="" disabled hidden>Selecione o período</option>
        <option value="Semanal">Semanal</option>
        <option value="Dia Específico">Dia Específico</option>
        <option value="Mês Completo">Mês Completo</option>
      </select>

      {/* Campo para seleção do dia da semana (semanal) */}
      {tipoPeriodo === "Semanal" && (
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Dia da Semana</label>
          <select
            value={form.dias_semana[0] || ""}
            onChange={handleDiaSemanaChange}
            style={styles.input}
          >
            <option value="">Selecione o dia</option>
            <option value="Segunda">Segunda-feira</option>
            <option value="Terça">Terça-feira</option>
            <option value="Quarta">Quarta-feira</option>
            <option value="Quinta">Quinta-feira</option>
            <option value="Sexta">Sexta-feira</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
        </div>
      )}

      {/* Calendário simples para dia específico */}
      {tipoPeriodo === "Dia Específico" && (
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Selecione o Dia</label>
          <div style={styles.calendario}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
              <button
                key={dia}
                type="button"
                onClick={() => handleDiaEspecificoChange(dia)}
                style={{
                  ...styles.diaButton,
                  backgroundColor: form.dia_especifico === dia ? "#007bff" : "#e3f2fd",
                  color: form.dia_especifico === dia ? "#fff" : "#333",
                }}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Campos para intervalo de noites (exibido em Semanal e Dia Específico) */}
      {(tipoPeriodo === "Semanal" || tipoPeriodo === "Dia Específico" || tipoPeriodo === "Mês Completo") && (
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Intervalo de Noites</label>
          <div style={styles.inputGroup}>
            <input
              type="number"
              placeholder="Mínimo"
              value={form.noites_min || ""}
              onChange={(e) => handleNoitesChange(e, "min")}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Máximo"
              value={form.noites_max || ""}
              onChange={(e) => handleNoitesChange(e, "max")}
              style={styles.input}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PeriodoPesquisa;