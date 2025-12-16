export function canViewEvent(role) {
  return true;
}

export function canCreateEvent(role) {
  return role === "admin" || role === "pastor";
}

export function canEditEvent(role) {
  return role === "admin" || role === "pastor";
}

export function canDeleteEvent(role) {
  return role === "admin" || role === "pastor";
}
