# Máquina de Doces - Simulação AFD

Simulação interativa de uma máquina de doces com animações em JavaScript, funcionando como um **Autômato Finito Determinístico (AFD)** para fins didáticos.

![Máquina de Doces](https://img.shields.io/badge/Projeto-A3-blue) ![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Sobre o Projeto

Projeto desenvolvido para demonstrar o conceito de AFD através de uma máquina de venda de doces. O usuário insere moedas/notas, as opções de doces são habilitadas conforme o saldo e, ao selecionar, a máquina dispensa o produto e o troco (quando aplicável).

## Regras da Máquina

- **Valores aceitos:** R$ 1,00 | R$ 2,00 | R$ 5,00
- **Doces disponíveis:**
  - Doce A — R$ 6,00
  - Doce B — R$ 7,00
  - Doce C — R$ 8,00

### Possíveis Resultados (Estados Finais do AFD)

| Doce | Sem troco | Com troco |
|------|-----------|-----------|
| A    | ✓         | ✓         |
| B    | ✓         | ✓         |
| C    | ✓         | ✓         |

## Estrutura do AFD

- **Estados:** q0 (R$ 0) até q8 (R$ 8) — representam o saldo acumulado
- **Estado inicial:** q0
- **Alfabeto de entrada:** {1, 2, 5}
- **Função de transição:** δ(estado, valor) → novo estado
- **Estados finais:** 6 combinações possíveis (Doce A/B/C × sem/com troco)

## Como Executar

1. Clone ou baixe o repositório
2. Abra o arquivo `main/index.html` em um navegador web
3. Não é necessário servidor — funciona com arquivo local

## Como Usar

1. **Inserir dinheiro:** Clique nos botões R$ 1, R$ 2 ou R$ 5 para adicionar ao saldo
2. **Selecionar doce:** Os botões de doces são habilitados quando o saldo é suficiente
3. **Retirar produto:** O doce sai pela portinha e o troco (se houver) aparece na área direita

## Estrutura do Projeto

```
Projeto A3 - Sweet Machine/
├── main/
│   └── index.html      # Página principal
├── style/
│   └── style.css       # Estilos e animações CSS
├── src/
│   └── script.js       # Lógica do AFD e animações
└── README.md
```

## Funcionalidades

- **Animação de moeda:** Visual da moeda entrando na máquina
- **Animação da portinha:** Portinha abre para liberar o doce e fecha em seguida
- **Animação do doce:** Bola colorida caindo no dispensador
- **Indicador de estado:** Exibe o estado atual do AFD em tempo real
- **Layout responsivo:** Interface adaptada para diferentes tamanhos de tela

## Tecnologias

- HTML5
- CSS3 (animações, flexbox, variáveis)
- JavaScript (ES6+)

## Licença

Projeto acadêmico — uso livre para fins educacionais.
