import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./styles";
import { apiFetch } from "../api";

function CamposDinamicos({ form, setForm, field, label }) {
  const [cidades, setCidades] = useState([]);
  const [opcoesCidades, setOpcoesCidades] = useState([]);
  const valores = form[field] || [""];

  useEffect(() => {
      async function carregarCidades() {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Usuário não autenticado");
          }

          const data = await apiFetch("https://api-pacotes-manus.onrender.com/api/cidades");
          setCidades(data);
          setOpcoesCidades(
            data.map((cidade) => ({
              value: cidade.id,
              label: cidade.nome,
            }))
          );
        } catch (error) {
          console.error("Erro ao buscar cidades:", error);
          alert("Erro ao buscar cidades. Faça login novamente.");
        }
      }

      carregarCidades();
  }, []);

  const handleChange = (selectedOption, index) => {
    const newFields = [...form[field]];

    const base = selectedOption
      ? { id: selectedOption.value, nome: selectedOption.label }
      : "";

    if (field === "destinos") {
      newFields[index] = {
        ...newFields[index],
        ...base,
        hotel: newFields[index]?.hotel || "",
        hotel_por_preco: newFields[index]?.hotel_por_preco ?? true,
      };
    } else {
      newFields[index] = base;
    }

    setForm({ ...form, [field]: newFields });
  };

  const handleHotelChange = (value, index) => {
    const newFields = [...form.destinos];
    newFields[index].hotel = value;
    setForm({ ...form, destinos: newFields });
  };

  const handleCheckboxChange = (checked, index) => {
    const newFields = [...form.destinos];
    newFields[index].hotel_por_preco = checked;
    if (checked) {
      newFields[index].hotel = "";
    }
    setForm({ ...form, destinos: newFields });
  };

  const addField = () => {
    const novoValor =
      field === "destinos"
        ? { id: "", nome: "", hotel: "", hotel_por_preco: true }
        : "";

    setForm({ ...form, [field]: [...valores, novoValor] });
  };

  const removeField = (index) => {
    const newValues = [...valores];
    newValues.splice(index, 1);
    setForm({ ...form, [field]: newValues });
  };

  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      {valores.map((valor, index) => (
        <div key={index} style={styles.inputGroup}>
          <div style={{ width: "100%" }}>
            <Select
              options={opcoesCidades}
              value={opcoesCidades.find((opcao) => opcao.value === (valor?.id || valor)) || null}
              onChange={(selectedOption) => handleChange(selectedOption, index)}
              placeholder="Digite para buscar uma cidade..."
              isClearable
              noOptionsMessage={() => "Nenhuma cidade encontrada"}
              styles={{
                control: (base, state) => ({
                  ...base,
                  width: "100%",
                  height: "40px",
                  minHeight: "40px",
                  border: state.isFocused
                    ? "2px solid #007bff"
                    : "1px solid rgb(204, 204, 204)",
                  boxShadow: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                }),
                valueContainer: (base) => ({
                  ...base,
                  height: "40px",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                }),
                singleValue: (base) => ({
                  ...base,
                  fontSize: "16px",
                }),
                indicatorsContainer: (base) => ({
                  ...base,
                  height: "40px",
                }),
                menu: (base) => ({
                  ...base,
                  marginTop: "0",
                  width: "100%",
                }),
              }}
            />
          </div>

          {field === "destinos" && (
            <div style={styles.hotelGroup}>
              <input
                type="text"
                placeholder="Digite o nome do hotel"
                disabled={valor.hotel_por_preco}
                value={valor.hotel}
                onChange={(e) => handleHotelChange(e.target.value, index)}
                style={styles.input}
              />
              <label style={{ fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={valor.hotel_por_preco}
                  onChange={(e) => handleCheckboxChange(e.target.checked, index)}
                  style={styles.checkboxInput}
                />{" "}
                Selecionar pelo menor preço
              </label>
            </div>
          )}

          {index > 0 && (
            <button
              type="button"
              onClick={() => removeField(index)}
              style={styles.removeButton}
            >
              Remover
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addField} style={styles.addButton}>
        + Adicionar
      </button>
    </div>
  );
}

export default CamposDinamicos;
