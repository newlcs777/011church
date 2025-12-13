
let events = [
  {
    id: 1,
    titulo: "Culto de Domingo",
    descricao: "Celebração dominical às 18h.",
    data: "2025-02-20",
    horario: "18:00",
    local: "011 Church - Santo Amaro",
  },
];

export function getEvents() {
  return events;
}

export function getEvent(id) {
  return events.find((e) => e.id === Number(id));
}

export function createEvent(evt) {
  evt.id = Date.now();
  events.push(evt);
}

export function updateEvent(updated) {
  events = events.map((e) => (e.id === updated.id ? updated : e));
}

export function deleteEvent(id) {
  events = events.filter((e) => e.id !== Number(id));
}
