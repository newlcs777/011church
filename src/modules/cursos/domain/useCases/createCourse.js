// src/modules/cursos/domain/useCases/createCourse.js

import { Course } from "../entities/Course";

/**
 * Cria um novo curso.
 * Regras:
 * - Título e descrição são obrigatórios
 * - Não pode existir curso com o mesmo título
 */
export async function createCourse({
  courseRepository,
  data,
}) {
  if (!data) {
    throw new Error("Dados do curso são obrigatórios");
  }

  const { title, description } = data;

  if (!title) {
    throw new Error("Título do curso é obrigatório");
  }

  if (!description) {
    throw new Error("Descrição do curso é obrigatória");
  }

  const alreadyExists = await courseRepository.existsByTitle(title);
  if (alreadyExists) {
    throw new Error("Já existe um curso com esse título");
  }

  // ✅ GERA ID NO DOMÍNIO
  const course = new Course({
    id: crypto.randomUUID(),
    title,
    description,
    status: "draft",
    createdAt: new Date(),
    lessons: [],
  });

  await courseRepository.save(course);

  return course;
}
