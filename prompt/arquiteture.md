# Checkpoint 6 · Vibecoding — Portfólio de Kaick Lima Silva

Landing page de estudante de Engenharia de Software (FIAP, 2º semestre), criada com IA generativa (Claude).
Documento de processo: referências, identidade visual, prompts, correções, QA e reflexão.

**Sumário**
1. [Arquitetura técnica](#1-arquitetura-técnica)
2. [Fluxo de carregamento](#2-fluxo-de-carregamento)
3. [Entregas do checkpoint](#3-entregas-do-checkpoint): [3.1 Referências](#31-referências-visuais) · [3.2 IDV](#32-decisões-de-identidade-visual) · [3.3 Prompts](#33-prompts-utilizados) · [3.4 Correções](#34-registro-de-correções) · [3.5 Resultado final](#35-resultado-final)
4. [QA](#4-qa)
5. [Pendências](#5-pendências)

---

## 1. Arquitetura técnica

```
portfolio-kaick/
├── index.html                          # estrutura e seções
├── css/style.css                       # tokens, layout, animações, responsivo
├── js/script.js                        # intro, partículas, reveal, typewriter, i18n, GitHub
├── img/
│   ├── Background_img.png              # fundo de "Quem sou eu"
│   ├── Informações.png                 # referência do hero
│   ├── foto.jpeg                       # foto do hero
│   └── (3 PDFs de certificados)        # Design Thinking, Formação Social, Python
├── docs/Curriculo_Kaick_Lima_Silva.pdf # botão "Baixar currículo"
├── arquiteture.md
└── README.md
```

| Módulo (`script.js`) | Função | Performance |
|---|---|---|
| Buraco negro | Intro em canvas. Tecla ou clique comprime, expande e revela a página | Menos partículas em celular, DPR limitado |
| Rede de partículas | Fundo fixo, independente do scroll | 32 pontos (mobile) / 70 (desktop), pausa com aba oculta |
| Scroll Reveal | `IntersectionObserver`, threshold 25% | Observa uma vez e libera |
| Typewriter | Frases no hero, em loop | Timers leves |
| i18n | PT-BR, EN-US, ES via `data-i` | Sem biblioteca |
| GitHub | Busca dados dos seis projetos em destaque pela API pública | Sujeita ao limite de 60 requisições/hora por IP; precisa de fallback estático |
| Certificações | Três cards. Clique abre o PDF em nova aba. Botão único para validar na FIAP | Sem iframe |
| Acessibilidade | `prefers-reduced-motion` desliga animações. Foco por teclado na intro | — |

Sem framework e sem biblioteca JS. Dependências externas: Google Fonts e o SVG de chave em `on.fiap.com.br` (ver [Pendências](#5-pendências)).

> Nota de auditoria: o `script.js` anexado nesta conversa é um PDF (cópia de `Pyhton_1.pdf`), não código. A tabela acima reflete o que foi pedido nos prompts e o que o `index.html` expõe. O comportamento do JS e do CSS precisa ser conferido no repositório.

---

## 2. Fluxo de carregamento

Sequência pedida (P21):

| Etapa | Elemento | Gatilho |
|---|---|---|
| 0 | Intro do buraco negro | Enter, tecla ou clique |
| 1 | Caixa da foto (`.hero-photo-wrap`) | Fim da expansão |
| 2 | Nav com as seções | Depois da foto |
| 3 | Ícones de LinkedIn, GitHub e e-mail | Depois do nav |
| 4 | Restante do portfólio | Scroll reveal |

Regra de sessão: a intro roda na primeira entrada da aba. Reload não repete. Abrir o link de novo (nova aba ou acesso direto) repete. Implementação indicada: `sessionStorage` + `performance.getEntriesByType("navigation")`.

**Estado atual: não funciona** (rodadas 17 a 20). Hipótese técnica: os itens do hero usam a mesma classe `.rv` do scroll reveal. Como já estão visíveis ao fim da intro, o `IntersectionObserver` os revela todos juntos. Proposta: classe própria para a sequência (`.seq`, com atraso via variável CSS `--d`), disparada por `body.is-ready`, e `.rv` só para o que está abaixo da dobra.

Prompt sugerido para a próxima tentativa:

````
Corrija só a sequência de entrada do hero. Não altere a intro do buraco negro.
Quando a expansão terminar, adicione a classe is-ready ao body.
Itens com a classe .seq entram com opacity 0→1 e translateY 24px→0, 700 ms, ease-out, em ordem:
1) .hero-photo-wrap em 0 ms, 2) nav em 400 ms, 3) .social-links em 800 ms, 4) .hero-copy em 1200 ms.
.rv continua só para seções abaixo do hero.
Intro uma vez por sessão (sessionStorage). Respeitar prefers-reduced-motion.
Entregue só o trecho de CSS e JS alterado.
````

---

## 3. Entregas do checkpoint

### 3.1 Referências visuais

| # | Referência | O que aproveitei | Seção |
|---|---|---|---|
| 1 | Imagem "Informações" (portfólio UI, cartão de vidro) | Cartão translúcido com blur, gradiente roxo, listras diagonais, esfera 3D | Início |
| 2 | Imagem "Background_img" (astronauta no planeta) | Clima espacial, roxo profundo, sensação de descoberta | Quem sou eu (fundo) |
| 3 | wantid.github.io/galaxy-portfolio | Redes sociais à esquerda, três botões de idioma no canto inferior direito, nav no topo direito | Início, Nav |
| 4 | new-webportfolio.vercel.app | Career Path em linha do tempo, cards alternando esquerda e direita | Quem sou eu |
| 5 | leonkohli.dev/projects/particle-network | Partículas ligadas por linhas, rodando sem depender do scroll | Fundo global |
| 6 | codepen.io/StarKnightt/pen/VYvZeom | Buraco negro interativo: comprime, expande e carrega o site | Intro |

Animações de referência: **scroll reveal** (itens surgem com a rolagem, a partir de 25% visível), **typewriter** (texto revelado aos poucos no hero) e **partículas independentes do scroll** (ref. 5).

### 3.2 Decisões de identidade visual

**Conceito:** espaço com um diferencial. Vidro, brilho e roxo profundo em vez do preto-e-azul comum.

#### Paleta

| Cor | Hex | Papel | Por quê |
|---|---|---|---|
| Fundo | `#1A0B2E` | Base da página | Roxo quase preto lembra o espaço e dá contraste |
| Secundária | `#3d176f` | Cards, blocos | Camada de profundidade sobre o fundo |
| Destaque | `#6c3fa7` | Botões, barras, hover | Chama o clique sem agredir |
| Terciária 1 | `#ad83e5` | Partículas, detalhes, rótulos | Brilho de estrela |
| Terciária 2 | `#e0d5ed` | Partículas, títulos, linhas | Luz fria, legível |
| Texto | `#F5F5F5` | Texto corrido | Contraste alto |

#### Tipografia

| Fonte | Uso | Sensação |
|---|---|---|
| Edu NSW ACT Hand Cursive | Nome no nav, mensagem da intro | Pessoal, humana, assinatura |
| Rubik Storm | Títulos | Impacto, curiosidade |
| Source Code Pro | Menu, rótulos, typewriter | Tecnologia, código |
| Nunito Sans | Texto corrido | Leitura suave |
| Open Sans, Roboto | Fallback | Segurança |

#### Tom e personalidade
Elegante, moderno e curioso. Nos textos, frases curtas que provocam ("Quer saber quem eu sou?"). No layout, vidro, brilho e espaço negativo. Nas animações, revelação gradual para estimular a descoberta.

#### Estrutura da página

| Seção | Âncora | Motivo |
|---|---|---|
| Intro (buraco negro) | — | Cria curiosidade antes do conteúdo |
| Início | `#inicio` | Nome, curso, foto e contatos |
| Quem sou eu | `#sobre` | Resumo e trajetória educacional (3 cards em linha do tempo) |
| Certificações | `#certificacoes` | Prova de formação, com chave de validação |
| Habilidades | `#habilidades` | Ferramentas e conhecimentos do currículo |
| Projetos | `#projetos` | Seis projetos em destaque do GitHub |
| Contato | `#contato` | Links, telefone e currículo |

### 3.3 Prompts utilizados

#### Prompt inicial (sem edição)

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

#### Prompts de ajuste (em ordem)

A ordem dos prompts 19 a 23 segue o arquivo `prompt_geral.md`. P2 documenta o processo e não altera o site.


**P1** · Estrutura do projeto

> Crie o projeto trazendo o código


**P2** · Documentação (não altera o site)

> sem alterar o primeiro prompt, adeque o arquiteture.md para os pedidos do documento


**P3** · Currículo

> Agora, de acordo com os pedidos anteriores, adicione minhas informações a partir do meu curriculo, sempre se limitando a atender os pedidos:


**P4** · GitHub: acesso

> consegue acessar meu github a partir do link enviado para pegar os projetos que deixei na parte de destaque? https://github.com/kaicklima284737


**P5** · GitHub: destaques

> Pegue o projeto, e ajuste ele para que sempre acesse meu perfil de usúario de acordo com o link enviado, e pegue sempre os projetos destaques para serem adicionados.


**P6** · Certificados: dados e chaves

> Adicione os seguintes certificados ao projeto:
> ## Design Thinking - Process
> Chave do diploma:6765e65d84d0db9e71a0f11dcfc0c1fe
>
> ## Formação Social e Sustentabilidade
> Chave do diploma:aed38fbab9a04adfb75b4c13a4a2a97e
>
> Certificação em
> ## Python
> 76a0ae9cbafc04984c7d777ea72dd2e0
>
> Incluir as respectivas chaves de diploma. Disponibilizar um botão para copiar cada chave.


**P7** · Certificados: imagens e validação

> Pegue as imagens adicionadas ao img e adicione ao seu respectivo curso. São 3 imagens que contem o nome do curso especificado, Além disso, Faça com que crie acima do curso um botão clicavel que acesse o https://on.fiap.com.br/validar-certificado/
> Nome do botão: Validar Certificado Fiap


**P8** · Certificados: padronização

> Padronize o formato de aparição do documento pdf envolvendo a FIAP e os certificados. Faça com que o certificado esteja legivel em qualquer aparelho, e apareça em um formato padrão. Álem disso, siga o padrão: Botão criado apenas 1 vez em cima de todos os cursos,
> foto do curso a esquerda e informações a direita. álem disso, deve conter a chave para verificar o curso logo abaixo de cada certificado


**P9** · Certificados: abrir com um clique

> Melhore a visualização dos certificados pdf. Permita que com um clique ele abra e se adapte a realidade dos aparelhos sem perder a estilização da página.


**P10** · Certificados: pré-visualização

> Crie uma pré-visualização ao certificado enquanto mantem a abertura para que ele consiga abrir em outra página o certificado com mais detalhes.


**P11** · Certificados: imagem 100% e card clicável

> Faça o seguinte. Para os certificados, pegue as imagens dos certificados e exiba uma imagem no tamanho 100% da caixa criada para ela. Depois disso, faça com que ao clicar, sem confirmação nem nenhum passo adicional, pegue e mande para outra pagina para visualização adicional, mantendo o texto abrir em nova aba, mas o clique funcionando em todo o card.


**P12** · Certificados: imagem quebrada

> Onde existia a imagem dos certificados, faça com que mantendo o design original ele centralize o texto na caixa abrir em nova aba, fazendo com que o certificado abra em uma nova guia.


**P13** · Certificados: remover prévia

> Não deverá existir mais a prévia do certificado. Agora exibira o texto "Abrir em nova aba".


**P14** · Habilidades: ícones

> Na aba habilidades, deverá conter o icone profissional de cada item colocado na seção. Não será aceito emoji, apenas icone profissional para solucionar.


**P15** · Habilidades: cores oficiais

> agora pegue os icones profissionais e ajuste eles para deixâ-los com suas colorações naturais. Não é necessário trazer o icone profissional sem cor para deixá-lo de acordo com o padrão do projeto. Pode-se trazer no padrão internacional da habilidade.


**P16** · Hero: foto

> Adicione o foto.jpeg à aba inicial ao lado do nome, mantendo o design da página.


**P17** · Intro: buraco negro

> Agora, Use como refêrencia a animação do [codepen.io/StarKnightt/pen/VYvZeom], do buraco negro interativo. Use ele como animação, e antes da página carregar, utilizando como base de cores: #ad83e5 e #e0d5ed faça com que essa animação carregue primeiramente e logo após o buraco negro comprimir e espandir a página comece a carregar.


**P18** · Intro: naturalidade e ordem

> Torne a animação mais natural, e faça com que os itens surjam de pouco em pouco, primeiramente o box que contem minha imagem, depois as seções, depois os links dos linkedin, github e email


**P19** · Intro: fluidez

> Deixe a animação mais fluida, fazendo com que ela encaixe com a entrada dos itens do portifolio


**P20** · Intro: intervalo entre itens

> Tudo está aparecendo ao mesmo tempo. Deixe os itens com um espaçamento de tempo para aparecimento um pouco mais longo.


**P21** · Intro: ordem e primeira visita

> Nada está sumindo ou aparecendo. Priorize o carregamento do local que contenha a foto.jpeg. depois priorize o carregamento do Nav com as seções, depois os icones do linkedin e github e depois o restante do portifolio. Álem disso, faça com que a animação carregue apenas no 1 login a página, onde se reiniciar com uso do reload não funcione novamente, mas se entrar novamente com o clique do link ou conexão direta com o link a animação volte a funcionar


**P22** · Scroll reveal e contatos

> Melhore a animação, faça com que os itens surjam a partir do momento em que há o scrolling do mouse. Na aba contatos, está embaçado os itens. Deixe-os aparecendo normalmente


**P23** · Responsividade

> Faça agora a responsibilidade entre aparelhos eletronicos, fazendo com que cubra pelo menos 7 tamanhos de aparelhos diferentes de acordo com a melhor formatação possivel


### 3.4 Registro de correções

Resumo: **4** resolvidas · **11** em parte · **6** não resolvidas · **1** sem status registrado (22 rodadas de site).

| Área | Rodadas | Leitura |
|---|---|---|
| Certificações | 5 a 12 | Oito rodadas num só componente. Maior retrabalho do projeto |
| Intro e animação | 16 a 21 | Seis rodadas, só uma parcial. Sequência de entrada nunca funcionou |
| Responsividade | 22 | Única com critério mensurável (7 tamanhos). Resolveu |
| Conteúdo, GitHub, hero | 1 a 4, 15 | Resolvidas em parte. Faltou fonte exata e arquivo exato |

Padrões que se repetiram:
1. **Pedido sem critério medível** ("mais fluido", "mais natural") não resolveu. Pedido com número (7 tamanhos) resolveu.
2. **Dois comportamentos no mesmo prompt** (R9, R21) geraram resultado parcial.
3. **Imagem quebrada sem o erro do console** (R10, R11) levou a correções visuais que não tocavam a causa.
4. **Ambiguidade de palavra** ("icon" no prompt inicial) custou duas rodadas.


#### Rodada 1 · Estrutura · Resolvido

| Campo | Registro |
|---|---|
| Problema | Primeira versão veio em um arquivo só, com a imagem embutida em base64. Não seguia o caminho `./img/` pedido. |
| Prompt de correção | P1: Estrutura do projeto (texto completo em 3.3) |
| Resultado | **Resolvido.** Projeto separado em `index.html`, `css/` e `js/`, com imagens em `img/`. |
| Aprendizado | Pedir estrutura de pastas e nomes de arquivos já no prompt inicial. |


#### Rodada 2 · Conteúdo · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | Textos em lorem, sem coerência com o pedido. Era preciso usar o currículo. |
| Prompt de correção | P3: Currículo (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Informações pessoais entraram. Os projetos do GitHub ficaram de fora. |
| Aprendizado | Listar no prompt inicial o que o currículo alimenta (resumo, formação, habilidades, contato) e deixar claro que os projetos vêm do GitHub. |


#### Rodada 3 · Projetos · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | Projetos em destaque ainda não estavam no portfólio. |
| Prompt de correção | P4: GitHub: acesso (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** A IA identificou os seis repositórios públicos. Faltou ler o conteúdo e trazê-los. |
| Aprendizado | Exigir consulta ao GitHub no prompt inicial e priorizar os repositórios fixados. |


#### Rodada 4 · Projetos · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | O portfólio mostrava repositórios recentes, não os destacados. |
| Prompt de correção | P5: GitHub: destaques (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Seis projetos configurados, dados atualizados pela API. A detecção automática de mudanças nos fixados não foi feita. A API REST pública não expõe os fixados; isso exige GraphQL com token. |
| Aprendizado | Informar a origem exata (usuário + lista dos fixados) e a estratégia de atualização. Sem token, a lista dos seis nomes deve ficar fixa no código. |


#### Rodada 5 · Certificações · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | Seção de certificações com dados provisórios. |
| Prompt de correção | P6: Certificados: dados e chaves (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Três certificados e chaves adicionados, com PT/EN/ES. Na época, sem imagem. O botão de copiar chave não aparece no `index.html` atual. |
| Aprendizado | Enviar no prompt inicial título, chave, data e arquivo de cada certificado. Pedir o botão de copiar de forma testável. |


#### Rodada 6 · Certificações · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | As imagens dos certificados precisavam aparecer nos cursos. Faltava atalho para validar. |
| Prompt de correção | P7: Certificados: imagens e validação (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Imagens e botão de validação entraram. A formatação ficou estranha. |
| Aprendizado | Descrever o layout do card (proporção, posição) junto com o pedido das imagens. |


#### Rodada 7 · Certificações · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | Formato dos certificados sem padrão e difícil de ler em alguns aparelhos. |
| Prompt de correção | P8: Certificados: padronização (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Botão único acima da lista, foto à esquerda, informações à direita, chave abaixo. As imagens ficaram com formatação estranha. |
| Aprendizado | Fixar proporção e comportamento da imagem (`object-fit`, largura máxima) no pedido. |


#### Rodada 8 · Certificações · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | Visualização do PDF ruim em alguns aparelhos. |
| Prompt de correção | P9: Certificados: abrir com um clique (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Abre com um clique e se adapta às telas. Não mostra prévia do PDF. |
| Aprendizado | Pedir modal responsivo com zoom e tela cheia e exigir teste em desktop e celular. |


#### Rodada 9 · Certificações · Não resolvido

| Campo | Registro |
|---|---|
| Problema | Faltava pré-visualização e, ao mesmo tempo, abrir o documento completo em outra página. |
| Prompt de correção | P10: Certificados: pré-visualização (texto completo em 3.3) |
| Resultado | **Não resolvido.** A prévia seguiu o padrão antigo e o certificado não abria em outra página. |
| Aprendizado | Dois comportamentos no mesmo pedido confundiram a IA. Separar em dois prompts e definir tamanho da prévia e ação do clique. |


#### Rodada 10 · Certificações · Não resolvido

| Campo | Registro |
|---|---|
| Problema | Imagem precisava ocupar 100% da caixa e o card inteiro precisava ser clicável. |
| Prompt de correção | P11: Certificados: imagem 100% e card clicável (texto completo em 3.3) |
| Resultado | **Não resolvido.** Imagem quebrada. |
| Aprendizado | Provável causa: caminho ou nome do arquivo. Os PDFs têm espaço, acento e erro de grafia (`Pyhton`). Padronizar nomes (`python.pdf`, sem acento nem espaço) antes de pedir qualquer layout. |


#### Rodada 11 · Certificações · Não resolvido

| Campo | Registro |
|---|---|
| Problema | Imagem quebrada na seção. |
| Prompt de correção | P12: Certificados: imagem quebrada (texto completo em 3.3) |
| Resultado | **Não resolvido.** As prévias não foram alteradas. |
| Aprendizado | Colar o erro do console (404) no prompt. Sem o erro, a IA corrige o visual e não a causa. |


#### Rodada 12 · Certificações · Resolvido

| Campo | Registro |
|---|---|
| Problema | A prévia quebrada precisava sair. A caixa mostraria só o texto. |
| Prompt de correção | P13: Certificados: remover prévia (texto completo em 3.3) |
| Resultado | **Resolvido.** Prévia removida. Caixa exibe "Abrir em nova aba". |
| Aprendizado | Pedir o conteúdo visual exato (texto, alinhamento, destino do clique). |


#### Rodada 13 · Habilidades · Não registrado

| Campo | Registro |
|---|---|
| Problema | Cada habilidade precisava de ícone profissional. |
| Prompt de correção | P14: Habilidades: ícones (texto completo em 3.3) |
| Resultado | **Não registrado.** Status não preenchido. No `index.html` enviado, os cards ainda usam SVGs genéricos (`skill-icon-web`, `skill-icon-db`...), não logos das tecnologias. |
| Aprendizado | O prompt inicial dizia "Não é permitido uso de icon". Foi ambíguo: eu queria dizer emoji. Escrever "sem emoji; usar logos oficiais (Devicon ou Simple Icons)". |


#### Rodada 14 · Habilidades · Resolvido

| Campo | Registro |
|---|---|
| Problema | Os ícones precisavam usar as cores naturais de cada tecnologia. |
| Prompt de correção | P15: Habilidades: cores oficiais (texto completo em 3.3) |
| Resultado | **Resolvido.** Registrado como resolvido. Conferir no navegador: o HTML enviado não mostra logos oficiais. |
| Aprendizado | Nomear a biblioteca e a fonte das cores (cor oficial da marca). |


#### Rodada 15 · Hero · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | Foto pessoal precisava aparecer ao lado do nome. |
| Prompt de correção | P16: Hero: foto (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Foto no hero (`./img/foto.jpeg`). Alinhamento em outros aparelhos ainda precisa de teste. |
| Aprendizado | Informar nome exato do arquivo (`foto.jpeg`, não `foto.jpg`), posição e formato (círculo, arredondado) no prompt inicial. |


#### Rodada 16 · Intro · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | A página precisava de uma animação inicial inspirada no buraco negro do CodePen, antes do portfólio. |
| Prompt de correção | P17: Intro: buraco negro (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Intro com paleta `#ad83e5`/`#e0d5ed`, compressão e expansão, transição para o site. Pouco suave. |
| Aprendizado | Definir duração de cada fase, transição final e respeito a `prefers-reduced-motion`. |


#### Rodada 17 · Intro · Não resolvido

| Campo | Registro |
|---|---|
| Problema | A animação precisava parecer natural e os itens deviam surgir em sequência. |
| Prompt de correção | P18: Intro: naturalidade e ordem (texto completo em 3.3) |
| Resultado | **Não resolvido.** A fluidez do buraco não foi aplicada como pedido e não houve sequência. |
| Aprendizado | Descrever a sequência com tempos (ms) e easing, não só a ordem. |


#### Rodada 18 · Intro · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | A intro não encaixava com a entrada dos itens. |
| Prompt de correção | P19: Intro: fluidez (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Resolveu parte. A transição ainda não conectava intro e conteúdo sem corte. |
| Aprendizado | Pedir a conexão em termos técnicos: o fim da expansão dispara a entrada do primeiro item. |


#### Rodada 19 · Intro · Não resolvido

| Campo | Registro |
|---|---|
| Problema | Todos os elementos apareciam ao mesmo tempo. |
| Prompt de correção | P20: Intro: intervalo entre itens (texto completo em 3.3) |
| Resultado | **Não resolvido.** Continuaram aparecendo juntos. |
| Aprendizado | Informar o intervalo em números (ex.: 300 ms entre blocos). |


#### Rodada 20 · Intro · Não resolvido

| Campo | Registro |
|---|---|
| Problema | Nada sumia ou aparecia como esperado. Faltava controlar quando a intro roda. |
| Prompt de correção | P21: Intro: ordem e primeira visita (texto completo em 3.3) |
| Resultado | **Não resolvido.** Tudo ainda carregava ao mesmo tempo. Ordem pedida: foto, nav, ícones, resto. |
| Aprendizado | Definir ordem, tempos e a regra de sessão (`sessionStorage`: roda só na primeira entrada da aba; reload não repete). |


#### Rodada 21 · Scroll reveal · Resolvido em parte

| Campo | Registro |
|---|---|
| Problema | Itens não surgiam com a rolagem. Contatos apareciam embaçados. |
| Prompt de correção | P22: Scroll reveal e contatos (texto completo em 3.3) |
| Resultado | **Resolvido em parte.** Layout de Contato corrigido. A animação por rolagem continua sem o efeito esperado. |
| Aprendizado | Separar em dois prompts: um para o blur de Contato, outro para o reveal. |


#### Rodada 22 · Responsividade · Resolvido

| Campo | Registro |
|---|---|
| Problema | A página precisava se adaptar a vários tamanhos de tela. |
| Prompt de correção | P23: Responsividade (texto completo em 3.3) |
| Resultado | **Resolvido.** Testada e funcional. |
| Aprendizado | Listar os tamanhos-alvo no pedido. Funcionou porque o pedido era mensurável. |


### 3.5 Resultado final

- Repositório: *((https://github.com/kaicklima284737/Portfolio_Pessoal_2026.2))*
- Deploy: *((https://portfoliopessoal20262.vercel.app))*

#### Reflexão

> Rascunho a partir dos registros. Reescreva com a sua voz.

**Ficou como imaginei**
- Paleta, tipografia e clima espacial.
- Estrutura das seções, Career Path e Contato.
- Responsividade nos 7 tamanhos.
- Dados reais vindos do currículo e do GitHub.

**O que ainda mudaria**
- Sequência de entrada (foto, nav, ícones, resto). Não funcionou em seis rodadas.
- Suavidade do buraco negro.
- Ícones das habilidades com logos oficiais.
- Certificados: renomear os PDFs e, se der, voltar a ter prévia.
- Detecção automática dos projetos fixados.

**O que aprendi sobre prompt**
- Um problema por prompt.
- Número no lugar de adjetivo (ms, px, quantidade).
- Nome exato de arquivo, pasta e biblioteca.
- Colar o erro do console, não só descrever o visual.
- Definir o que **não** pode mudar.

---

## 4. QA

Checklist do checkpoint: abrir a página, clicar em tudo, testar em todas as telas.

| Item | Como testar | Status |
|---|---|---|
| Intro com Enter | Teclar Enter na intro | A testar |
| Intro com clique e toque | Clicar e tocar | A testar |
| Intro só na primeira visita | Reload (não repete) e novo acesso pelo link (repete) | Não funciona (R20) |
| Sequência foto → nav → ícones → resto | Observar após a intro | Não funciona (R17, R19, R20) |
| `prefers-reduced-motion` | Ativar no sistema | A testar |
| Menu mobile (☰) | Abrir, fechar, navegar | A testar |
| Troca PT / EN / ES | Clicar nos 3 botões, conferir todas as seções | A testar |
| Scroll reveal | Rolar a página | Parcial (R21) |
| Partículas | Celular antigo e moderno, aba oculta | A testar |
| Career Path | Alternância esquerda/direita, empilha no celular | A testar |
| Certificados: abrir PDF | Clicar nos 3 cards | **Risco:** nomes dos arquivos (ver 5) |
| Validar Certificado Fiap | Abre `on.fiap.com.br/validar-certificado/` | A testar |
| Habilidades | Ícones e cores | Pendente (R13, R14) |
| Projetos do GitHub | Carregar, sem rede, limite da API | A testar |
| Contato | Links, `tel:`, `mailto:`, download do currículo | Layout corrigido (R21) |
| Responsividade | 320, 360, 390, 768, 1024, 1366 e 1920 px | Resolvido (R22) |

---

## 5. Pendências

Encontradas na leitura do `index.html` enviado.

| 1 | Projetos dependem da API pública do GitHub (60 requisições/hora por IP) | Fallback estático ou `projects.json` gerado por GitHub Action |
