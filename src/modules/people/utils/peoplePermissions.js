export function canCreatePerson(role) {
  return ["admin", "pastor", "obreiro"].includes(role);
}
