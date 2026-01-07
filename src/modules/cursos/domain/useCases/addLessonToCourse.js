// src/modules/cursos/domain/useCases/addLessonToCourse.js

import { Lesson } from "../entities/Lesson";

/**
 * Adiciona uma aula a um curso existente.
 * Regras:
 * - Curso precisa existir
 * - Apenas ADMIN pode adicionar aula em curso publicado
 * - Curso arquivado não aceita alteração
 */
export async function addLessonToCourse({
  courseRepository,
  courseId,
  lessonData,
  user,
}) {
  if (!courseId) {
    throw new Error("courseId é obrigatório");
  }

  if (!user) {
    throw new Error("Usuário é obrigatório");
  }

  // 1️⃣ Busca o curso existente
  const course = await courseRepository.findById(courseId);

  if (!course) {
    throw new Error("Curso não encontrado");
  }

  // 2️⃣ Verifica permissão
  const isAdmin = user.role === "ADMIN";

  // 3️⃣ Cria a aula (entidade)
  const lesson = new Lesson({
    id: lessonData.id,
    courseId: course.id,
    title: lessonData.title,
    order: lessonData.order,
    content: lessonData.content,
  });

  // 4️⃣ Aplica regra do domínio no curso
  course.addLesson(lesson, {
    allowWhenPublished: isAdmin,
  });

  // 5️⃣ Persiste o curso atualizado
  await courseRepository.save(course);

  return course;
}
