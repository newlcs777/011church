export async function removeLessonFromCourse({
  courseRepository,
  courseId,
  lessonId,
  user,
}) {
  if (!user) {
    throw new Error("Usuário é obrigatório");
  }

  const course = await courseRepository.findById(courseId);

  if (!course) {
    throw new Error("Curso não encontrado");
  }

  const isAdmin = user.role === "ADMIN";

  course.removeLesson(lessonId, {
    allowWhenPublished: isAdmin,
  });

  await courseRepository.save(course);

  return course;
}
