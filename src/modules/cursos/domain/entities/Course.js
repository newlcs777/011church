// src/modules/cursos/domain/entities/Course.js

export const CourseStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
};

export class Course {
  constructor({
    id,
    title,
    description,
    lessons = [],
    status = CourseStatus.DRAFT,
    createdAt = new Date(),
    publishedAt = null,
  }) {
    if (!title) {
      throw new Error("Curso precisa de um título");
    }

    if (!description) {
      throw new Error("Curso precisa de uma descrição");
    }

    this.id = id;
    this.title = title;
    this.description = description;
    this.lessons = lessons;
    this.status = status;
    this.createdAt = createdAt;
    this.publishedAt = publishedAt;
  }

  // ===== Regras de domínio =====

  canBePublished() {
    return this.lessons.length > 0;
  }

  publish() {
    if (this.status !== CourseStatus.DRAFT) {
      throw new Error("Apenas cursos em rascunho podem ser publicados");
    }

    if (!this.canBePublished()) {
      throw new Error("Curso precisa ter ao menos uma aula para ser publicado");
    }

    this.status = CourseStatus.PUBLISHED;
    this.publishedAt = new Date();
  }

  unpublish() {
    if (this.status !== CourseStatus.PUBLISHED) {
      throw new Error("Apenas cursos publicados podem ser despublicados");
    }

    this.status = CourseStatus.DRAFT;
    this.publishedAt = null;
  }

  archive() {
    if (this.status === CourseStatus.ARCHIVED) {
      throw new Error("Curso já está arquivado");
    }

    this.status = CourseStatus.ARCHIVED;
  }

  /**
   * Adiciona uma aula ao curso.
   * @param {object} lesson
   * @param {object} options
   * @param {boolean} options.allowWhenPublished - true somente via use case ADMIN
   */
  addLesson(lesson, { allowWhenPublished = false } = {}) {
    if (this.status === CourseStatus.ARCHIVED) {
      throw new Error("Curso arquivado não permite novas aulas");
    }

    if (
      this.status === CourseStatus.PUBLISHED &&
      !allowWhenPublished
    ) {
      throw new Error(
        "Curso publicado: apenas administrador pode adicionar novas aulas"
      );
    }

    const orderAlreadyExists = this.lessons.some(
      (existingLesson) => existingLesson.order === lesson.order
    );

    if (orderAlreadyExists) {
      throw new Error(
        "Já existe uma aula com essa ordem neste curso"
      );
    }

    this.lessons.push(lesson);
  }

  /**
   * Remove uma aula do curso.
   * @param {string} lessonId
   * @param {object} options
   * @param {boolean} options.allowWhenPublished - true somente via use case ADMIN
   */
  removeLesson(lessonId, { allowWhenPublished = false } = {}) {
    if (this.status === CourseStatus.ARCHIVED) {
      throw new Error("Curso arquivado não permite remoção de aulas");
    }

    if (
      this.status === CourseStatus.PUBLISHED &&
      !allowWhenPublished
    ) {
      throw new Error(
        "Curso publicado: apenas administrador pode remover aulas"
      );
    }

    const lessonIndex = this.lessons.findIndex(
      (lesson) => lesson.id === lessonId
    );

    if (lessonIndex === -1) {
      throw new Error("Aula não encontrada no curso");
    }

    this.lessons.splice(lessonIndex, 1);
  }
}
