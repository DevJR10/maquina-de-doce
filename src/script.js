/**
 * MÁQUINA DE DOCES - Simulação AFD (Autômato Finito Determinístico)
 *
 * Estados: q0 (R$0), q1 (R$1), q2 (R$2), ..., q8 (R$8) - saldo acumulado
 * Alfabeto de entrada: {1, 2, 5} - valores em reais
 * Estados finais: Doce A/B/C sem troco, Doce A/B/C com troco
 */

const AFD = {
    // Estados: q0 a q8 representam saldo de R$0 a R$8
    estados: ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'],
    estadoInicial: 'q0',
    alfabeto: [1, 2, 5],

    // Função de transição: (estado, símbolo) -> novoEstado
    transicao(estado, valor) {
        const saldo = parseInt(estado.replace('q', ''), 10);
        const novoSaldo = Math.min(saldo + valor, 8);
        return 'q' + novoSaldo;
    },

    // Preços dos doces
    precos: { A: 6, B: 7, C: 8 },

    // Verifica se um doce está disponível no estado atual
    doceDisponivel(estado, doce) {
        const saldo = parseInt(estado.replace('q', ''), 10);
        return saldo >= this.precos[doce];
    }
};

// Estado da máquina
let saldo = 0;
let estadoAtual = AFD.estadoInicial;
let bloqueado = false;

// Elementos DOM
const elSaldo = document.getElementById('saldo');
const elEstadoAtual = document.getElementById('estado-atual');
const elResultado = document.getElementById('resultado');
const areaTroco = document.getElementById('area-troco');
const areaDoce = document.getElementById('area-doce');
const portinha = document.getElementById('portinha');

const botoesMoeda = document.querySelectorAll('.btn-moeda');
const botoesDoce = document.querySelectorAll('.btn-doce');

// Atualiza a interface com o estado atual
function atualizarInterface() {
    elSaldo.textContent = saldo.toFixed(2).replace('.', ',');
    elEstadoAtual.textContent = `${estadoAtual} (R$ ${saldo})`;

    botoesDoce.forEach(btn => {
        const doce = btn.dataset.doce;
        const preco = parseInt(btn.dataset.preco, 10);
        btn.disabled = saldo < preco;
    });
}

// Animação de moeda entrando (visual na área de pagamento)
function animarMoeda(valor, elemento) {
    return new Promise(resolve => {
        const areaPagamento = document.querySelector('.area-pagamento');
        const moeda = document.createElement('div');
        moeda.className = 'moeda-anim';
        moeda.textContent = 'R$' + valor;
        moeda.style.fontSize = '9px';
        moeda.style.display = 'flex';
        moeda.style.alignItems = 'center';
        moeda.style.justifyContent = 'center';
        moeda.style.color = '#333';
        moeda.style.fontWeight = 'bold';

        areaPagamento.style.position = 'relative';
        areaPagamento.appendChild(moeda);

        requestAnimationFrame(() => {
            moeda.style.animation = 'moeda-entrar 0.6s ease-out forwards';
        });

        setTimeout(() => {
            moeda.remove();
            resolve();
        }, 600);
    });
}

// Animação de doce saindo com portinha abrindo
async function animarDoceSaindo(tipo) {
    const cores = { A: '#e74c3c', B: '#3498db', C: '#2ecc71' };

    // Abre a portinha
    portinha.classList.add('aberta');

    await new Promise(r => setTimeout(r, 400));

    // Mostra o doce caindo
    areaDoce.innerHTML = '';
    const doce = document.createElement('div');
    doce.className = 'doce-dispensado';
    doce.style.background = `radial-gradient(circle at 30% 30%, white, ${cores[tipo]})`;
    doce.style.boxShadow = 'inset -3px -3px 6px rgba(0,0,0,0.3)';
    areaDoce.appendChild(doce);

    await new Promise(r => setTimeout(r, 800));

    // Fecha a portinha
    portinha.classList.remove('aberta');
}

// Animação de troco na área direita
function animarTroco(valor) {
    areaTroco.innerHTML = '';
    const trocoEl = document.createElement('span');
    trocoEl.className = 'troco-dispensado';
    trocoEl.textContent = `R$ ${valor.toFixed(2).replace('.', ',')}`;
    areaTroco.appendChild(trocoEl);
}

// Determina o resultado final do AFD
function obterResultadoFinal(doce, troco) {
    const temTroco = troco > 0;
    return `Doce ${doce} ${temTroco ? 'com troco' : 'sem troco'}`;
}

// Handler: inserir moeda/nota
async function inserir(valor) {
    if (bloqueado) return;
    if (!AFD.alfabeto.includes(valor)) return;

    const btn = document.querySelector(`.btn-moeda[data-valor="${valor}"]`);
    if (btn) {
        bloqueado = true;
        await animarMoeda(valor, btn);
        bloqueado = false;
    }

    // Transição do AFD
    const novoEstado = AFD.transicao(estadoAtual, valor);
    estadoAtual = novoEstado;
    saldo = parseInt(novoEstado.replace('q', ''), 10);

    atualizarInterface();
}

// Handler: comprar doce
async function comprar(doce) {
    if (bloqueado) return;
    const preco = AFD.precos[doce];
    if (saldo < preco) {
        elResultado.textContent = 'Saldo insuficiente!';
        elResultado.style.color = '#e74c3c';
        return;
    }

    bloqueado = true;
    elResultado.textContent = 'Processando...';
    elResultado.style.color = '#ffc107';

    const troco = saldo - preco;
    const resultadoFinal = obterResultadoFinal(doce, troco);

    // Animação: portinha abre, doce sai, troco (se houver)
    await animarDoceSaindo(doce);

    if (troco > 0) {
        animarTroco(troco);
    } else {
        areaTroco.innerHTML = '<span class="placeholder">R$ 1, 2 ou 5</span>';
    }

    await new Promise(r => setTimeout(r, 500));

    // Atualiza resultado
    if (troco > 0) {
        elResultado.innerHTML = `<span style="color:#2ecc71; display: block;">✓ ${resultadoFinal}</span><br>Doce ${doce} + Troco R$ ${troco.toFixed(2).replace('.', ',')}`;
    } else {
        elResultado.innerHTML = `<span style="color:#2ecc71">✓ ${resultadoFinal}</span><br>Você recebeu o Doce ${doce}`;
    }

    // Reset para estado inicial
    saldo = 0;
    estadoAtual = AFD.estadoInicial;
    atualizarInterface();

    // Limpa dispensador após 3 segundos
    setTimeout(() => {
        areaDoce.innerHTML = '<span class="placeholder">Doce</span>';
        areaTroco.innerHTML = '<span class="placeholder">R$ 1, 2 ou 5</span>';
        elResultado.textContent = 'Pronto para nova compra!';
        elResultado.style.color = '#fff';
    }, 3000);

    bloqueado = false;
}

// Event listeners
botoesMoeda.forEach(btn => {
    btn.addEventListener('click', () => {
        const valor = parseInt(btn.dataset.valor, 10);
        inserir(valor);
    });
});

botoesDoce.forEach(btn => {
    btn.addEventListener('click', () => {
        const doce = btn.dataset.doce;
        comprar(doce);
    });
});

// Inicialização
atualizarInterface();
