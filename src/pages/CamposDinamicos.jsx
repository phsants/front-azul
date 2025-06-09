import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

function CamposDinamicos({ form, setForm, field, label }) {
  const [cidades, setCidades] = useState([]);
  const [cidadesFiltradas, setCidadesFiltradas] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const valores = form[field] || [{ id: "", nome: "", hotel: "", hotel_por_preco: true }];

  // Garantir hotel_por_preco false no primeiro destino
  useEffect(() => {
    if (field === "destinos") {
      const atualizados = valores.map((destino, idx) => ({
        ...destino,
        hotel_por_preco:
          typeof destino.hotel_por_preco === "boolean"
            ? destino.hotel_por_preco
            : idx === 0 ? false : true,
      }));

      const precisaAtualizar = atualizados.some((d, i) =>
        d.hotel_por_preco !== valores[i]?.hotel_por_preco
      );

      if (precisaAtualizar) {
        setForm((prev) => ({ ...prev, [field]: atualizados }));
      }
    }
  }, [field, valores, setForm]);
  // Buscar cidades da API
  useEffect(() => {
    async function carregarCidades() {
      try {
        setCarregando(true);
        setErro(null);

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");

        const response = await fetch("http://localhost:5000/api/cidades", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Falha ao buscar cidades");

        const data = await response.json();
        const cidadesFormatadas = data.map(cidade => ({
          id: cidade.id,
          nome: cidade.nome,
          estado: cidade.estado
        }));

        setCidades(cidadesFormatadas);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        setErro("Falha ao carregar cidades. Verifique sua conexão.");
      } finally {
        setCarregando(false);
      }
    }

    carregarCidades();
  }, []);

  // Filtrar cidades com base no input de cada campo
  useEffect(() => {
    const novasFiltradas = {};
    valores.forEach((_, idx) => {
      const inputVal = inputValues[idx] || '';
      novasFiltradas[idx] =
        inputVal.trim() === ''
          ? cidades
          : cidades.filter(cidade =>
              cidade.nome.toLowerCase().includes(inputVal.toLowerCase())
            );
    });
    setCidadesFiltradas(novasFiltradas);
  }, [inputValues, cidades, valores.length]);

  const handleChange = (selectedOption, index) => {
    const newFields = [...form[field]];
    const base = selectedOption
      ? { id: selectedOption.id, nome: selectedOption.nome }
      : { id: "", nome: "" };

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

      // Garante que o campo no índice seja um objeto
      if (typeof newFields[index] !== 'object' || newFields[index] === null) {
        newFields[index] = { id: "", nome: "", hotel: "", hotel_por_preco: true };
      }

      newFields[index].hotel_por_preco = checked;

      if (checked) {
        newFields[index].hotel = "";
      }

      setForm({ ...form, destinos: newFields });
  };

  const addField = () => {
      const novoIndex = valores.length;

      const novoValor =
        field === "destinos"
          ? {
              id: "",
              nome: "",
              hotel: "",
              hotel_por_preco: novoIndex > 0 ? true : false, // 👈 só o primeiro vem desmarcado
            }
          : { id: "", nome: "" };

      setForm({ ...form, [field]: [...valores, novoValor] });
  };

  const removeField = (index) => {
    const newValues = [...valores];
    newValues.splice(index, 1);
    setForm({ ...form, [field]: newValues });
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {label}
      </Typography>

      {erro && (
        <Typography color="error" variant="caption" sx={{ display: 'block', mb: 2 }}>
          {erro}
        </Typography>
      )}

      {valores.map((valor, index) => (
        <Box key={index} mb={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={field === "destinos" ? 6 : 11}>
              <Autocomplete
                options={cidadesFiltradas[index] || cidades}
                getOptionLabel={(option) =>
                  option.estado ? `${option.nome} - ${option.estado}` : option.nome || ""
                }
                value={cidades.find(c => c.id === valor.id) || null}
                onChange={(_, newValue) => handleChange(newValue, index)}
                onInputChange={(_, newInputValue) => {
                  setInputValues((prev) => ({ ...prev, [index]: newInputValue }));
                }}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.estado ? `${option.nome} - ${option.estado}` : option.nome}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`${label} ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {carregando ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                loading={carregando}
                sx={{ height: 56, minWidth: 300 }}
                ListboxProps={{
                  style: { maxHeight: '200px' }
                }}
                disabled={carregando}
                filterOptions={(x) => x}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </Grid>

            {field === "destinos" && (
              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="Nome do Hotel"
                      placeholder="Digite o nome do hotel"
                      disabled={valor.hotel_por_preco}
                      value={valor.hotel_por_preco ? "" : (valor.hotel || "")}
                      onChange={(e) =>
                        !valor.hotel_por_preco && handleHotelChange(e.target.value, index)
                      }
                      variant="outlined"
                      sx={{
                        height: 56,
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#00000042",
                          cursor: "not-allowed"
                        },
                        opacity: valor.hotel_por_preco ? 0.6 : 1
                      }}
                      InputProps={{ style: { height: 56 } }}
                      aria-disabled={valor.hotel_por_preco}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={valor.hotel_por_preco ?? true}
                          onChange={(e) => handleCheckboxChange(e.target.checked, index)}
                          color="primary"
                        />
                      }
                      label="Menor preço"
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}

            {index > 0 && (
              <Grid item xs={1}>
                <IconButton
                  color="error"
                  onClick={() => removeField(index)}
                  aria-label="Remover"
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}

      <Box mt={2}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addField}
          color="primary"
        >
          Adicionar {label.toLowerCase()}
        </Button>
      </Box>
    </Box>
  );
}

export default CamposDinamicos;
