export function canViewDna() {
  return true;
}

export function canCreateDna(role) {
  return role === "admin" || role === "pastor";
}

export function canEditDna(role, dnaLeaderId, userId) {
  if (role === "admin" || role === "pastor") return true;
  if (role === "lider" && dnaLeaderId === userId) return true;
  return false;
}

export function canDeleteDna(role) {
  return role === "admin" || role === "pastor";
}
