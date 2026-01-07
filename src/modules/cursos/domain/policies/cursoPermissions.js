// src/modules/cursos/domain/policies/cursoPermissions.js

/**
 * Regras de permissão do domínio Curso
 * A UI apenas consulta. Não decide.
 */

export function canViewCurso(user) {
  // hoje todo mundo pode ver
  return true;
}

export function canCreateCurso(user) {
  if (!user) return false;

  return ["admin", "pastor", "lider"].includes(user.role);
}

export function canEditCurso(user) {
  if (!user) return false;

  return ["admin", "pastor", "lider"].includes(user.role);
}

export function canDeleteCurso(user) {
  if (!user) return false;

  return ["admin", "pastor", "lider"].includes(user.role);
}
