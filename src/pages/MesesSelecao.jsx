import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Divider
} from '@mui/material';

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
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" color="text.secondary">
          Meses
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={toggleTodosMeses}
        >
          {Array.isArray(form.meses_selecionados) && form.meses_selecionados.length === meses.length 
            ? "Deselecionar Todos" 
            : "Selecionar Todos"}
        </Button>
      </Box>
      
      <Grid container spacing={1}>
        {meses.map((mes) => (
          <Grid item xs={6} sm={4} md={3} key={mes}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Array.isArray(form.meses_selecionados) && form.meses_selecionados.includes(mes)}
                  onChange={handleCheckboxChange}
                  value={mes}
                  color="primary"
                />
              }
              label={mes}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MesesSelecao;
