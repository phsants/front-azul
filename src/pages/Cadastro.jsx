import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress,
  Alert,
  Snackbar,
  Grid,
  useTheme,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  PersonAdd as PersonAddIcon,
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

function Cadastro() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleCadastro = async () => {
    setLoading(true); // Mostra spinner
    
    // Simulando um delay para parecer uma chamada de API real
    setTimeout(() => {
      try {
        // Validação básica
        if (!usuario || !senha) {
          setToast({ message: "Preencha todos os campos", type: "error", visible: true });
          setLoading(false);
          return;
        }
        
        if (senha.length < 6) {
          setToast({ message: "A senha deve ter pelo menos 6 caracteres", type: "error", visible: true });
          setLoading(false);
          return;
        }
        
        // Simulando sucesso no cadastro
        localStorage.setItem("cadastroRealizado", "true");
        
        setToast({ message: "Cadastro realizado com sucesso!", type: "success", visible: true });

        // Espera 2s antes de navegar
        setTimeout(() => {
          setToast({ message: '', type: 'success', visible: false });
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        setToast({ message: "Erro ao processar o cadastro", type: "error", visible: true });
      } finally {
        setLoading(false); // Oculta spinner
      }
    }, 1500); // Delay simulado de 1.5 segundos
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        py: 4,
        background: 'linear-gradient(135deg, rgba(240,249,255,1) 0%, rgba(255,255,255,1) 100%)'
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
            overflow: 'hidden'
          }}
        >
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 2,
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: 6
              },
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" color="primary.dark" gutterBottom>
                Cadastro
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Crie sua conta para acessar o sistema
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="seu.email@exemplo.com"
                  variant="outlined"
                  margin="normal"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Senha"
                  placeholder="Mínimo 6 caracteres"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              
              <Box mt={4} display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                  onClick={handleCadastro}
                  disabled={loading}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    }
                  }}
                >
                  {loading ? 'Cadastrando...' : 'Criar Conta'}
                </Button>
                
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/login")}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Voltar para Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Container>
      
      {/* Toast notification */}
      <Snackbar
        open={toast.visible}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, visible: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setToast({ ...toast, visible: false })} 
          severity={toast.type} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Cadastro;
