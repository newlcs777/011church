export async function unpublishCourse({
  courseRepository,
  courseId,
}) {
  const course = await courseRepository.findById(courseId);

  if (!course) {
    throw new Error("Curso não encontrado");
  }

  course.unpublish();

  await courseRepository.save(course);

  return course;
}
