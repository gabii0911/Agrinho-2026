// Controle de Alternância de Abas
function switchTab(tabId) {
    // Esconde todos os blocos de abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove o status de ativo dos botões do menu
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ativa a aba e o botão selecionados
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// IA Agrícola Inteligente (Melhorado)
function perguntarIA() {
    const pergunta = document.getElementById("pergunta").value.toLowerCase();
    const resposta = document.getElementById("respostaIA");

    if (!pergunta.trim()) {
        resposta.innerHTML = "❌ Digite alguma dúvida para que eu possa analisar.";
        return;
    }

    if (pergunta.includes("soja")) {
        resposta.innerHTML = "🌱 <strong>Análise de IA:</strong> A soja apresenta alta liquidez e excelente adaptação no cerrado/sul brasileiro. Dica: Monitore atentamente o percevejo-marrom nas fases iniciais.";
    } else if (pergunta.includes("milho")) {
        resposta.innerHTML = "🌽 <strong>Análise de IA:</strong> O milho safrinha exige planejamento de janela climática. Cuidado com a cigarrinha-do-milho para evitar o complexo de enfezamentos.";
    } else if (pergunta.includes("café")) {
        resposta.innerHTML = "☕ <strong>Análise de IA:</strong> O café arábica performa melhor em altitudes elevadas e climas amenos. Atente-se ao controle da ferrugem em períodos úmidos.";
    } else {
        resposta.innerHTML = "🤖 <strong>Varredura Concluída:</strong> Não identifiquei uma cultura específica em sua pergunta. Experimente incluir as palavras-chave 'Soja', 'Milho' ou 'Café'.";
    }
}

// Simulador Estático de Safras
function simularFazenda() {
    const hectares = Number(document.getElementById("hectares").value);
    const cultura = document.getElementById("cultura").value;
    let lucro = 0;

    if (hectares <= 0) {
        document.getElementById("resultadoSimulacao").innerHTML = "❌ Erro: Insira um número válido de hectares.";
        return;
    }

    if (cultura === "Soja") lucro = hectares * 2500;
    if (cultura === "Milho") lucro = hectares * 1800;
    if (cultura === "Café") lucro = hectares * 3500;

    document.getElementById("resultadoSimulacao").innerHTML = `
        📈 <strong>Resultado Projetado:</strong><br>
        • Cultivo Selecionado: <b>${cultura}</b><br>
        • Extensão Avaliada: <b>${hectares} ha</b><br>
        • Retorno Financeiro Estimado: <strong style='color:#34d399;'>R$ ${lucro.toLocaleString("pt-BR")}</strong>
    `;
}

// Mecânicas Integradas da Fazenda Virtual (Jogo)
let fazenda = {
    nome: "",
    area: 0,
    cultura: "",
    tratores: 0,
    drones: 0,
    irrigacao: false,
    lucro: 0,
    criada: false
};

function atualizarPainel() {
    const painel = document.getElementById("painelFazenda");
    
    if (!fazenda.criada) {
        painel.innerHTML = "<p class='placeholder-text'>Crie sua fazenda para iniciar a telemetria do jogo.</p>";
        return;
    }

    painel.innerHTML = `
        🟢 <strong>Status Operacional da Propriedade</strong><br>
        🏭 <b>Fazenda:</b> ${fazenda.nome}<br>
        🗺️ <b>Área Territorial:</b> ${fazenda.area} hectares<br>
        🌾 <b>Cultura Ativa:</b> ${fazenda.cultura}<br>
        <hr style='border: 1px solid rgba(255,255,255,0.05); margin: 10px 0;'>
        🚜 <b>Tratores em Operação:</b> ${fazenda.tratores}<br>
        🛰️ <b>Drones de Varredura:</b> ${fazenda.drones}<br>
        💧 <b>Infraestrutura de Irrigação:</b> ${fazenda.irrigacao ? "<span style='color:#3b82f6;'>Ativada</span>" : "Nenhum Sistema Detectado"}<br>
        💰 <b>Balanço / Lucro Acumulado:</b> <span style='color:#34d399; font-weight:bold;'>R$ ${fazenda.lucro.toLocaleString("pt-BR")}</span>
    `;
}

function criarFazenda() {
    const nomeInput = document.getElementById("nomeFazenda").value;
    const areaInput = Number(document.getElementById("areaFazenda").value);
    
    if (!nomeInput.trim() || areaInput <= 0) {
        alert("Por favor, dê um nome válido e uma área maior que 0 para fundar sua fazenda virtual.");
        return;
    }

    fazenda.nome = nomeInput;
    fazenda.area = areaInput;
    fazenda.cultura = document.getElementById("culturaGame").value;
    fazenda.criada = true;
    
    atualizarPainel();
}

function comprarTrator() {
    if (!fazenda.criada) { alert("Você precisa fundar sua fazenda antes de fazer investimentos!"); return; }
    fazenda.tratores++;
    atualizarPainel();
}

function comprarDrone() {
    if (!fazenda.criada) { alert("Você precisa fundar sua fazenda antes de fazer investimentos!"); return; }
    fazenda.drones++;
    atualizarPainel();
}

function instalarIrrigacao() {
    if (!fazenda.criada) { alert("Você precisa fundar sua fazenda antes de fazer investimentos!"); return; }
    fazenda.irrigacao = true;
    atualizarPainel();
}

function colher() {
    if (!fazenda.criada) { alert("Não há plantações disponíveis. Monte sua fazenda primeiro!"); return; }
    
    let lucroPorHa = 0;
    if (fazenda.cultura === "Soja") lucroPorHa = 2500;
    if (fazenda.cultura === "Milho") lucroPorHa = 1800;
    if (fazenda.cultura === "Café") lucroPorHa = 3500;

    let bonus = 1.0;
    bonus += fazenda.tratores * 0.05; // +5% por trator
    bonus += fazenda.drones * 0.03;   // +3% por drone
    if (fazenda.irrigacao) bonus += 0.10; // +10% por irrigação

    // Multiplica a colheita atual e soma ao saldo acumulado do jogador
    let colheitaAtual = Math.round(fazenda.area * lucroPorHa * bonus);
    fazenda.lucro += colheitaAtual;
    
    atualizarPainel();
    alert(`🎉 Colheita realizada com sucesso! Você faturou R$ ${colheitaAtual.toLocaleString("pt-BR")} nesta safra.`);
}
