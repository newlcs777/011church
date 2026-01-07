export async function archiveCourse({
  courseRepository,
  courseId,
}) {
  const course = await courseRepository.findById(courseId);

  if (!course) {
    throw new Error("Curso não encontrado");
  }

  course.archive();

  await courseRepository.save(course);

  return course;
}
