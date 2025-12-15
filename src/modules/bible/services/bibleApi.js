// src/modules/bible/services/bibleApi.js
// ⚠️ ATENÇÃO:
// Este serviço NÃO retorna texto bíblico.
// Ele existe apenas para metadados (se necessário).

export function bibleApiDisabled() {
  throw new Error(
    "Texto bíblico deve vir exclusivamente do JSON local (Almeida RC)."
  );
}
