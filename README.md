# Portfólio · Kaick Lima Silva

Landing page pessoal de estudante de Engenharia de Software (FIAP). Tema espacial em roxo, com vidro fosco, partículas e uma intro de buraco negro.

Projeto do **Checkpoint 6 · Vibecoding**: construído com IA generativa (Claude) e documentado passo a passo.

- **Deploy:** *(portfoliopessoal20262.vercel.app)*
- **Processo completo:** [arquiteture.md](./arquiteture.md)

---

## Destaques

- Intro interativa: buraco negro que comprime, expande e revela a página (Enter, tecla, clique ou toque)
- Fundo de partículas ligadas por linhas, independente do scroll
- Scroll reveal (itens surgem a partir de 25% visíveis)
- Efeito typewriter no hero
- Três idiomas: Português (Brasil), English (US), Español
- Projetos em destaque lidos do GitHub
- Certificações FIAP com chave de validação e atalho para o validador oficial
- Responsivo, com respeito a `prefers-reduced-motion`

## Seções

| Seção | Conteúdo |
|---|---|
| Início | Nome, curso, foto, typewriter e redes |
| Quem sou eu | Resumo e Career Path (3 etapas de formação) |
| Certificações | Design Thinking, Formação Social e Sustentabilidade, Python |
| Habilidades | Front-end, back-end, APIs, bancos, Git, UX, Office |
| Projetos | Seis projetos em destaque do GitHub |
| Contato | LinkedIn, GitHub, e-mail, telefone e download do currículo |

## Tecnologias

HTML5, CSS3 e JavaScript puro. Sem framework e sem biblioteca JS.
Fontes (Google Fonts): Edu NSW ACT Hand Cursive, Rubik Storm, Source Code Pro, Nunito Sans, Open Sans, Roboto.
Deploy: Vercel.

## Estrutura

```
├── index.html
├── css/style.css
├── js/script.js
├── img/            # fotos, fundo e PDFs dos certificados
├── docs/           # currículo em PDF
├── arquiteture.md  # arquitetura, IDV, prompts e correções
└── README.md
```

## Como rodar

```bash
git clone https://github.com/kaicklima284737/NOME-DO-REPO.git
cd NOME-DO-REPO
python -m http.server 5500
```

Abra `http://localhost:5500`. Também funciona com a extensão Live Server do VS Code.

## Como editar

| O que | Onde |
|---|---|
| Textos e idiomas | Atributos `data-i` no `index.html` e dicionário de tradução no `js/script.js` |
| Cores | Variáveis CSS em `:root` no `css/style.css` |
| Projetos | Lista dos repositórios no `js/script.js` |
| Certificados | Seção `#certificacoes` no `index.html` e PDFs em `img/` |
| Currículo | Substituir o arquivo em `docs/` |

## Paleta

| Cor | Hex | Uso |
|---|---|---|
| Fundo | `#1A0B2E` | Base |
| Secundária | `#3d176f` | Cards |
| Destaque | `#6c3fa7` | Botões, hover |
| Terciária | `#ad83e5` · `#e0d5ed` | Partículas, detalhes, títulos |
| Texto | `#F5F5F5` | Texto corrido |

## Status

| Item | Situação |
|---|---|
| Layout, paleta, tipografia | Pronto |
| Idiomas, partículas, typewriter | Pronto |
| Responsividade (7 tamanhos) | Pronto |
| Sequência de entrada após a intro | Em ajuste |
| Ícones oficiais em Habilidades | Em ajuste |
| Projetos fixados automáticos | Lista fixa de seis repositórios |

Lista completa de pendências em [arquiteture.md](./arquiteture.md#5-pendências).

## Referências

[Galaxy Portfolio](https://wantid.github.io/galaxy-portfolio/) · [New Web Portfolio](https://new-webportfolio.vercel.app/) · [Particle Network](https://leonkohli.dev/projects/particle-network) · [Black Hole (CodePen)](https://codepen.io/StarKnightt/pen/VYvZeom)

## Autor

**Kaick Lima Silva** · São Paulo, SP
[LinkedIn](https://www.linkedin.com/in/kaick-lima) · [GitHub](https://github.com/kaicklima284737) · kaicklimatech@gmail.com