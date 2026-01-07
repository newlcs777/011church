export async function publishCourse({
  courseRepository,
  courseId,
}) {
  const course = await courseRepository.findById(courseId);

  if (!course) {
    throw new Error("Curso não encontrado");
  }

  course.publish();

  await courseRepository.save(course);

  return course;
}
