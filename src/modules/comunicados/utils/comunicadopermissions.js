export function canViewComunicado(role) {
  return true;
}

export function canCreateComunicado(role) {
  return role === "admin" || role === "pastor";
}

export function canEditComunicado(role) {
  return role === "admin" || role === "pastor";
}

export function canDeleteComunicado(role) {
  return role === "admin" || role === "pastor";
}
