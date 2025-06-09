import React from "react";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';

const HospedagemSelecao = ({ form, setForm }) => {
  // CORREÇÃO FINAL: Garantir que apartamento e bebês nunca sejam null
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo ${name} alterado para:`, value, typeof value); // Debug

    let parsedValue = parseInt(value, 10);

    // CORREÇÃO CRÍTICA: Garantir valores específicos para campos problemáticos
    if (name === 'apartamento') {
      // Apartamento NUNCA pode ser null, undefined, 0 ou NaN
      if (isNaN(parsedValue) || parsedValue === null || parsedValue === undefined || parsedValue < 1) {
        parsedValue = 1;
      }
      console.log(`Apartamento final:`, parsedValue); // Debug
    } else if (name === 'bebes') {
      // Bebês NUNCA pode ser null, undefined ou NaN, mas pode ser 0
      if (isNaN(parsedValue) || parsedValue === null || parsedValue === undefined || parsedValue < 0) {
        parsedValue = 0;
      }
      console.log(`Bebês final:`, parsedValue); // Debug
    } else {
      // Para outros campos
      parsedValue = isNaN(parsedValue) ? 0 : parsedValue;
    }

    setForm((prev) => {
      const novoForm = {
        ...prev,
        [name]: parsedValue,
      };
      console.log(`Estado completo após ${name}:`, novoForm); // Debug
      return novoForm;
    });
  };

  const handleIdadeChange = (e, index, tipo) => {
    const newIdades = [...(form[tipo] || [])];
    newIdades[index] = parseInt(e.target.value, 10);
    setForm({ ...form, [tipo]: newIdades });
  };

  // Atualiza o array de idades quando o número de crianças ou bebês muda
  const atualizarIdades = (tipo, quantidade, idadeMin, idadeMax) => {
    setForm((prev) => ({
      ...prev,
      [tipo]: Array.from({ length: quantidade }, (_, i) =>
        prev[tipo] && prev[tipo][i] !== undefined ? prev[tipo][i] : idadeMin
      ),
    }));
  };

  // CORREÇÃO: Garantir que os valores sempre existam
  const apartamentoValue = form.apartamento !== null && form.apartamento !== undefined ? form.apartamento : 1;
  const adultosValue = form.adultos !== null && form.adultos !== undefined ? form.adultos : 2;
  const criancasValue = form.criancas !== null && form.criancas !== undefined ? form.criancas : 0;
  const bebesValue = form.bebes !== null && form.bebes !== undefined ? form.bebes : 0;

  console.log('Valores renderizados:', { apartamentoValue, adultosValue, criancasValue, bebesValue }); // Debug

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Apartamentos"
            name="apartamento"
            type="number"
            // CORREÇÃO CRÍTICA: Usar valor garantido
            value={apartamentoValue}
            onChange={handleChange}
            inputProps={{ min: 1, max: 4 }}
            variant="outlined"
            margin="normal"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '100%', md: '600px' }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Adultos"
            name="adultos"
            type="number"
            value={adultosValue}
            onChange={handleChange}
            inputProps={{ min: 1, max: 9 }}
            variant="outlined"
            margin="normal"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '100%', md: '600px' }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Crianças (2-17 anos)"
            name="criancas"
            type="number"
            value={criancasValue}
            onChange={(e) => {
              handleChange(e);
              atualizarIdades("idades_criancas", parseInt(e.target.value, 10) || 0, 2, 17);
            }}
            inputProps={{ min: 0, max: 5 }}
            variant="outlined"
            margin="normal"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '100%', md: '600px' }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Bebês (0-1 ano)"
            name="bebes"
            type="number"
            // CORREÇÃO CRÍTICA: Usar valor garantido
            value={bebesValue}
            onChange={(e) => {
              console.log('Bebês onChange disparado:', e.target.value); // Debug
              handleChange(e);
              atualizarIdades("idades_bebes", parseInt(e.target.value, 10) || 0, 0, 1);
            }}
            inputProps={{ min: 0, max: 5 }}
            variant="outlined"
            margin="normal"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '100%', md: '600px' }
            }}
          />
        </Grid>
      </Grid>

      {/* Idades das crianças */}
      {criancasValue > 0 && form.idades_criancas && (
        <Box mt={3}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Idades das crianças
          </Typography>
          <Grid container spacing={2}>
            {form.idades_criancas.map((idade, index) => (
              <Grid item xs={6} sm={4} md={2} key={`crianca-${index}`}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Criança {index + 1}</InputLabel>
                  <Select
                    value={idade}
                    onChange={(e) => handleIdadeChange(e, index, "idades_criancas")}
                    label={`Criança ${index + 1}`}
                  >
                    {[...Array(16).keys()].map((i) => (
                      <MenuItem key={i + 2} value={i + 2}>
                        {i + 2} anos
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Idades dos bebês */}
      {bebesValue > 0 && form.idades_bebes && (
        <Box mt={3}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Idades dos bebês
          </Typography>
          <Grid container spacing={2}>
            {form.idades_bebes.map((idade, index) => (
              <Grid item xs={6} sm={4} md={2} key={`bebe-${index}`}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Bebê {index + 1}</InputLabel>
                  <Select
                    value={idade}
                    onChange={(e) => handleIdadeChange(e, index, "idades_bebes")}
                    label={`Bebê ${index + 1}`}
                  >
                    {[0, 1].map((i) => (
                      <MenuItem key={i} value={i}>
                        {i} {i === 1 ? 'ano' : 'anos'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Tipo de Voo */}
      <Box mt={3}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Tipo de Voo</InputLabel>
          <Select
            name="tipo_voo"
            value={form.tipo_voo || "Mais Barato"}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                tipo_voo: e.target.value,
              }))
            }
            label="Tipo de Voo"
          >
            <MenuItem value="Mais Barato">Mais Barato</MenuItem>
            <MenuItem value="Voo Direto">Voo Direto</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default HospedagemSelecao;

