import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
  FormHelperText,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';

function PeriodoPesquisa({ form, setForm }) {
  // Inicializar o estado local com o valor do formulário pai, se existir
  const [tipoPeriodo, setTipoPeriodo] = useState(form.tipo_periodo || "");

  // Sincronizar o estado local com o estado do formulário pai
  useEffect(() => {
    if (form.tipo_periodo && form.tipo_periodo !== tipoPeriodo) {
      setTipoPeriodo(form.tipo_periodo);
    }
  }, [form.tipo_periodo]);

  // Função para lidar com a mudança no tipo de período
  const handleTipoPeriodoChange = (e) => {
    const tipo = e.target.value;
    setTipoPeriodo(tipo);

    setForm({
      ...form,
      tipo_periodo: tipo,
      dia_especifico: tipo === "Dia Específico" ? form.dia_especifico : null, // Limpa se mudar
      dias_semana: tipo === "Semanal" ? (form.dias_semana || []) : []
    });
  };

  // Função para lidar com a mudança no dia da semana (semanal)
  const handleDiaSemanaChange = (e) => {
    const dia = e.target.value;
    setForm({ 
      ...form, 
      dias_semana: dia ? [dia] : [] // Garantir que seja um array, mesmo vazio
    });
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
        noites_max: Math.max(value, form.noites_max || value) // Garante que max >= min
      });
    } else {
      setForm({
        ...form,
        noites_max: Math.max(value, form.noites_min || 1) // Garante que max >= min
      });
    }
  };

  // Função para lidar com a seleção de um dia específico
  const handleDiaEspecificoChange = (dia) => {
    setForm({ ...form, dia_especifico: dia });
  };

  // Dias da semana para o select
  const diasSemana = [
    { value: "Segunda", label: "Segunda-feira" },
    { value: "Terça", label: "Terça-feira" },
    { value: "Quarta", label: "Quarta-feira" },
    { value: "Quinta", label: "Quinta-feira" },
    { value: "Sexta", label: "Sexta-feira" },
    { value: "Sábado", label: "Sábado" },
    { value: "Domingo", label: "Domingo" }
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" margin="normal" sx={{ 
            width: '100%',
            minWidth: 320
          }}>
            <InputLabel>Período da Pesquisa</InputLabel>
            <Select
              value={tipoPeriodo}
              onChange={handleTipoPeriodoChange}
              label="Período da Pesquisa"
              required
              sx={{ height: 56 }}
            >
              <MenuItem value="" disabled>Selecione o período</MenuItem>
              <MenuItem value="Semanal">Semanal</MenuItem>
              <MenuItem value="Dia Específico">Dia Específico</MenuItem>
              <MenuItem value="Mês Completo">Mês Completo</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Campo para seleção do dia da semana (semanal) */}
        {tipoPeriodo === "Semanal" && (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" margin="normal" sx={{ width: '100%', minWidth: 320, maxWidth: 400 }}>
              <InputLabel id="dias-semana-label">Dia da Semana</InputLabel>
              <Select
                labelId="dias-semana-label"
                value={Array.isArray(form.dias_semana) && form.dias_semana.length > 0 ? form.dias_semana[0] : ""}
                onChange={(e) => {
                  const selectedDia = e.target.value;
                  setForm(prev => ({
                    ...prev,
                    dias_semana: selectedDia ? [selectedDia] : []
                  }));
                }}
                label="Dia da Semana"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5,
                      width: 250,
                    },
                  },
                }}
                sx={{ height: 56 }}
              >
                <MenuItem value="" disabled>Selecione um dia</MenuItem>
                {diasSemana.map(dia => (
                  <MenuItem key={dia.value} value={dia.value}>
                    {dia.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>

      {/* Calendário simples para dia específico */}
      {tipoPeriodo === "Dia Específico" && (
        <Box mt={3}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Selecione o Dia
          </Typography>
          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
              gap: 1,
              mt: 1
            }}
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
              <Button
                key={dia}
                variant={form.dia_especifico === dia ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleDiaEspecificoChange(dia)}
                sx={{ minWidth: '40px', height: '40px', p: 0 }}
              >
                {dia}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      {/* Campos para intervalo de noites (exibido em todos os tipos de período) */}
      {tipoPeriodo && (
        <Box mt={3}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Intervalo de Noites
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mínimo"
                type="number"
                value={form.noites_min || ""}
                onChange={(e) => handleNoitesChange(e, "min")}
                variant="outlined"
                inputProps={{ min: 1 }}
                sx={{ 
                  width: '100%',
                  minWidth: 320,
                  maxWidth: 400,
                  height: 56
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Máximo"
                type="number"
                value={form.noites_max || ""}
                onChange={(e) => handleNoitesChange(e, "max")}
                variant="outlined"
                inputProps={{ min: form.noites_min || 1 }}
                sx={{ 
                  width: '100%',
                  minWidth: 320,
                  maxWidth: 400,
                  height: 56
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default PeriodoPesquisa;
