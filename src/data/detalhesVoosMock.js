// Dados mockados para detalhes do voo (ida e volta)
const detalhesVoosMock = {
  1: {
    // Informações do pacote
    origem: 'São Paulo',
    destino: 'Rio de Janeiro',
    data_ida: '15/06/2025',
    data_volta: '20/06/2025',
    
    // Informações do voo de ida
    ida: {
      companhia: 'LATAM',
      numero_voo: 'LA3478',
      tipo_aviao: 'Airbus A320',
      classe: 'Econômica',
      partida_data: '15/06/2025',
      partida_hora: '08:30',
      partida_aeroporto: 'GRU - Guarulhos',
      chegada_data: '15/06/2025',
      chegada_hora: '09:35',
      chegada_aeroporto: 'SDU - Santos Dumont',
    },
    
    // Informações do voo de volta
    volta: {
      companhia: 'LATAM',
      numero_voo: 'LA3479',
      tipo_aviao: 'Airbus A320',
      classe: 'Econômica',
      partida_data: '20/06/2025',
      partida_hora: '18:45',
      partida_aeroporto: 'SDU - Santos Dumont',
      chegada_data: '20/06/2025',
      chegada_hora: '19:50',
      chegada_aeroporto: 'GRU - Guarulhos',
    },
    
    // Informações adicionais
    criado_em: '10/05/2025',
    id_execucao: 'EX-2025-0001'
  },
  2: {
    // Informações do pacote
    origem: 'São Paulo',
    destino: 'Miami',
    data_ida: '22/06/2025',
    data_volta: '30/06/2025',
    
    // Informações do voo de ida
    ida: {
      companhia: 'American Airlines',
      numero_voo: 'AA8723',
      tipo_aviao: 'Boeing 777',
      classe: 'Econômica Premium',
      partida_data: '22/06/2025',
      partida_hora: '22:15',
      partida_aeroporto: 'GRU - Guarulhos',
      chegada_data: '23/06/2025',
      chegada_hora: '06:00',
      chegada_aeroporto: 'MIA - Miami International',
    },
    
    // Informações do voo de volta
    volta: {
      companhia: 'American Airlines',
      numero_voo: 'AA8724',
      tipo_aviao: 'Boeing 777',
      classe: 'Econômica Premium',
      partida_data: '30/06/2025',
      partida_hora: '20:30',
      partida_aeroporto: 'MIA - Miami International',
      chegada_data: '01/07/2025',
      chegada_hora: '07:45',
      chegada_aeroporto: 'GRU - Guarulhos',
    },
    
    // Informações adicionais
    criado_em: '12/05/2025',
    id_execucao: 'EX-2025-0002'
  },
  3: {
    // Informações do pacote
    origem: 'Rio de Janeiro',
    destino: 'Lisboa',
    data_ida: '10/07/2025',
    data_volta: '20/07/2025',
    
    // Informações do voo de ida
    ida: {
      companhia: 'TAP',
      numero_voo: 'TP1234',
      tipo_aviao: 'Airbus A330',
      classe: 'Econômica',
      partida_data: '10/07/2025',
      partida_hora: '23:45',
      partida_aeroporto: 'GIG - Galeão',
      chegada_data: '11/07/2025',
      chegada_hora: '09:15',
      chegada_aeroporto: 'LIS - Humberto Delgado',
    },
    
    // Informações do voo de volta
    volta: {
      companhia: 'TAP',
      numero_voo: 'TP1235',
      tipo_aviao: 'Airbus A330',
      classe: 'Econômica',
      partida_data: '20/07/2025',
      partida_hora: '14:30',
      partida_aeroporto: 'LIS - Humberto Delgado',
      chegada_data: '20/07/2025',
      chegada_hora: '21:50',
      chegada_aeroporto: 'GIG - Galeão',
    },
    
    // Informações adicionais
    criado_em: '15/05/2025',
    id_execucao: 'EX-2025-0003'
  },
  4: {
    // Informações do pacote
    origem: 'Brasília',
    destino: 'Paris',
    data_ida: '05/08/2025',
    data_volta: '15/08/2025',
    
    // Informações do voo de ida
    ida: {
      companhia: 'Air France',
      numero_voo: 'AF459',
      tipo_aviao: 'Boeing 787',
      classe: 'Econômica Premium',
      partida_data: '05/08/2025',
      partida_hora: '21:30',
      partida_aeroporto: 'BSB - Juscelino Kubitschek',
      chegada_data: '06/08/2025',
      chegada_hora: '09:45',
      chegada_aeroporto: 'CDG - Charles de Gaulle',
    },
    
    // Informações do voo de volta
    volta: {
      companhia: 'Air France',
      numero_voo: 'AF458',
      tipo_aviao: 'Boeing 787',
      classe: 'Econômica Premium',
      partida_data: '15/08/2025',
      partida_hora: '15:20',
      partida_aeroporto: 'CDG - Charles de Gaulle',
      chegada_data: '16/08/2025',
      chegada_hora: '02:35',
      chegada_aeroporto: 'BSB - Juscelino Kubitschek',
    },
    
    // Informações adicionais
    criado_em: '18/05/2025',
    id_execucao: 'EX-2025-0004'
  },
  5: {
    // Informações do pacote
    origem: 'São Paulo',
    destino: 'Orlando',
    data_ida: '12/09/2025',
    data_volta: '22/09/2025',
    
    // Informações do voo de ida
    ida: {
      companhia: 'GOL',
      numero_voo: 'G35678',
      tipo_aviao: 'Boeing 737',
      classe: 'Econômica',
      partida_data: '12/09/2025',
      partida_hora: '09:45',
      partida_aeroporto: 'GRU - Guarulhos',
      chegada_data: '12/09/2025',
      chegada_hora: '17:30',
      chegada_aeroporto: 'MCO - Orlando International',
    },
    
    // Informações do voo de volta
    volta: {
      companhia: 'GOL',
      numero_voo: 'G35679',
      tipo_aviao: 'Boeing 737',
      classe: 'Econômica',
      partida_data: '22/09/2025',
      partida_hora: '19:15',
      partida_aeroporto: 'MCO - Orlando International',
      chegada_data: '23/09/2025',
      chegada_hora: '05:30',
      chegada_aeroporto: 'GRU - Guarulhos',
    },
    
    // Informações adicionais
    criado_em: '20/05/2025',
    id_execucao: 'EX-2025-0005'
  }
};

export default detalhesVoosMock;
