document.addEventListener('DOMContentLoaded', () => {

  // SELEÇÃO DOS MODAIS E BOTÕES
  const modalAuth = document.getElementById('modal-auth');
  const modalChat = document.getElementById('modal-chatbot');
  const modalSintomas = document.getElementById('modal-sintomas');

  const userBadge = document.getElementById('user-badge');
  const cardChat = document.getElementById('card-chat');
  const cardSintomas = document.getElementById('card-sintomas');
  const cardAgenda = document.getElementById('card-agenda');
  const cardRemedios = document.getElementById('card-remedios');
  const cardBiblioteca = document.getElementById('card-biblioteca');

  // FECHAR MODAIS
  document.getElementById('close-auth').addEventListener('click', () => modalAuth.style.display = 'none');
  document.getElementById('close-chat').addEventListener('click', () => modalChat.style.display = 'none');
  document.getElementById('close-sintomas').addEventListener('click', () => modalSintomas.style.display = 'none');

  // ABRIR MODAIS PELOS CARDS DO FIGMA
  userBadge.addEventListener('click', () => modalAuth.style.display = 'flex');
  cardChat.addEventListener('click', () => modalChat.style.display = 'flex');
  cardSintomas.addEventListener('click', () => modalSintomas.style.display = 'flex');

  cardAgenda.addEventListener('click', () => alert('📅 Agenda & Apoio: Conectando com a rede de psicólogos e voluntários credenciados.'));
  cardRemedios.addEventListener('click', () => alert('💊 Meus Medicamentos: Nenhum lembrete pendente para o horário atual.'));
  cardBiblioteca.addEventListener('click', () => alert('📚 Biblioteca de Saúde: Abrindo artigos sobre ansiedade e técnicas de relaxamento.'));

  // 1. LÓGICA DE COMANDO DE VOZ (RF03 - Protótipo Figma)
  const btnVoice = document.getElementById('btn-voice');
  const voiceStatus = document.getElementById('voice-status');

  btnVoice.addEventListener('click', () => {
    btnVoice.classList.add('listening');
    voiceStatus.innerText = "🎙️ Ouvindo... Pode falar o que está sentindo.";

    // Simulação do reconhecimento de fala
    setTimeout(() => {
      btnVoice.classList.remove('listening');
      voiceStatus.innerText = "Toque para acionar comando de voz";
      modalChat.style.display = 'flex'; // Abre o chat automático por voz
    }, 3500);
  });

  // 2. ALTERNÂNCIA ENTRE LOGIN E CADASTRO
  const tabLogin = document.getElementById('tab-login');
  const tabCadastro = document.getElementById('tab-cadastro');
  const formLogin = document.getElementById('form-login');
  const formCadastro = document.getElementById('form-cadastro');

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabCadastro.classList.remove('active');
    formLogin.style.display = 'block';
    formCadastro.style.display = 'none';
  });

  tabCadastro.addEventListener('click', () => {
    tabCadastro.classList.add('active');
    tabLogin.classList.remove('active');
    formCadastro.style.display = 'block';
    formLogin.style.display = 'none';
  });

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Acesso liberado com sucesso!');
    modalAuth.style.display = 'none';
    document.querySelector('.user-name').innerText = "Minha Conta";
  });

  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('cad-nome').value;
    alert(`Parabéns, ${nome}! Cadastro efetuado com sucesso. Você já pode acessar.`);
    tabLogin.click();
  });

  // 3. SELEÇÃO DE SINTOMAS PSICOSSOMÁTICOS
  const chips = document.querySelectorAll('.chip');
  const resumoBox = document.getElementById('sintomas-resumo');
  let sintomasSelecionados = [];

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const sintoma = chip.getAttribute('data-sintoma');
      chip.classList.toggle('active');

      if (sintomasSelecionados.includes(sintoma)) {
        sintomasSelecionados = sintomasSelecionados.filter(s => s !== sintoma);
      } else {
        sintomasSelecionados.push(sintoma);
      }

      if (sintomasSelecionados.length > 0) {
        resumoBox.style.display = 'block';
        resumoBox.innerHTML = `<strong>Sintomas registrados:</strong> ${sintomasSelecionados.join(', ')}. Registrados para o atendimento.`;
      } else {
        resumoBox.style.display = 'none';
      }
    });
  });

  // 4. EXERCÍCIO RESPIRATÓRIO (4-4-4)
  const btnRespiracao = document.getElementById('btn-respiracao');
  const containerRespiracao = document.getElementById('container-respiracao');
  const circleBreath = document.getElementById('circle-breath');
  const breathText = document.getElementById('breath-text');

  btnRespiracao.addEventListener('click', () => {
    containerRespiracao.style.display = 'flex';
    btnRespiracao.disabled = true;

    breathText.innerText = "Inspirar (4s)";
    circleBreath.classList.add('expand');

    setTimeout(() => {
      breathText.innerText = "Reter o ar (4s)";

      setTimeout(() => {
        breathText.innerText = "Expirar (4s)";
        circleBreath.classList.remove('expand');

        setTimeout(() => {
          breathText.innerText = "Concluído 🌿";
          btnRespiracao.disabled = false;
        }, 4000);

      }, 4000);

    }, 4000);
  });

});