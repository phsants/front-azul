import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme
} from "@mui/material";
import FormPesquisa from "../components/FormPesquisa";

function PesquisaViagem() {
  const [form, setForm] = React.useState({
    cliente_nome: "",
    adultos: 2,
    criancas: 0,
    idadesCriancas: [],
    origens: [""],
    destinos: [""],
    meses_selecionados: [],
    conexao: "direto",
    qtdConexoes: 0,
    preferenciaVoo: "rapido",
  });
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      py: 4
    }}>
      <Container maxWidth="xl">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light'
          }}
        >
          <Typography variant="h4" color="primary.dark" gutterBottom>
            Pesquisa de Viagem
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Preencha os dados abaixo para realizar uma nova pesquisa de viagem
          </Typography>
          
          <Box mt={4}>
            <FormPesquisa form={form} setForm={setForm} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default PesquisaViagem;
