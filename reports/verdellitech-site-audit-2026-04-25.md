# Auditoria inicial do site verdellitech.com.br (25/04/2026)

## Escopo e limitação

- URL analisada: `https://www.verdellitech.com.br`.
- Evidência obtida no ambiente: título da home **"Verdelli Tech | Consultoria Estratégica"**.
- Contexto corrigido: o site foi reposicionado nesta revisão como **B2G (vendas para governo)**.
- Limitação técnica: o ambiente não conseguiu coletar HTML completo/headers (bloqueio 403 no túnel de rede), então este documento combina o que foi possível validar com recomendações de alto impacto para sites de tecnologia B2G no Brasil.

## Diagnóstico rápido para B2G (provável cenário atual)

1. **Proposta de valor pouco específica para setor público**
   - "Consultoria Estratégica" é amplo para compras governamentais, que exigem linguagem de conformidade, risco e entrega.
2. **Possível ausência de sinais de habilitação e capacidade técnica**
   - Em B2G, credibilidade depende de certificações, atestados, experiência em contratos públicos e governança.
3. **Jornada de conversão desalinhada com ciclo público**
   - O decisor público precisa de conteúdos para fase de estudo técnico, TR, contratação e implantação.
4. **SEO possivelmente sem foco em intenção institucional**
   - Consultas B2G costumam incluir termos como "órgão público", "prefeitura", "compliance", "licitação" e "Lei 14.133".
5. **Medição de funil possivelmente genérica (modelo B2B)**
   - B2G exige medir oportunidades por órgão, modalidade e estágio pré/edital/pós-contrato.

## Melhorias recomendadas (prioridade alta)

### 1) Mensagem principal orientada a B2G

- Reescrever o hero para: **tipo de órgão + dor pública + resultado + conformidade**.
- Exemplo de headline:
  - "Soluções de TI para órgãos públicos com foco em eficiência operacional, conformidade e continuidade de serviços".
- Subheadline sugerida:
  - "Apoiamos secretarias, autarquias e empresas públicas da fase de diagnóstico à implantação, com governança, segurança e rastreabilidade."

### 2) Arquitetura de conversão para compra pública

- Substituir CTA genérico por trilha de intenção:
  - Primário: "Solicitar reunião técnica institucional".
  - Secundário: "Baixar portfólio para setor público".
  - Terciário: "Falar com especialista em contratação pública".
- Formulário com campos úteis ao B2G:
  - órgão/entidade, esfera (municipal/estadual/federal), desafio, prazo e modalidade de contratação prevista.
- Criar página de obrigado com:
  - prazo de retorno,
  - documentos institucionais disponíveis,
  - próximos passos de diagnóstico.

### 3) Prova de capacidade técnica e institucional

- Criar seção "Experiência no Setor Público" contendo:
  - casos por tipo de órgão,
  - indicadores de impacto (SLA, tempo de atendimento, redução de retrabalho, disponibilidade),
  - escopo e duração de projetos.
- Publicar artefatos de confiança:
  - políticas de segurança,
  - certificações relevantes,
  - governança de dados,
  - comprovação de equipe técnica.

### 4) Conteúdo e SEO com intenção B2G

- Criar páginas dedicadas para problemas reais do governo:
  - modernização de serviços públicos digitais,
  - segurança e governança de dados,
  - integração de sistemas legados,
  - suporte e operação com SLA.
- Criar cluster de conteúdo institucional:
  - "como estruturar projeto de TI para órgão público",
  - "boas práticas para contratação de soluções digitais",
  - "como reduzir risco de implantação em ambiente público".
- Padronizar títulos e metas com semântica pública e localidade.

### 5) Reforço de conformidade e transparência

- Destacar página de conformidade com:
  - LGPD,
  - segurança da informação,
  - controles de acesso,
  - trilhas de auditoria.
- Inserir seção "Documentação Institucional" para facilitar avaliação prévia de órgãos.
- Revisar linguagem jurídica/comercial para aderência a processos de contratação pública (sem promessas incompatíveis com edital).

### 6) Performance, acessibilidade e confiança digital

- Melhorar Core Web Vitals (principalmente mobile em redes institucionais):
  - LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Reforçar acessibilidade (WCAG): contraste, navegação por teclado, labels e estrutura semântica.
- Exibir rodapé institucional robusto (CNPJ, endereço, canais oficiais, política de privacidade, termos).

### 7) Analytics de pipeline público

- Implementar GA4 + GTM + Search Console com eventos específicos:
  - download de portfólio institucional,
  - envio de formulário por órgão,
  - clique em CTA de reunião técnica,
  - visualização de página de conformidade/documentação.
- Conectar com CRM para classificar oportunidades por:
  - esfera,
  - órgão,
  - estágio (prospecção, estudo técnico, edital, execução).
- Criar dashboard mensal com métricas de aquisição e maturidade de oportunidade B2G.

## Backlog de implementação (30 dias)

### Semana 1 — Posicionamento B2G e base institucional

- Ajustar hero, mensagens e CTAs para linguagem de setor público.
- Criar seção de conformidade e documentação institucional.
- Configurar mensuração (GA4/GTM/GSC) com eventos B2G.

### Semana 2 — Páginas estratégicas e captura qualificada

- Publicar páginas de solução por dor pública.
- Publicar landing de portfólio para órgãos públicos.
- Revisar formulários para qualificação institucional.

### Semana 3 — Autoridade e prova de execução

- Publicar 2 a 3 cases de projetos com indicadores objetivos.
- Publicar conteúdo educativo para apoio à tomada de decisão pública.
- Otimizar performance e acessibilidade.

### Semana 4 — Operação comercial e otimização contínua

- Ajustar funil com base nas primeiras conversões.
- Implementar rotina de follow-up institucional (SLA por estágio).
- Definir plano editorial de 90 dias para demanda pública.

## KPIs recomendados para B2G

- Conversões qualificadas de órgãos públicos por mês.
- Taxa de avanço por estágio (lead institucional → reunião técnica → oportunidade formal).
- Tempo médio até primeiro contato técnico.
- Taxa de download de portfólio/documentação institucional.
- Participação do tráfego orgânico em páginas de solução B2G.

## Próximos passos para auditoria 100% precisa

Para uma análise cirúrgica, coletar:

1. export do GA4 (últimos 90 dias),
2. acesso ao Search Console,
3. relatório do PageSpeed (mobile + desktop),
4. mapa de páginas + foco de cada serviço para órgãos públicos,
5. materiais institucionais usados hoje (portfólio, atestados, certificações, políticas).
