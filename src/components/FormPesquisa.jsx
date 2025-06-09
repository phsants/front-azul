import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
  FormControl,
  FormHelperText
} from '@mui/material';
import CamposDinamicos from '../pages/CamposDinamicos';
import MesesSelecao from '../pages/MesesSelecao';
import PeriodoPesquisa from '../pages/PeriodoPesquisa';
import HospedagemSelecao from '../pages/HospedagemSelecao';
import { Search as SearchIcon } from '@mui/icons-material';
import { apiFetch } from "../api"; // Importando apiFetch igual ao componente antigo

/**
 * Componente de formulário de pesquisa de viagens
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.form - Estado do formulário
 * @param {Function} props.setForm - Função para atualizar o estado do formulário
 * @returns {JSX.Element} Componente FormPesquisa
 */
function FormPesquisa({ form, setForm }) {
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    let newErrors = {};

    // Nome do cliente
    if (!form.cliente_nome.trim()) newErrors.cliente_nome = "Nome do cliente é obrigatório.";

    // Origem e Destino
    if (!form.origens || form.origens.length === 0 || !form.origens[0].nome?.trim()) {
      newErrors.origens = "Origem é obrigatória.";
    }
    if (!form.destinos || form.destinos.length === 0 || !form.destinos[0].nome?.trim()) {
      newErrors.destinos = "Destino é obrigatório.";
    }

    // Meses
    if (form.meses_selecionados.length === 0) newErrors.meses_selecionados = "Selecione pelo menos um mês.";

    // Período
    if (!form.tipo_periodo) newErrors.tipo_periodo = "Selecione um período.";
    if (form.tipo_periodo === "Dia Específico" && !form.dia_especifico) {
      newErrors.dia_especifico = "Selecione um dia específico.";
    }
    if (form.tipo_periodo === "Semanal" && form.dias_semana.length === 0) {
      newErrors.dias_semana = "Selecione pelo menos um dia da semana.";
    }

    // Noites
    if (!form.noites_min || form.noites_min < 1) newErrors.noites_min = "Mínimo de noites deve ser pelo menos 1.";
    if (!form.noites_max || form.noites_max < form.noites_min) {
      newErrors.noites_max = "Máximo de noites deve ser igual ou maior que o mínimo.";
    }

    // Apartamento, Adultos, Crianças e Bebês
    if (form.apartamento < 1 || form.apartamento > 4) newErrors.apartamento = "Escolha entre 1 e 4 apartamentos.";
    if (form.adultos < 1 || form.adultos > 9) newErrors.adultos = "Escolha entre 1 e 9 adultos.";

    // Validação de crianças e idades
    if (form.criancas > 5) newErrors.criancas = "Máximo de 5 crianças.";
    form.idades_criancas?.forEach((idade, i) => {
      if (idade < 2 || idade > 17) newErrors[`idade_crianca_${i}`] = "Idade da criança deve ser entre 2 e 17 anos.";
    });

    // Validação de bebês e idades
    if (form.bebes > 5) newErrors.bebes = "Máximo de 5 bebês.";
    form.idades_bebes?.forEach((idade, i) => {
      if (idade !== 0 && idade !== 1) newErrors[`idade_bebe_${i}`] = "Idade do bebê deve ser 0 ou 1 ano.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CORREÇÃO: Substituindo localStorage pela chamada da API igual ao componente antigo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Pegando o token do localStorage igual ao componente antigo
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Sessão expirada, faça login novamente.");
      return;
    }

    try {
      form.apartamento = (typeof form.apartamento === 'number' && form.apartamento >= 1) ? form.apartamento : 1;
      form.bebes = (typeof form.bebes === 'number' && form.bebes >= 0) ? form.bebes : 0;
      form.adultos = (typeof form.adultos === 'number' && form.adultos >= 1) ? form.adultos : 2;
      // Usando apiFetch igual ao componente antigo
      await apiFetch("http://localhost:5000/api/pesquisas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Token aplicado corretamente
        },
        body: JSON.stringify(form),
      });

      alert("Pesquisa salva com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar pesquisa:", error);
      alert(error.message || "Erro ao enviar pesquisa");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* Seção de Informações do Cliente */}
      <Card
        elevation={2}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" color="primary.dark" gutterBottom>
            Informações do Cliente
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Cliente"
                value={form.cliente_nome}
                onChange={(e) => setForm({ ...form, cliente_nome: e.target.value })}
                error={!!errors.cliente_nome}
                helperText={errors.cliente_nome}
                variant="outlined"
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '100%', md: '600px' }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Seção de Localização */}
      <Card
        elevation={2}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" color="primary.dark" gutterBottom>
            Localização
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box mb={3} sx={{ width: '100%' }}>
            <CamposDinamicos form={form} setForm={setForm} field="origens" label="Saindo de" />
            {errors.origens && (
              <FormHelperText error>{errors.origens}</FormHelperText>
            )}
          </Box>

          <Box sx={{ width: '100%' }}>
            <CamposDinamicos form={form} setForm={setForm} field="destinos" label="Destino" />
            {errors.destinos && (
              <FormHelperText error>{errors.destinos}</FormHelperText>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Seção de Período */}
      <Card
        elevation={2}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" color="primary.dark" gutterBottom>
            Período
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box mb={3} sx={{ width: '100%' }}>
            <MesesSelecao form={form} setForm={setForm} />
            {errors.meses_selecionados && (
              <FormHelperText error>{errors.meses_selecionados}</FormHelperText>
            )}
          </Box>

          <Box sx={{ width: '100%' }}>
            <PeriodoPesquisa form={form} setForm={setForm} />
            {errors.tipo_periodo && (
              <FormHelperText error>{errors.tipo_periodo}</FormHelperText>
            )}
            {errors.dia_especifico && (
              <FormHelperText error>{errors.dia_especifico}</FormHelperText>
            )}
            {errors.dias_semana && (
              <FormHelperText error>{errors.dias_semana}</FormHelperText>
            )}
            {errors.noites_min && (
              <FormHelperText error>{errors.noites_min}</FormHelperText>
            )}
            {errors.noites_max && (
              <FormHelperText error>{errors.noites_max}</FormHelperText>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Seção de Hospedagem */}
      <Card
        elevation={2}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" color="primary.dark" gutterBottom>
            Hospedagem
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ width: '100%' }}>
            <HospedagemSelecao form={form} setForm={setForm} />
            {errors.apartamento && (
              <FormHelperText error>{errors.apartamento}</FormHelperText>
            )}
            {errors.adultos && (
              <FormHelperText error>{errors.adultos}</FormHelperText>
            )}
            {errors.criancas && (
              <FormHelperText error>{errors.criancas}</FormHelperText>
            )}
            {errors.bebes && (
              <FormHelperText error>{errors.bebes}</FormHelperText>
            )}
            {form.idades_criancas?.map((_, i) =>
              errors[`idade_crianca_${i}`] && (
                <FormHelperText key={i} error>{errors[`idade_crianca_${i}`]}</FormHelperText>
              )
            )}
            {form.idades_bebes?.map((_, i) =>
              errors[`idade_bebe_${i}`] && (
                <FormHelperText key={i} error>{errors[`idade_bebe_${i}`]}</FormHelperText>
              )
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Botão de Pesquisar */}
      <Box display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 1
          }}
        >
          Pesquisar
        </Button>
      </Box>
    </Box>
  );
}

export default FormPesquisa;