import React, { useState } from 'react';
import CamposDinamicos from './CamposDinamicos';
import MesesSelecao from './MesesSelecao';
import PeriodoPesquisa from './PeriodoPesquisa';
import HospedagemSelecao from './HospedagemSelecao';
import styles from './styles';

function FormularioPesquisa() {
  const [form, setForm] = useState({
    cliente_nome: '',
    origens: [{ id: '', nome: '' }],
    destinos: [{ id: '', nome: '', hotel: '', hotel_por_preco: true }],
    meses_selecionados: [],
    tipo_periodo: '',
    dia_especifico: '',
    dias_semana: [],
    noites_min: '',
    noites_max: '',
    apartamento: 1,
    adultos: 2,
    criancas: 0,
    idades_criancas: [],
    bebes: 0,
    idades_bebes: [],
    tipo_voo: "Mais Barato",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Nome do cliente
    if (!form.cliente_nome.trim()) newErrors.cliente_nome = "Nome do cliente é obrigatório.";

    // Origem e Destino
    if (!form.origens || form.origens.length === 0 || !form.origens[0].nome.trim()) {
      newErrors.origens = "Origem é obrigatória.";
    }
    if (!form.destinos || form.destinos.length === 0 || !form.destinos[0].nome.trim()) {
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
    form.idades_criancas.forEach((idade, i) => {
      if (idade < 2 || idade > 17) newErrors[`idade_crianca_${i}`] = "Idade da criança deve ser entre 2 e 17 anos.";
    });

    // Validação de bebês e idades
    if (form.bebes > 5) newErrors.bebes = "Máximo de 5 bebês.";
    form.idades_bebes.forEach((idade, i) => {
      if (idade !== 0 && idade !== 1) newErrors[`idade_bebe_${i}`] = "Idade do bebê deve ser 0 ou 1 ano.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Sessão expirada, faça login novamente.");
        return;
      }

      try {
        // Simulando um delay para parecer uma chamada de API real
        setTimeout(() => {
          // Salvando localmente para simular persistência
          const pesquisasSalvas = JSON.parse(localStorage.getItem("pesquisasSalvas") || "[]");
          const novaPesquisa = {
            id: Date.now(), // Usando timestamp como ID único
            ...form,
            status: "pendente",
            data_criacao: new Date().toISOString()
          };
          
          pesquisasSalvas.push(novaPesquisa);
          localStorage.setItem("pesquisasSalvas", JSON.stringify(pesquisasSalvas));
          
          alert("Pesquisa salva com sucesso!");
        }, 1500);
      } catch (error) {
        console.error("Erro ao enviar pesquisa:", error);
        alert("Erro ao processar a pesquisa. Tente novamente.");
      }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Pesquisa de Pacotes de Viagem</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Nome do Cliente</label>
            <input
              type="text"
              name="cliente_nome"
              value={form.cliente_nome}
              onChange={(e) => setForm({ ...form, cliente_nome: e.target.value })}
              style={{ ...styles.input, height: '40px', minHeight: '40px' }}
            />
            {errors.cliente_nome && <span style={styles.error}>{errors.cliente_nome}</span>}
          </div>

          <CamposDinamicos form={form} setForm={setForm} field="origens" label="Saindo de" />
          {errors.origens && <span style={styles.error}>{errors.origens}</span>}

          <CamposDinamicos form={form} setForm={setForm} field="destinos" label="Destino" />
          {errors.destinos && <span style={styles.error}>{errors.destinos}</span>}

          <MesesSelecao form={form} setForm={setForm} />
          {errors.meses_selecionados && <span style={styles.error}>{errors.meses_selecionados}</span>}

          <PeriodoPesquisa form={form} setForm={setForm} />
          {errors.tipo_periodo && <span style={styles.error}>{errors.tipo_periodo}</span>}
          {errors.dia_especifico && <span style={styles.error}>{errors.dia_especifico}</span>}
          {errors.dias_semana && <span style={styles.error}>{errors.dias_semana}</span>}
          {errors.noites_min && <span style={styles.error}>{errors.noites_min}</span>}
          {errors.noites_max && <span style={styles.error}>{errors.noites_max}</span>}

          <HospedagemSelecao form={form} setForm={setForm} />
          {errors.apartamento && <span style={styles.error}>{errors.apartamento}</span>}
          {errors.adultos && <span style={styles.error}>{errors.adultos}</span>}
          {errors.criancas && <span style={styles.error}>{errors.criancas}</span>}
          {errors.bebes && <span style={styles.error}>{errors.bebes}</span>}
          {form.idades_criancas.map((_, i) => errors[`idade_crianca_${i}`] && <span key={i} style={styles.error}>{errors[`idade_crianca_${i}`]}</span>)}
          {form.idades_bebes.map((_, i) => errors[`idade_bebe_${i}`] && <span key={i} style={styles.error}>{errors[`idade_bebe_${i}`]}</span>)}

          <button type="submit" style={styles.button}>
            Pesquisar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioPesquisa;
