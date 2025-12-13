// src/modules/auth/permissions.js

/**
 * Papéis válidos no sistema:
 * - admin
 * - pastor
 * - lider
 * - obreiro
 *
 * Regra geral:
 * admin / pastor / lider -> gerenciam
 * obreiro -> somente leitura
 */

/* ===============================
   HELPERS BÁSICOS
================================ */

/**
 * Pode editar/criar/remover dados do ministério
 */
export function canEditMinistry(user) {
  return (
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider"
  );
}

/**
 * Pode apenas visualizar (todos logados)
 */
export function canViewMinistry(user) {
  return Boolean(user);
}

/**
 * É admin geral do sistema
 */
export function isAdmin(user) {
  return user?.role === "admin";
}

/**
 * É liderança (admin, pastor ou líder)
 */
export function isLeadership(user) {
  return (
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider"
  );
}

/* ===============================
   FUTURO (FIREBASE READY)
================================ */

/**
 * Permissão por ministério (quando evoluir o modelo)
 * Exemplo futuro:
 * user.ministries = { audio: "lider", louvor: "obreiro" }
 */
export function canEditSpecificMinistry(user, ministryKey) {
  if (!user || !user.ministries) return false;

  const roleInMinistry = user.ministries[ministryKey];

  return ["admin", "pastor", "lider"].includes(roleInMinistry);
}
