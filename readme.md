DOCUMENTACAO INTERNA DO PROJETO 011 APP
1 VISÃO GERAL

Este projeto e uma aplicacao web desenvolvida em React com Vite para a gestao administrativa e operacional da 011 Church.

O objetivo principal do sistema e centralizar informacoes e processos da igreja em um unico aplicativo, permitindo organizacao, escalabilidade e manutencao segura ao longo do tempo.

O projeto esta em uso real e foi construido de forma incremental. Qualquer manutencao futura deve respeitar essa caracteristica.

2 PRINCIPIOS DE MANUTENCAO

Antes de alterar qualquer parte do codigo, lembrar sempre:

Nao refatorar grandes partes de uma vez
Nao remover codigo legado sem planejamento
Nao alterar contratos de dados existentes
Sempre testar manualmente cada alteracao

Este projeto nao esta baguncado. Ele esta em transicao controlada.

3 TECNOLOGIAS UTILIZADAS

Frontend
React com Vite

Gerenciamento de estado
Redux Toolkit
createSlice
createAsyncThunk

Roteamento
React Router

Backend como servico
Firebase Authentication
Firestore Database

Estilizacao
Tailwind CSS
CSS global complementar

4 ESTRUTURA GERAL DO PROJETO
src

Pasta principal da aplicacao. Todo o codigo do sistema esta dentro dela.

src/components

Contem componentes reutilizaveis e genericos de interface.

Responsabilidade
Exibir informacoes
Receber dados via props
Controlar apenas logica visual

Nao deve
Conter regra de negocio
Acessar Firebase diretamente
Alterar estado global diretamente

src/layout

Responsavel pela estrutura visual principal do sistema.

Contem
Sidebar
Header
Estrutura base das paginas

Nao deve conter regra de negocio ou chamadas de API.

src/pages

Contem as paginas principais acessadas pelas rotas.

Responsabilidade
Orquestrar componentes
Consumir dados do Redux
Controlar fluxo da tela

Evitar colocar logica pesada diretamente aqui.

src/routes

Centraliza todas as rotas da aplicacao.

Responsabilidade
Mapear URLs
Controlar navegacao
Proteger rotas quando necessario

Nunca espalhar rotas fora desta pasta.

src/store

Configuracao global do Redux.

Responsabilidade
Combinar reducers
Definir estrutura do estado global

Observacao
Existem reducers novos e legados convivendo. Isso e proposital e temporario.

5 MODULOS DO SISTEMA

Todos os dominios do sistema vivem dentro de src/modules.

Cada modulo representa uma area real do negocio.

src/modules/auth

Responsavel pela autenticacao.

Funcoes
Login
Logout
Controle do usuario autenticado

Este modulo conversa diretamente com o Firebase Authentication.

src/modules/members

Modulo mais importante do sistema.

Responsabilidade
Cadastro global de membros
Fonte unica da verdade para dados de pessoas

Regras criticas
Todo membro deve existir aqui primeiro
Nenhum outro modulo deve criar membros
Outros modulos apenas vinculam membros existentes

Qualquer alteracao aqui impacta todo o sistema.

src/modules/ministries

Modulo legado parcial.

Responsabilidade
Manter compatibilidade com estrutura antiga
Exibir membros por ministerio

Restricoes
Nao criar novos membros
Apenas leitura ou manutencao pontual

Este modulo sera removido apos migracao completa.

src/modules/events

Responsavel pela gestao de eventos.

Funcoes
Criacao de eventos
Listagem
Exibicao de informacoes

src/modules/comunicados

Responsavel pela comunicacao interna.

Funcoes
Criacao de comunicados
Exibicao de avisos
Centralizacao de informacoes importantes

src/modules/cursos

Modulo de capacitacao.

Responsabilidade
Gerenciar cursos
Organizar aulas
Base para crescimento educacional

Ainda em evolucao.

src/modules/dna

Responsavel pela gestao de DNAs.

DNAs sao pequenos grupos vinculados a membros.

Funcoes
Associar membros a DNAs
Organizar grupos

Depende diretamente do modulo members.

src/modules/home

Tela inicial do sistema.

Responsabilidade
Dashboard
Atalhos para modulos
Visao geral do sistema

Nao deve conter regra de negocio pesada.

6 FIREBASE

Configuracao localizada em src/firebase.

Estado atual
Alguns arquivos acessam Firebase diretamente

Direcao futura
Centralizar acesso via src/lib/firebase.js
Componentes nao devem acessar Firebase diretamente
Services devem ser a unica camada de acesso

Migrar isso de forma gradual.

7 REDUX E ESTADO GLOBAL

Regras importantes

Estado global apenas quando necessario
Estado de tela simples deve ser local
Chamadas assincronas sempre via createAsyncThunk
Nunca mutar estado diretamente

Antes de criar um novo slice, verificar se realmente precisa ser global.

8 TELAS INCOMPLETAS

Algumas rotas ainda nao estao finalizadas.

Regra
Nunca deixar rota quebrada
Usar pagina padrao de em construcao

Arquivo sugerido
UnderConstruction.jsx