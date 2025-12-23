
export function canViewCurso() {
  return true;
}

export function canCreateCurso(role) {
  return role === "admin" || role === "pastor" || role === "lider";
}

export function canEditCurso(role) {
  return role === "admin" || role === "pastor" || role === "lider";
}

export function canDeleteCurso(role) {
  return role === "admin" || role === "pastor" || role === "lider";
}
