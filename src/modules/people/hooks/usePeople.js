import { createPerson as createPersonService } from "../services/peopleService";

export default function usePeople() {
  async function createPerson(data) {
    return createPersonService({
      ...data,
      status: "visitante",
      createdAt: new Date(),
    });
  }

  return { createPerson };
}
