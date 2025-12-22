export function canViewDna(user) {
  return true; // todos
}

export function canViewPeopleList(user) {
  return ["obreiro", "lider", "pastor", "admin"].includes(user?.role);
}

export function canCreatePerson(user) {
  return ["obreiro", "lider", "pastor", "admin"].includes(user?.role);
}

export function canEditPerson(user) {
  return ["obreiro", "lider", "pastor", "admin"].includes(user?.role);
}
