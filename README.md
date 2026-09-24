# EduCreator AI 🎓🤖

Plataforma inteligente para professores e educadores gerarem provas estruturadas, listas de exercícios, quizzes gamificados, planos de aula alinhados à BNCC, flashcards, mapas mentais, cruzadinhas interativas e resumos didáticos com inteligência artificial (**Google Gemini**).

---

## ✨ Principais Funcionalidades

- **Resolução Passo a Passo Didática em Questões Discursivas**:
  - Passo 1: Interpretação e mapeamento dos conceitos-chave.
  - Passo 2: Desenvolvimento estruturado com raciocínio lógico e dicas didáticas pedagógicas.
  - Passo 3: Conclusão articulada e resposta esperada (gabarito modelo).
  - Rubrica de correção para o professor (Nota integral, parcial e erros comuns).
  - Alinhamento oficial com a BNCC.
- **8 Ferramentas de Criação Pedagógica**:
  1. **Lista de Exercícios** (múltipla escolha e discursivas).
  2. **Prova Estruturada** com cabeçalho oficial de escola e linhas pautadas prontas para impressão A4.
  3. **Quiz Gamificado** interativo com pontuação e confetes.
  4. **Plano de Aula** alinhado à BNCC com cronograma minuto a minuto.
  5. **Flashcards** com animação 3D de rotação para repetição espaçada.
  6. **Mapa Mental** com nós e ramificações hierárquicas.
  7. **Cruzadinha Inteligente** com grade 2D e dicas Horizontais/Verticais.
  8. **Resumo Ilustrado** com síntese e tópicos conceituais.
- **Impressão A4 & Exportação**:
  - Folha de prova pronta para aplicar em sala de aula (`Ctrl + P`).
  - Alternância de gabarito com 1 clique (para impressão da versão do aluno ou do professor).
  - Cópia limpa para Word e Google Docs.
- **Gestão Escolar**:
  - Biblioteca com busca e filtros em tempo real.
  - Favoritos e gerenciamento de Minhas Turmas.

---

## 🚀 Como Rodar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd educreator-ai
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar a chave da API do Gemini
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```env
VITE_GEMINI_API_KEY=sua_chave_do_gemini_aqui
```
*(Você pode obter sua chave gratuitamente em [Google AI Studio](https://aistudio.google.com/app/apikey))*.

### 4. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador: `http://localhost:5173/`
