// src/modules/cursos/domain/useCases/fetchCourses.js

/**
 * Lista todos os cursos
 * @param {object} deps
 * @param {CourseRepository} deps.courseRepository
 * @returns {Promise<Course[]>}
 */
export async function fetchCourses({ courseRepository }) {
  return courseRepository.findAll();
}
