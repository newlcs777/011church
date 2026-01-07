// src/modules/cursos/domain/repositories/CourseRepository.js

export class CourseRepository {
  /**
   * Busca um curso pelo id
   * @param {string} courseId
   * @returns {Promise<Course|null>}
   */
  async findById(courseId) {
    throw new Error("Method not implemented");
  }

  /**
   * Salva ou atualiza um curso
   * @param {Course} course
   * @returns {Promise<void>}
   */
  async save(course) {
    throw new Error("Method not implemented");
  }

  /**
   * Verifica se existe curso com o mesmo título
   * @param {string} title
   * @returns {Promise<boolean>}
   */
  async existsByTitle(title) {
    throw new Error("Method not implemented");
  }

  /**
   * Lista todos os cursos
   * @returns {Promise<Course[]>}
   */
  async findAll() {
    throw new Error("Method not implemented");
  }

  /**
   * Exclui definitivamente um curso (HARD DELETE)
   * @param {string} courseId
   * @returns {Promise<void>}
   */
  async delete(courseId) {
    throw new Error("Method not implemented");
  }
}
