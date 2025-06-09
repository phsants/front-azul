import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
// Importação correta do jsPDF com autoTable
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Importar serviço de hotéis com API real
import { fetchDetalhesVoo, extrairValorNumerico } from '../services/hoteisService';
import ModalDetalhesVoo from './ModalDetalhesVoo';

// Componente de Tabela de Ofertas
const OfertasTable = ({ ofertas, loading = false, filtros = {} }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detalhesAberto, setDetalhesAberto] = useState(false);
  const [ofertaSelecionada, setOfertaSelecionada] = useState(null);
  const [detalhesVoo, setDetalhesVoo] = useState(null);
  const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
  const [ordenacao, setOrdenacao] = useState({
    campo: 'preco_total_pacote',
    direcao: 'asc'
  });

  const filtrarOfertas = (ofertas) => ofertas;
  // Função para filtrar as ofertas
  /*
  const filtrarOfertas = (ofertas) => {
    return ofertas.filter(oferta => {
      // Filtro por origem (múltipla seleção)
      if (filtros.origem && Array.isArray(filtros.origem) && filtros.origem.length > 0) {
        if (!filtros.origem.includes(oferta.origem)) {
          return false;
        }
      }

      // Filtro por destino (múltipla seleção)
      if (filtros.destino && Array.isArray(filtros.destino) && filtros.destino.length > 0) {
        if (!filtros.destino.includes(oferta.destino)) {
          return false;
        }
      }

      // Filtro por nome do hotel (múltipla seleção)
      if (filtros.nomeHotel && Array.isArray(filtros.nomeHotel) && filtros.nomeHotel.length > 0) {
        if (!filtros.nomeHotel.some(nome => oferta.nome_hotel.includes(nome))) {
          return false;
        }
      }

      // Filtro por faixa de preço
      if (filtros.faixaPreco && filtros.faixaPreco.length === 2) {
        // Usar o campo preco_total_numerico se disponível, ou extrair o valor
        const precoOferta = oferta.preco_total_numerico !== undefined
          ? oferta.preco_total_numerico
          : extrairValorNumerico(oferta.preco_total_pacote);

        if (precoOferta < filtros.faixaPreco[0] || precoOferta > filtros.faixaPreco[1]) {
          return false;
        }
      }

      // Filtro por data de pesquisa
      if (filtros.dataInicio || filtros.dataFim) {
        const dataOferta = new Date(oferta.data_pesquisa.split('/').reverse().join('-'));

        if (filtros.dataInicio) {
          const dataInicio = new Date(filtros.dataInicio.split('/').reverse().join('-'));
          if (dataOferta < dataInicio) {
            return false;
          }
        }

        if (filtros.dataFim) {
          const dataFim = new Date(filtros.dataFim.split('/').reverse().join('-'));
          if (dataOferta > dataFim) {
            return false;
          }
        }
      }

      return true;
    });
  };
  */
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleVerDetalhes = async (oferta) => {
    setOfertaSelecionada(oferta);
    setCarregandoDetalhes(true);
    setDetalhesAberto(true);
    
    try {
      // Buscar detalhes do voo usando o id_execucao
      const detalhes = await fetchDetalhesVoo(oferta.id_execucao);
      console.log('Detalhes do voo recebidos:', detalhes);
      setDetalhesVoo(detalhes);
    } catch (error) {
      console.error('Erro ao buscar detalhes do voo:', error);
      setDetalhesVoo(null);
    } finally {
      setCarregandoDetalhes(false);
    }
  };
  
  const handleFecharDetalhes = () => {
    setDetalhesAberto(false);
    setOfertaSelecionada(null);
    setDetalhesVoo(null);
  };
  
  // Função para exportar dados para Excel
  const handleExportarExcel = () => {
    // Preparar os dados para exportação
    const dadosParaExportar = ofertasOrdenadasFiltradas.map(oferta => ({
      'Origem': oferta.origem,
      'Destino': oferta.destino,
      'Data Ida': oferta.data_ida,
      'Data Volta': oferta.data_volta,
      'Nome do Hotel': oferta.nome_hotel,
      'Tipo de Quarto': oferta.tipo_quarto,
      'Refeição': oferta.refeicao || 'Não informado',
      'Preço por Pessoa': oferta.preco_por_pessoa,
      'Preço Total do Pacote': oferta.preco_total_pacote,
      'Data da Pesquisa': oferta.data_pesquisa
    }));
    
    // Criar uma nova planilha
    const ws = XLSX.utils.json_to_sheet(dadosParaExportar);
    
    // Criar um novo livro e adicionar a planilha
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ofertas');
    
    // Gerar o arquivo e fazer o download
    XLSX.writeFile(wb, 'ofertas_viagens.xlsx');
  };
  
  // Função para exportar dados para PDF
  const handleExportarPDF = () => {
    // Criar uma nova instância de PDF
    const doc = new jsPDF();
    
    // Adicionar título ao PDF
    doc.setFontSize(16);
    doc.text('Relatório de Ofertas de Viagens', 14, 15);
    
    // Adicionar data de geração
    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 22);
    
    // Preparar os dados para a tabela
    const dadosTabela = ofertasOrdenadasFiltradas.map(oferta => [
      oferta.origem,
      oferta.destino,
      oferta.data_ida,
      oferta.data_volta,
      oferta.nome_hotel,
      oferta.tipo_quarto,
      oferta.refeicao || 'Não informado',
      oferta.preco_por_pessoa,
      oferta.preco_total_pacote,
      oferta.data_pesquisa
    ]);
    
    // Definir cabeçalhos da tabela
    const cabecalhos = [
      'Origem', 
      'Destino', 
      'Data Ida', 
      'Data Volta', 
      'Nome do Hotel', 
      'Tipo Quarto', 
      'Refeição', 
      'Preço p/ Pessoa', 
      'Preço Total', 
      'Data Pesquisa'
    ];
    
    // Gerar a tabela automática usando o plugin importado
    autoTable(doc, {
      head: [cabecalhos],
      body: dadosTabela,
      startY: 30,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 1 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 30 }
    });
    
    // Adicionar rodapé
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }
    
    // Salvar o PDF
    doc.save('ofertas_viagens.pdf');
  };
  
  // Função para ordenar as ofertas
  const ordenarOfertas = (ofertas, campo, direcao) => {
    return [...ofertas].sort((a, b) => {
      if (campo === 'preco_total_pacote') {
        // Usar o campo preco_total_numerico se disponível, ou extrair o valor
        const precoA = a.preco_total_numerico !== undefined 
          ? a.preco_total_numerico 
          : extrairValorNumerico(a.preco_total_pacote);
          
        const precoB = b.preco_total_numerico !== undefined 
          ? b.preco_total_numerico 
          : extrairValorNumerico(b.preco_total_pacote);
        
        return direcao === 'asc' ? precoA - precoB : precoB - precoA;
      }
      
      // Para outros campos, ordenação padrão
      if (a[campo] < b[campo]) return direcao === 'asc' ? -1 : 1;
      if (a[campo] > b[campo]) return direcao === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  // Alternar ordenação ao clicar no cabeçalho
  const handleRequestSort = (campo) => {
    const isAsc = ordenacao.campo === campo && ordenacao.direcao === 'asc';
    setOrdenacao({
      campo: campo,
      direcao: isAsc ? 'desc' : 'asc'
    });
    setPage(0); // Voltar para a primeira página ao ordenar
  };
  
  // Filtrar as ofertas
  const ofertasFiltradas = filtrarOfertas(ofertas);
  
  // Ordenar as ofertas filtradas
  const ofertasOrdenadasFiltradas = ordenarOfertas(
    ofertasFiltradas, 
    ordenacao.campo, 
    ordenacao.direcao
  );
  
  // Paginar as ofertas
  const ofertasPaginadas = ofertasOrdenadasFiltradas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  return (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Melhores Ofertas Encontradas</Typography>
          <Box display="flex" alignItems="center">
            <Button 
              size="small" 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              sx={{ mr: 1 }}
              onClick={handleExportarExcel}
            >
              Exportar Excel
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              startIcon={<PdfIcon />}
              sx={{ mr: 1 }}
              onClick={handleExportarPDF}
            >
              Exportar PDF
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              startIcon={<RefreshIcon />}
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      </Box>
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }}>
            <Table stickyHeader aria-label="tabela de ofertas">
              <TableHead>
                <TableRow>
                  <TableCell>Origem</TableCell>
                  <TableCell>Destino</TableCell>
                  <TableCell>Data Ida</TableCell>
                  <TableCell>Data Volta</TableCell>
                  <TableCell>Hotel</TableCell>
                  <TableCell>Tipo Quarto</TableCell>
                  <TableCell>Refeição</TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={ordenacao.campo === 'preco_total_pacote'}
                      direction={ordenacao.direcao}
                      onClick={() => handleRequestSort('preco_total_pacote')}
                      IconComponent={ordenacao.direcao === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                    >
                      Preço Total
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">Preço por Pessoa</TableCell>
                  <TableCell align="center">Data Pesquisa</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ofertasPaginadas.map((oferta) => (
                  <TableRow 
                    key={oferta.id} 
                    hover
                    sx={{ 
                      '&:hover': { bgcolor: 'action.hover' },
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <TableCell>{oferta.origem}</TableCell>
                    <TableCell>{oferta.destino}</TableCell>
                    <TableCell>{oferta.data_ida}</TableCell>
                    <TableCell>{oferta.data_volta}</TableCell>
                    <TableCell>
                      <Tooltip title={oferta.nome_hotel}>
                        <span>{oferta.nome_hotel}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{oferta.tipo_quarto}</TableCell>
                    <TableCell>{oferta.refeicao || 'Não informado'}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>{oferta.preco_total_pacote}</TableCell>
                    <TableCell align="right">{oferta.preco_por_pessoa}</TableCell>
                    <TableCell align="center">{oferta.data_pesquisa}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => handleVerDetalhes(oferta)}
                        startIcon={<InfoIcon />}
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ofertasFiltradas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </>
      )}
      
      {/* Modal para exibir detalhes do voo */}
      <ModalDetalhesVoo
        open={detalhesAberto}
        onClose={handleFecharDetalhes}
        oferta={ofertaSelecionada}
        detalhesVoo={detalhesVoo}
        loading={carregandoDetalhes}
      />
    </Card>
  );
};

export default OfertasTable;
