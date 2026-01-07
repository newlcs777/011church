import { Course } from "../entities/Course";

export async function updateCourse({
  courseRepository,
  data,
}) {
  if (!data?.id) {
    throw new Error("ID do curso é obrigatório");
  }

  const course = await courseRepository.findById(data.id);
  if (!course) {
    throw new Error("Curso não encontrado");
  }

  if (data.title) {
    course.title = data.title;
  }

  if (data.description) {
    course.description = data.description;
  }

  await courseRepository.save(course);

  return course;
}
