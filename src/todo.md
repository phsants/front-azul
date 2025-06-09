# Tarefas do Projeto

## Refatoração Visual da Tela de Pesquisa

### Remoção de Elementos Visuais Obsoletos
- [x] Remover imagem de fundo e estilização inline
  - [x] Excluir background estático (imagens de praia/cidade)
  - [x] Remover elementos com estilos inline (background-image, rgba, etc.)
  - [x] Limpar código CSS desnecessário

### Padronização Visual com Dashboard/Agendamentos
- [x] Substituir container antigo pelo padrão atual
  - [x] Utilizar estrutura de container visual do Material UI
  - [x] Aplicar paddings, espaçamentos e sombras consistentes
  - [x] Implementar tipografia padronizada

### Reorganização dos Campos em Grupos Lógicos
- [x] Extrair formulário para componente dedicado (FormPesquisa.jsx)
  - [x] Manter todos os campos funcionais existentes
  - [x] Agrupar campos em seções semânticas (Informações do Cliente, Localização, Período, Hospedagem)
  - [x] Adicionar títulos e separadores visuais entre seções

### Implementação de Layout Responsivo
- [x] Aplicar layout com grid fluido e responsivo
  - [x] Utilizar Grid do Material UI para organização dos campos
  - [x] Garantir adaptação para diferentes tamanhos de tela
  - [x] Manter espaçamento uniforme entre elementos

### Estilização de Componentes
- [x] Padronizar cards com bordas arredondadas e sombras
  - [x] Aplicar elevation=2 e borderRadius=2 nos cards
  - [x] Utilizar espaçamento interno p=3 consistente
  - [x] Adicionar margens mb=4 entre seções

- [x] Padronizar botões e campos de entrada
  - [x] Estilizar botão "Pesquisar" conforme padrão global
  - [x] Converter inputs para TextField do Material UI
  - [x] Implementar tratamento visual de erros consistente

## Ajustes Finais de Layout, Acesso e Mock de Autenticação

### Remoção de Elementos Redundantes da Interface
- [x] Remover botão de alternância de modo escuro do canto inferior esquerdo da Sidebar
  - [x] Eliminar completamente o componente de modo escuro da Sidebar
  - [x] Manter apenas o controle no menu do avatar do usuário
- [x] Remover botão "Sair" do canto inferior esquerdo da Sidebar
  - [x] Eliminar completamente o componente de logout da Sidebar
  - [x] Manter apenas a opção no menu do avatar do usuário

### Implementação de Autenticação Mockada
- [x] Atualizar página de Login para aceitar credenciais mockadas
  - [x] Adicionar suporte para login com admin@teste.com / 123456
  - [x] Manter compatibilidade com credenciais existentes (admin/123456)
  - [x] Melhorar interface visual do formulário de login
  - [x] Adicionar instruções claras sobre credenciais de teste

### Liberação de Acesso às Páginas Protegidas
- [x] Remover bloqueios de autenticação da página de Pesquisas
  - [x] Eliminar verificação de token no useEffect
  - [x] Remover redirecionamento para /login
- [x] Remover bloqueios de autenticação da página de Agendamentos
  - [x] Eliminar verificação de token no carregamento de dados
  - [x] Eliminar verificação de token nas ações de edição
  - [x] Eliminar verificação de token nas ações de exclusão
  - [x] Remover redirecionamento para /login
- [x] Inicializar componentes com dados mockados diretamente
  - [x] Eliminar carregamento assíncrono desnecessário
  - [x] Manter simulação de delay apenas para feedback visual

### Padronização Visual das Telas
- [x] Refatorar visualmente a tela de Pesquisas
  - [x] Manter todas as funcionalidades existentes
  - [x] Aplicar estilo visual consistente com o Dashboard
  - [x] Utilizar Paper, Card, Typography e outros componentes do MUI
  - [x] Ajustar espaçamentos e margens para melhor legibilidade

- [x] Refatorar visualmente a tela de Agendamentos
  - [x] Manter todas as funcionalidades existentes
  - [x] Aplicar estilo visual consistente com o Dashboard
  - [x] Converter Paper para Card nos itens de agendamento
  - [x] Melhorar visualização de status com cores e badges
  - [x] Ajustar espaçamentos e margens para melhor legibilidade

### Ajustes no Layout do Cabeçalho (Área do ADM)
- [x] Corrigir sobreposição entre botão de logout e nome do administrador
  - [x] Mover o ícone de usuário (avatar) para o canto superior direito
  - [x] Remover o botão "Sair" isolado do cabeçalho

- [x] Implementar menu dropdown no ícone de usuário
  - [x] Exibir nome do usuário (ADM) no topo do menu
  - [x] Adicionar opção de Logout
  - [x] Adicionar alternância de modo escuro (toggle)
  - [x] Incluir espaço reservado para "Configurações" (desabilitado)
  - [x] Adicionar ícones para cada opção do menu

## Refatoração Funcional e Visual da Tela de Pesquisa

### Remoção de Duplicidade na Seção Hospedagem
- [x] Eliminar título duplicado "Hospedagem" (h3 redundante)
  - [x] Manter apenas o Typography variant="h6" do Material UI
  - [x] Garantir hierarquia visual consistente

### Correção de Campos Não Funcionais
- [x] Corrigir campo "Período da Pesquisa"
  - [x] Resolver erro ao selecionar opção "Semanal"
  - [x] Garantir inicialização correta do estado
  - [x] Implementar validação de dados

- [x] Corrigir campos "Crianças" e "Bebês"
  - [x] Garantir vinculação correta ao estado do formulário
  - [x] Implementar fallback para valores undefined
  - [x] Corrigir atualização de idades ao alterar quantidade

### Uniformização Visual com Agendamentos
- [x] Padronizar todos os campos de entrada
  - [x] Converter inputs HTML para TextField do Material UI
  - [x] Aplicar variant="outlined" em todos os campos
  - [x] Implementar labels flutuantes consistentes

- [x] Padronizar selects e checkboxes
  - [x] Converter selects HTML para Select do Material UI
  - [x] Converter checkboxes HTML para Checkbox do Material UI
  - [x] Implementar FormControl e InputLabel para todos os selects

- [x] Padronizar botões
  - [x] Aplicar variant="contained" e color="primary" no botão principal
  - [x] Aplicar variant="outlined" nos botões secundários
  - [x] Adicionar ícones consistentes nos botões de ação

### Adaptação para Funcionamento Offline/Mock
- [x] Remover dependências de API real
  - [x] Substituir chamadas de API por dados mockados
  - [x] Eliminar verificações de token e autenticação
  - [x] Garantir funcionamento sem backend

- [x] Implementar dados mockados para cidades
  - [x] Criar array de cidades brasileiras populares
  - [x] Adaptar componente para usar dados locais
  - [x] Manter estrutura de dados compatível com API futura

## Ajustes de Largura de Campos Críticos na Tela de Pesquisa

### Padronização Visual e Estrutural dos Campos
- [x] Padronizar altura e largura dos campos
  - [x] Aplicar altura uniforme de 56px para todos os campos
  - [x] Garantir minWidth: 300px para evitar campos estreitos
  - [x] Manter proporcionalidade entre "Saindo de", "Destino" e "Nome do Hotel"
  - [x] Utilizar InputProps e sx consistentes em todos os componentes

- [x] Alinhar checkbox "Selecionar pelo menor preço" horizontalmente
  - [x] Posicionar ao lado direito do campo "Nome do Hotel"
  - [x] Utilizar Grid container com xs={8} e xs={4} para divisão proporcional
  - [x] Evitar sobreposição de elementos em qualquer breakpoint

- [x] Configurar estado inicial correto
  - [x] Checkbox "Selecionar pelo menor preço" marcado por padrão
  - [x] Campo "Nome do Hotel" desabilitado ao carregar
  - [x] Limpeza automática do campo quando checkbox é marcado

- [x] Corrigir lógica condicional do checkbox
  - [x] Garantir funcionamento para todas as instâncias do formulário
  - [x] Forçar atualização do estado para todas as instâncias
  - [x] Remover texto de feedback visual conforme solicitado

- [x] Garantir responsividade em todos os breakpoints
  - [x] Empilhamento vertical em dispositivos móveis (xs)
  - [x] Layout horizontal em telas médias e grandes (md, lg)
  - [x] Espaçamento consistente entre elementos relacionados

### Reorganização dos Checkboxes de Dias da Semana
- [x] Substituir select único por checkboxes em 3 colunas
  - [x] Implementar Grid container com 3 colunas (xs={4})
  - [x] Aplicar minWidth adequado para facilitar clique e leitura
  - [x] Ajustar espaçamento entre checkboxes para melhor usabilidade

### Ajustes de Responsividade
- [x] Garantir empilhamento vertical em dispositivos móveis
  - [x] Aplicar breakpoints adequados (xs, sm, md)
  - [x] Ajustar paddings e espaçamentos para toque confortável
  - [x] Testar em diferentes tamanhos de tela

- [x] Manter consistência visual com o padrão do sistema
  - [x] Utilizar componentes do Material UI com props padronizadas
  - [x] Evitar repetição de estilos inline
  - [x] Consolidar estilos em temas centralizados

## Ajustes Finais no Dashboard de Viagens

### Implementação de Filtros Múltiplos
- [x] Atualizar filtros de Origem, Destino e Nome do Hotel para múltipla seleção
  - [x] Substituir Select por Autocomplete com multiple={true}
  - [x] Implementar chips removíveis para exibir seleções ativas
  - [x] Adaptar estado para armazenar arrays de valores
  - [x] Garantir integração com dados mockados

### Adição de Ordenação Interativa
- [x] Implementar ordenação na coluna "Preço Total do Pacote"
  - [x] Adicionar ícone de ordenação ao lado do título da coluna
  - [x] Permitir alternância entre ordenação crescente e decrescente
  - [x] Implementar lógica de ordenação para valores numéricos
  - [x] Garantir feedback visual da direção de ordenação ativa

### Ajustes de Reatividade e Integração
- [x] Garantir que múltiplas seleções filtrem resultados cumulativamente
  - [x] Adaptar função de filtragem para aceitar arrays
  - [x] Implementar lógica de filtragem com some() para cada campo
  - [x] Manter compatibilidade com filtros existentes

- [x] Integrar ordenação com filtros múltiplos
  - [x] Garantir que ordenação funcione após aplicação de filtros
  - [x] Manter estado de ordenação ao alterar filtros
  - [x] Voltar para primeira página ao ordenar

## Integração com API Real e Exportação de Dados

### Implementação de Exportação de Dados
- [x] Adicionar funcionalidade de exportação para Excel (.xlsx)
  - [x] Implementar botão dedicado "Exportar Excel" no Dashboard
  - [x] Utilizar biblioteca xlsx para geração de arquivos
  - [x] Garantir que todos os dados filtrados sejam exportados
  - [x] Incluir todos os campos relevantes no arquivo exportado

- [x] Adicionar funcionalidade de exportação para PDF
  - [x] Implementar botão dedicado "Exportar PDF" no Dashboard
  - [x] Utilizar bibliotecas jspdf e jspdf-autotable
  - [x] Criar layout formatado com título e data de geração
  - [x] Implementar paginação automática para grandes volumes de dados

### Integração com API Real
- [x] Configurar ambiente para consumo da API
  - [x] Criar arquivo .env com URL base da API
  - [x] Implementar serviço centralizado para chamadas à API
  - [x] Configurar interceptores para autenticação e tratamento de erros

- [x] Implementar serviço de ofertas com fallback
  - [x] Criar função fetchOfertas para consumir API real
  - [x] Mapear filtros do frontend para parâmetros da API
  - [x] Implementar fallback para dados mockados em caso de erro
  - [x] Formatar dados da API para o formato esperado pelo frontend

- [x] Integrar componentes com o serviço de ofertas
  - [x] Atualizar Dashboard para usar fetchOfertas
  - [x] Adaptar filtros para trabalhar com dados da API
  - [x] Garantir que ordenação e exportação funcionem com dados da API

### Documentação e Testes
- [x] Criar manual técnico de integração
  - [x] Documentar estrutura da API e endpoints
  - [x] Detalhar implementação da integração
  - [x] Incluir instruções para execução local da API
  - [x] Documentar testes e validação

- [x] Testar todos os fluxos integrados
  - [x] Validar exportação para Excel e PDF
  - [x] Testar filtros múltiplos com dados da API
  - [x] Verificar funcionamento do fallback para dados mockados
  - [x] Garantir que ordenação funcione corretamente

> "Ampliação visual de campos críticos na tela de Pesquisa (nome do cliente, origem, destino e filtros semanais) para melhorar legibilidade, acessibilidade e consistência visual com o restante do sistema."

> "Filtros múltiplos implementados + Ordenação por preço no Dashboard para melhorar a experiência de filtragem e análise de dados."

> "Integração com API real implementada com fallback para dados mockados + Exportação para Excel e PDF para facilitar análise e compartilhamento de dados."
