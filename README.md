# UseTravel - Dashboard de Viagens

Dashboard interativo para visualização e análise de ofertas de viagens, com filtros dinâmicos e detalhes de voos com múltiplos trechos.

## 📋 Funcionalidades

- **Dashboard Interativo**: Visualização de indicadores, gráficos e ofertas de viagens
- **Filtros Dinâmicos**: Filtros de múltipla seleção para origem, destino e nome do hotel
- **Ordenação**: Ordenação interativa por preço total (crescente/decrescente)
- **Detalhes de Voos**: Visualização detalhada de voos com múltiplos trechos e conexões
- **Exportação**: Exportação de dados para Excel e PDF

## 🚀 Tecnologias Utilizadas

- React.js
- Material UI
- Recharts (gráficos)
- Axios (requisições HTTP)
- jsPDF e XLSX (exportação de dados)

## ⚙️ Requisitos

- Node.js 16.x ou superior
- npm 8.x ou superior
- Navegador moderno (Chrome, Firefox, Edge)

## 🔧 Instalação e Execução

### No PyCharm:

1. Extraia o arquivo ZIP em uma pasta de sua preferência
2. Abra o PyCharm e selecione "Open" para abrir o projeto
3. Certifique-se de que o plugin Node.js está instalado no PyCharm
4. Abra o terminal integrado do PyCharm e execute:

```bash
npm install
npm run dev
```

5. O servidor de desenvolvimento será iniciado e o endereço local será exibido no terminal
6. Acesse o endereço local em seu navegador (geralmente http://localhost:5173)

### Em qualquer ambiente:

1. Extraia o arquivo ZIP em uma pasta de sua preferência
2. Abra um terminal na pasta do projeto
3. Execute os comandos:

```bash
npm install
npm run dev
```

4. O servidor de desenvolvimento será iniciado e o endereço local será exibido no terminal
5. Acesse o endereço local em seu navegador (geralmente http://localhost:5173)

## 🔍 Estrutura do Projeto

```
projeto/
├── public/             # Arquivos públicos
├── src/                # Código fonte
│   ├── components/     # Componentes React
│   ├── pages/          # Páginas da aplicação
│   ├── services/       # Serviços de API
│   └── utils/          # Utilitários
├── .env.example        # Exemplo de variáveis de ambiente
├── index.html          # HTML principal
├── package.json        # Dependências e scripts
└── vite.config.js      # Configuração do Vite
```

## 📊 Uso do Dashboard

### Filtros

- **Origem**: Selecione uma ou mais origens para filtrar as ofertas
- **Destino**: Selecione um ou mais destinos para filtrar as ofertas
- **Nome do Hotel**: Selecione um ou mais hotéis para filtrar as ofertas
- **Conexões**: Filtre por voos diretos ou com conexão
- **Faixa de Preço**: Defina um valor mínimo e máximo para filtrar as ofertas
- **Período**: Filtre por data de ida e volta

### Detalhes de Voos

- Clique no botão "Detalhes" em qualquer oferta para visualizar informações detalhadas
- Na tela de detalhes, você pode navegar entre:
  - Voo de Ida (com múltiplos trechos, se houver)
  - Voo de Volta (com múltiplos trechos, se houver)
  - Informações do Hotel
  - Detalhamento de Preços

## 🔄 Integração com API

O Dashboard consome dados das seguintes APIs:

- **API de Hotéis**: `https://428d-201-74-172-6.ngrok-free.app/api/hoteis`
- **API de Voos**: `https://428d-201-74-172-6.ngrok-free.app/api/voos/:id`

A comunicação com as APIs é feita através de acesso direto, sem uso de proxy.

## 📝 Notas Adicionais

- O projeto acessa diretamente as APIs sem uso de proxy ou intermediários
- Os filtros funcionam tanto via API quanto localmente para garantir precisão
- A ordenação por preço total é mantida ao aplicar novos filtros
- O modal de detalhes suporta múltiplos trechos e conexões em voos de ida e volta
