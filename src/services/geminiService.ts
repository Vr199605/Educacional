import { Activity, ActivityType, DifficultyLevel } from '../types/activity';
import { getStoredApiKey } from './activityStore';
import { generateTemplateActivity, GenerationParams } from './templateGenerator';

export async function generateActivityWithAI(params: GenerationParams): Promise<Partial<Activity>> {
  const apiKey =
    getStoredApiKey() ||
    (import.meta.env.VITE_GEMINI_API_KEY as string) ||
    '';

  // If no API key configured, use high-fidelity pedagogical template generator
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 800));
    return generateTemplateActivity(params);
  }

  const prompt = buildGeminiPrompt(params);
  const modelsToTry = ['gemini-3.5-flash', 'gemini-3.5-flash-lite'];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.warn(`Model ${model} returned error, trying next fallback:`, errData);
        continue;
      }

      const data = await response.json();
      let textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textOutput) continue;

      // Clean markdown code blocks if present
      textOutput = textOutput.trim();
      if (textOutput.startsWith('```json')) {
        textOutput = textOutput.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (textOutput.startsWith('```')) {
        textOutput = textOutput.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsed = JSON.parse(textOutput);
      return {
        titulo: parsed.titulo || `${params.tema} — ${params.disciplina}`,
        introducao: parsed.introducao || '',
        questoes: Array.isArray(parsed.questoes) ? parsed.questoes : [],
        gabarito: parsed.gabarito || '',
        planoAula: parsed.planoAula || null,
        flashcards: Array.isArray(parsed.flashcards) ? parsed.flashcards : null,
        mapaMental: parsed.mapaMental || null,
        cruzadinha: parsed.cruzadinha || null,
        resumo: parsed.resumo || null,
      };
    } catch (err) {
      console.warn(`Error generating with ${model}:`, err);
    }
  }

  // If all Gemini models fail or rate limit occurs, use the pedagogical generator
  console.info('Falling back to built-in pedagogical template generator.');
  return generateTemplateActivity(params);
}

function buildGeminiPrompt(params: GenerationParams): string {
  const { type, disciplina, tema, subtema, ano, dificuldade, quantidade, objetivo, contexto } = params;

  return `Você é o EduCreator AI, uma IA pedagógica especialista em Educação Básica brasileira e alinhamento à BNCC.
Sua missão é gerar um material didático de altíssima qualidade pedagógica para professores brasileiros.

DADOS DA SOLICITAÇÃO:
- Tipo de Material: ${type}
- Disciplina: ${disciplina}
- Ano Escolar: ${ano}
- Tema: ${tema} ${subtema ? `(Subtema: ${subtema})` : ''}
- Nível de Dificuldade: ${dificuldade}
- Quantidade de Itens: ${quantidade || 10}
${objetivo ? `- Objetivo de Aprendizagem: ${objetivo}` : ''}
${contexto ? `- Contexto / Recomendações do Professor: ${contexto}` : ''}

REQUISITOS PEDAGÓGICOS FUNDAMENTAIS:
1. Alinhamento com a BNCC: cite o código da habilidade (ex: EF06MA01, EM13CHS102) e a competência geral correspondente.
2. IMPORTANTE PARA QUESTÕES DISCURSIVAS ("tipo": "dissertativa"):
   Para CADA questão discursiva, forneça uma resolução passo a passo extremamente didática, estruturada e SEM FALHAS contendo:
   - "passo1Interpretacao": Leitura atenta, identificação do que é pedido e conceitos fundamentais envolvidos.
   - "passo2Desenvolvimento": Raciocínio lógico detalhado, premissas teóricas e justificativa da relação causa-efeito ou cálculo.
   - "passosDetalhados": array de etapas com "passo" (número), "titulo", "conteudo" e "dicaDidatica" (dica pedagógica de ouro para a correção ou mediação do professor).
   - "passo3Conclusao": Síntese de fechamento demonstrando o domínio do conceito.
   - "respostaEsperada": Resposta modelo perfeita que o estudante deve redigir.
   - "criteriosCorrecao": Objeto com "notaIntegral" (o que pontua 100%), "notaParcial" (critérios para 50% a 70%) e "errosComuns" (erros conceituais ou descuidos para penalizar).

3. FORMATO DO JSON DE RETORNO:
Retorne RIGOROSAMENTE apenas um objeto JSON com a seguinte estrutura:
{
  "titulo": "Título formal do material",
  "introducao": "Texto introdutório contextualizado com a realidade dos alunos",
  "questoes": [
    {
      "numero": 1,
      "tipo": "multipla-escolha" ou "dissertativa",
      "enunciado": "Texto claro da questão",
      "alternativas": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "resposta": "A" (para objetiva) ou texto explicativo (para discursiva),
      "comentario": "Comentário pedagógico",
      "competencia": "Competência Geral da BNCC",
      "habilidade": "Código da habilidade BNCC",
      "linhasResposta": 6,
      "resolucaoPassoAPasso": {
        "passo1Interpretacao": "...",
        "passo2Desenvolvimento": "...",
        "passosDetalhados": [
          { "passo": 1, "titulo": "...", "conteudo": "...", "dicaDidatica": "..." }
        ],
        "passo3Conclusao": "...",
        "respostaEsperada": "...",
        "criteriosCorrecao": {
          "notaIntegral": "...",
          "notaParcial": "...",
          "errosComuns": "..."
        }
      }
    }
  ],
  "gabarito": "Gabarito consolidado",
  "planoAula": {
    "tema": "...",
    "disciplina": "...",
    "ano": "...",
    "duracao": "2 aulas (100 min)",
    "habilidadesBNCC": ["..."],
    "objetivos": ["..."],
    "conteudo": ["..."],
    "metodologia": "...",
    "recursos": ["..."],
    "avaliacao": "...",
    "cronograma": [
      { "etapa": "...", "tempo": "...", "descricao": "..." }
    ]
  },
  "flashcards": [
    { "frente": "...", "verso": "...", "dica": "...", "categoria": "..." }
  ],
  "mapaMental": {
    "central": "...",
    "ramos": [
      { "titulo": "...", "subitens": ["..."] }
    ]
  },
  "cruzadinha": {
    "palavras": [
      { "palavra": "PALAVRA", "dica": "Dica clara..." }
    ]
  },
  "resumo": {
    "secoes": [
      { "titulo": "...", "conteudo": "...", "destaque": "...", "imagem": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" }
    ],
    "pontosChave": ["..."],
    "dicasEstudo": ["..."]
  }
}`;
}
