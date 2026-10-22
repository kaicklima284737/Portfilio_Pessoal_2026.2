# Checkpoint 6 · Vibecoding — Portfólio de Kaick Lima Silva

Landing page de estudante de Engenharia de Software (2º semestre), criada com IA generativa (Claude).

---

## 1. Arquitetura técnica

```
portfolio-kaick/
├── index.html        # estrutura e seções
├── css/style.css     # tokens, layout, animações
├── js/script.js      # intro, partículas, reveal, typewriter, i18n
├── img/
│   ├── Background_img.png   # fundo de "Quem sou eu"
│   └── Informações.png      # referência do hero
└── ARCHITECTURE.md
```

| Módulo (script.js) | Função | Performance |
|---|---|---|
| Buraco negro | Intro em canvas; tecla ou clique comprime, expande e revela a página | Menos partículas em celular; DPR limitado |
| Rede de partículas | Fundo fixo, independente do scroll | 32 pontos (mobile) / 70 (desktop); pausa com aba oculta |
| Scroll Reveal | IntersectionObserver, threshold 25% | Observa uma vez e libera |
| Typewriter | Frases no hero, em loop | Timers leves |
| i18n | PT-BR, EN-US, ES via `data-i` | Sem biblioteca |
| Acessibilidade | `prefers-reduced-motion` desliga animações | — |

Sem frameworks e sem bibliotecas externas, só Google Fonts.

---

## 3.1 Referências visuais

| # | Referência | O que aproveitei | Seção |
|---|---|---|---|
| 1 | Imagem "Informações" (portfólio UI, cartão de vidro) | Cartão translúcido com blur, gradiente roxo, listras diagonais, esfera 3D | Início |
| 2 | Imagem "Background_img" (astronauta no planeta) | Clima espacial, roxo profundo, sensação de descoberta | Quem sou eu (fundo) |
| 3 | wantid.github.io/galaxy-portfolio | Redes sociais à esquerda, três botões de idioma no canto inferior direito, nav no topo direito | Início, Nav |
| 4 | new-webportfolio.vercel.app | Career Path em linha do tempo, cards alternando esquerda e direita | Quem sou eu |
| 5 | leonkohli.dev/projects/particle-network | Partículas ligadas por linhas, rodando sem depender do scroll | Fundo global |
| 6 | codepen.io/StarKnightt/pen/VYvZeom | Buraco negro interativo: comprime, expande e carrega o site | Intro |

---

## 3.2 Decisões de identidade visual

### Paleta

| Cor | Hex | Papel | Por quê |
|---|---|---|---|
| Fundo | `#1A0B2E` | Base da página | Roxo quase preto lembra o espaço e dá contraste |
| Secundária | `#3d176f` | Cards, blocos | Camada de profundidade sobre o fundo |
| Destaque | `#6c3fa7` | Botões, barras, hover | Chama o clique sem agredir |
| Terciária 1 | `#ad83e5` | Partículas, detalhes, rótulos | Brilho de estrela |
| Terciária 2 | `#e0d5ed` | Partículas, títulos, linhas | Luz fria, legível |
| Texto | `#F5F5F5` | Texto corrido | Contraste alto |

### Tipografia

| Fonte | Uso | Sensação |
|---|---|---|
| Edu NSW ACT Hand Cursive | Nome no nav, mensagem da intro | Pessoal, humana, assinatura |
| Rubik Storm | Títulos | Impacto, curiosidade |
| Source Code Pro | Menu, rótulos, typewriter | Tecnologia, código |
| Nunito Sans | Texto corrido | Leitura suave |
| Open Sans, Roboto | Fallback | Segurança |

### Tom e personalidade
Elegante, moderno e curioso. Nos textos, frases curtas que provocam ("Quer saber quem eu sou?"). No layout, vidro, brilho e espaço negativo. Nas animações, revelação gradual para estimular a descoberta.

### Estrutura da página

| Seção | Motivo |
|---|---|
| Intro (buraco negro) | Cria curiosidade antes do conteúdo |
| Início | Apresenta nome, curso e contatos |
| Quem sou eu | Resumo e trajetória educacional |
| Certificações | Prova de formação, com download |
| Habilidades | Ferramentas e nível de domínio |
| Projetos | Trabalhos do GitHub |
| Contato | Links e currículo |

---

## 3.3 Prompts utilizados

### Prompt inicial (sem edição)

````
Crie uma lading page de um estudante de Engenharia de Software do 2 semestre chamado Kaick Lima Silva, que siga os seguintes requesitos:

1. Estrutura obrigátoria: 

Inicio (Seção contendo a estilização inspirada na imagem (<img src="./img/Informações.png" alt="img_colocada_para_visualização"> para github e img de Informações pro prompt). No Nav, deverá conter todas as seções interativas do projeto e localizado no canto superior direito da tela. Localizado na esquerda centralizado os simbolo do linkedin, github e email, que aguardarão os links para serem adicionados. Em baixo, na direita, seguindo o formato do [https://wantid.github.io/galaxy-portfolio/], na parte que diz respeito aos 3 botões com diferentes idiomas, os quais serão obrigatoriamente, em ordem: Português(Brasil), Inglês(EUA) e Espanhol. E obrigatoriamente, a Canto superior esquerdo no Nav, deverá conter o primeiro nome do estudante utilizando a fonte: Edu NSW ACT Hand Cursive )

Quem sou eu (IMG do background <img src="./img/Background_img.png" alt="img_colocada_para_visualização"> Com bloco de texto lorem usado para simular as informações guardadas para o próximo prompt. Deverá seguir a estrutura de Breve resumo, Career Path inspirado em [https://new-webportfolio.vercel.app/] focado no educacional com 3 blocos de cards para edição futura, mas que seguirá estrutura de informações uma a esquerda e outra a direita )

Habilidades: Seção simples estruturada para adicionar os ícones profissionais (Não é permitido uso de icon) das ferramentas e seu nivel de dominancia, exemplo: Git e Github, Html css e js, REACT, 

Projetos Buscados diretamente do GITHUB, na seção de projetos em destaques, contendo Nome, Breve descrição, Técnologias utilizadas, etc. Neste momente, deverá conter apenas os cards e blocos simulando até que seja passado o link e colhido as informações.

Certificações Colocado logo abaixo do Quem eu sou, como cards sequenciais em coluna, onde dentro dele terá como baixar.

Contato Contendo link do linkedin, github, email, telefone, e principalmente o botão de Baixar curriculo, que será mandado no 2 prompt.

2. Estilização Obrigátoria:
Resultado esperado: Relembre o espaço, mas mantenha um diferencial.
- Cor de Fundo: #1A0B2E
- Cor Terciária: #ad83e5 e #e0d5ed (Usada para animações das particulas)
- Cor Secundária: #3d176f
- Cor de Cor de destaque: #6c3fa7
- Cor de Texto: #F5F5F5
- Fontes:
Resultado esperado do uso: textos que transmitam curiosidade, interesse, despertem reação de buscar mais. 
Projeto geral: Source Code Pro, Nunito sans, Opens sans, Roboto,
Informações especiais: Edu NSW ACT Hand Cursive, Rubik Storm(Para títulos),
- Animações: 
Use Scroll Reveal: elementos aparecem conforme a rolagem da página, e pelo menos 25% da imagem ou texto aparece
Use a animação Typewriter (máquina de escrever) para revelar o texto gradualmente.
Inspire-se no [https://leonkohli.dev/projects/particle-network] para trazer párticulas rondando no background do projeto. Eles deverão rodar independente do scrolling ou qualquer item.
Crie uma animação inicial antes de acessar qualquer item: Antes de acessar as seções ou o inicio, crie inspirado no [https://codepen.io/StarKnightt/pen/VYvZeom] um buraco negro interativo, onde após clicar qualquer tecla ou com o mouse, ele se compacte, espanda e o portfolio carregue. É esperado o seguite: Buraco negro com texto interno {Quer saber quem eu sou? clique Enter} (Texto interno pode ser alterado para melhorar a mensagem passada, de curisosidade.) Ao clicar, ele se compacta, espande e todas as seções carregam. Lembre-se de ter atenção quanto a performace do site e como ele vai rodar sem travar aparelhos celulares mais modernos e antigos.
Personalidade e Tom das páginas: Elegantes, modernos, mas que despertem o interesse de descobrir mais. Nos textos, elegância é o foco, nas animações, deverão ser modernas e usadas para despertarem o interesse das pessoas. 

Nesse primeiro momento, deve-se importar com o design, layout e animações das páginas. As informações que serão adicionadas virão via curriculo, nos próximos contatos que vamos ter. Nesse momento, tirando os textos obrigátorios, pode-se usar o lorem para simular as informações.
````

### Prompts de ajuste (em ordem)

| # | Prompt |
|---|---|
| 1 | `Crie o projeto trazendo o código` |
| 2 | `sem alterar o primeiro prompt, adeque o arquiteture.md para os pedidos do documento` |
| 3+ | *(adicionar os próximos prompts aqui)* |

---

## 3.4 Registro de correções

### Rodada 1
| Campo | Registro |
|---|---|
| Problema | A primeira versão veio num arquivo só, com a imagem embutida em base64. Não seguia o caminho `./img/` pedido no prompt. |
| Prompt de correção | `Crie o projeto trazendo o código` |
| Resultado | Resolveu. Projeto separado em `index.html`, `css/` e `js/`, com imagens em `img/`. |
| Aprendizado | Pedir a estrutura de pastas e arquivos já no prompt inicial. |

### Rodada 2 (QA, a preencher)
| Campo | Registro |
|---|---|
| Problema | *(testar: intro com Enter e clique, menu mobile, troca de idioma, reveal, partículas em celular)* |
| Prompt de correção | |
| Resultado | |
| Aprendizado | |

---

## 3.5 Resultado final

- Repositório: *(link)*
- Deploy: *(link)*

### Reflexão
- **Ficou como imaginei:** *(preencher após o QA)*
- **O que mudaria:** *(preencher)*