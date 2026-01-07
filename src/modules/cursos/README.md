Módulo Cursos — Clean Architecture
Visão Geral

O módulo Cursos é responsável pela gestão de cursos e aulas do sistema da igreja, incluindo criação, edição, publicação, arquivamento e exclusão definitiva.

Ele foi estruturado seguindo Clean Architecture, com separação clara de responsabilidades, permitindo:

Manutenção segura

Evolução sem acoplamento à UI

Reuso do domínio com qualquer framework no futuro

Estrutura de Pastas
cursos/
├── application/
│   └── courseService.js
│
├── domain/
│   ├── entities/
│   │   ├── Course.js
│   │   └── Lesson.js
│   ├── repositories/
│   │   └── CourseRepository.js
│   ├── useCases/
│   │   ├── createCourse.js
│   │   ├── fetchCourses.js
│   │   ├── updateCourse.js
│   │   ├── archiveCourse.js
│   │   ├── deleteCourse.js
│   │   └── ...
│   └── policies/
│       └── cursoPermissions.js
│
├── infra/
│   ├── CourseRepositoryFirebase.js
│   └── index.js
│
├── store/
│   ├── cursosSlice.js
│   └── cursosThunks.js
│
├── hooks/
│   └── useCursos.js
│
├── ui/
│   ├── useCursosController.js
│   ├── useCursoEditorController.js
│   └── useCursoDetailsController.js
│
├── pages/
│   ├── CursosList.jsx
│   ├── CursoEditor.jsx
│   └── CursoDetails.jsx
│
└── components/
    ├── CursoForm.jsx
    ├── CursoCard.jsx
    └── CursoSearch.jsx

Responsabilidades por Camada
Domain

Regra de negócio pura

Não conhece React, Redux, Firebase ou UI

Contém:

Entidades (Course, Lesson)

Casos de uso

Políticas de permissão

Contratos de repositório

⚠️ Domain NUNCA importa nada de fora

Application

Orquestra casos de uso

Converte entidades em DTOs

Define o que sai para a UI

Não conhece React nem Redux

Exemplo:

courseService.createCourse

courseService.fetchCourses

Infra

Implementação técnica (Firebase)

Converte dados do banco ↔ domínio

Nunca contém regra de negócio

Exemplo:

CourseRepositoryFirebase

Store (Redux)

Apenas leitura e cache

Nunca recebe entidades de domínio

Trabalha somente com DTOs simples

Redux não cria nem altera regras.

UI / Controllers

Controllers são a fronteira entre UI e Application

Centralizam:

Permissões

Decisão create vs update

Fluxo de ações

Coordenação entre Redux, Service e Router

Exemplo:

UI → Controller → Application → Domain → Infra

Pages

Somente renderização

Não importam:

Domain

Application

Redux

Auth

Falam exclusivamente com Controllers

Fluxos Importantes
Criar ou Atualizar Curso
Page
→ Controller (decide create/update)
→ courseService
→ useCase
→ repository
→ Firebase

Excluir Curso (Hard Delete)
Page
→ Controller
→ courseService.deleteCourse
→ useCase
→ repository.delete
→ Firebase

Arquivar Curso (Soft Delete)
Page
→ Controller
→ courseService.archiveCourse
→ status = "archived"
→ save

Regras Importantes do Módulo

Pages não podem importar Domain ou Application

Policies só existem no Domain

Decisão de permissão sempre no Controller

Create vs Update nunca na Page

Redux nunca recebe entidades

Infra nunca sobe dependência

Diferença entre Archive e Delete
Ação	Comportamento
archiveCourse	Marca o curso como arquivado
deleteCourse	Remove definitivamente do banco

A UI deve deixar isso explícito para o usuário.

Estado Atual do Módulo

Clean Architecture aplicada

Fronteiras fechadas

Controllers padronizados

Seguro para crescer

Pronto para replicar em outros módulos

Observação Final

Este módulo serve como referência oficial para novos módulos do sistema.
Qualquer novo domínio deve seguir o mesmo padrão estrutural e de responsabilidade.