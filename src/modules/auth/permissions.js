// src/modules/auth/permissions.js

/**
 * Papéis válidos no sistema:
 * - admin
 * - secretaria
 * - pastor
 * - lider
 * - obreiro
 * - aluno
 * - visitante
 */

/* ===============================
   HELPERS BÁSICOS
================================ */

export function canEditMinistry(user) {
  return (
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider" ||
    user?.role === "secretaria"
  );
}

export function canViewMinistry(user) {
  return Boolean(user);
}

export function isAdmin(user) {
  return user?.role === "admin";
}

export function isSecretary(user) {
  return user?.role === "secretaria";
}

export function isLeadership(user) {
  return (
    user?.role === "admin" ||
    user?.role === "pastor" ||
    user?.role === "lider"
  );
}

export function isSpiritualLeadership(user) {
  return (
    user?.role === "pastor" ||
    user?.role === "lider"
  );
}

export function isReadOnly(user) {
  return (
    user?.role === "obreiro" ||
    user?.role === "aluno" ||
    user?.role === "visitante"
  );
}

/* ===============================
   FUTURO (FIREBASE READY)
================================ */

export function canEditSpecificMinistry(user, ministryKey) {
  if (!user || !user.ministries) return false;

  const roleInMinistry = user.ministries[ministryKey];

  return ["admin", "pastor", "lider"].includes(roleInMinistry);
}
