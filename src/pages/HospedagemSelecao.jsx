import React from "react";
import styles from "./styles";

const HospedagemSelecao = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  const handleIdadeChange = (e, index, tipo) => {
    const newIdades = [...form[tipo]];
    newIdades[index] = parseInt(e.target.value, 10);
    setForm({ ...form, [tipo]: newIdades });
  };

  // Atualiza o array de idades quando o número de crianças ou bebês muda
  const atualizarIdades = (tipo, quantidade, idadeMin, idadeMax) => {
    setForm((prev) => ({
      ...prev,
      [tipo]: Array.from({ length: quantidade }, (_, i) =>
        prev[tipo][i] ?? idadeMin
      ),
    }));
  };

  return (
    <div>
      <h3 style={styles.title}>Hospedagem</h3>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Apartamentos</label>
        <input
          type="number"
          name="apartamento"
          value={form.apartamento}
          onChange={handleChange}
          min="1"
          max="4"
          style={styles.input}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Adultos</label>
        <input
          type="number"
          name="adultos"
          value={form.adultos}
          onChange={handleChange}
          min="1"
          max="9"
          style={styles.input}
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Crianças</label>
        <input
          type="number"
          name="criancas"
          value={form.criancas}
          onChange={(e) => {
            handleChange(e);
            atualizarIdades("idades_criancas", parseInt(e.target.value, 10), 2, 17);
          }}
          min="0"
          max="5"
          style={styles.input}
        />
      </div>

      {form.criancas > 0 &&
        form.idades_criancas.map((idade, index) => (
          <div key={index} style={styles.inputGroup}>
            <label style={styles.label}>Idade da Criança {index + 1}</label>
            <select
              value={idade}
              onChange={(e) => handleIdadeChange(e, index, "idades_criancas")}
              style={styles.input}
            >
              {[...Array(16).keys()].map((i) => (
                <option key={i + 2} value={i + 2}>
                  {i + 2}
                </option>
              ))}
            </select>
          </div>
        ))}

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Bebês</label>
        <input
          type="number"
          name="bebes"
          value={form.bebes}
          onChange={(e) => {
            handleChange(e);
            atualizarIdades("idades_bebes", parseInt(e.target.value, 10), 0, 1);
          }}
          min="0"
          max="5"
          style={styles.input}
        />
      </div>

      {form.bebes > 0 &&
        form.idades_bebes.map((idade, index) => (
          <div key={index} style={styles.inputGroup}>
            <label style={styles.label}>Idade do Bebê {index + 1}</label>
            <select
              value={idade}
              onChange={(e) => handleIdadeChange(e, index, "idades_bebes")}
              style={styles.input}
            >
              {[0, 1].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Tipo de Voo</label>
          <select
            name="tipo_voo"
            value={form.tipo_voo}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                tipo_voo: e.target.value,
              }))
            }
            style={styles.input}
          >
            <option value="Mais Barato">Mais Barato</option>
            <option value="Voo Direto">Voo Direto</option>
          </select>
        </div>

    </div>
  );
};

export default HospedagemSelecao;
