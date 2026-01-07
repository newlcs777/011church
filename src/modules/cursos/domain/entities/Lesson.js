// src/modules/cursos/domain/entities/Lesson.js

export class Lesson {
  constructor({
    id,
    courseId,
    title,
    order,
    content,
    createdAt = new Date(),
  }) {
    if (!courseId) {
      throw new Error("Aula precisa pertencer a um curso");
    }

    if (!title) {
      throw new Error("Aula precisa de um título");
    }

    if (order === undefined || order === null) {
      throw new Error("Aula precisa de uma ordem");
    }

    this.id = id;
    this.courseId = courseId;
    this.title = title;
    this.order = order;
    this.content = content;
    this.createdAt = createdAt;
  }
}
