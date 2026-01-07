// src/modules/cursos/application/courseService.js

import { makeCourseRepository } from "../infra";

// ===== USE CASES =====
import { createCourse } from "../domain/useCases/createCourse";
import { fetchCourses } from "../domain/useCases/fetchCourses";
import { updateCourse } from "../domain/useCases/updateCourse";
import { publishCourse } from "../domain/useCases/publishCourse";
import { unpublishCourse } from "../domain/useCases/unpublishCourse";
import { archiveCourse } from "../domain/useCases/archiveCourse";
import { addLessonToCourse } from "../domain/useCases/addLessonToCourse";
import { removeLessonFromCourse } from "../domain/useCases/removeLessonFromCourse";

const courseRepository = makeCourseRepository();

/**
 * ===== MAPPERS (Domain → DTO) =====
 * Redux/UI só recebem dados serializáveis
 */
function lessonToDTO(lesson) {
  return {
    id: lesson.id,
    title: lesson.title,
    order: lesson.order,
    content: lesson.content,
    createdAt: lesson.createdAt?.toISOString() ?? null,
  };
}

function courseToDTO(course) {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    status: course.status,
    createdAt: course.createdAt?.toISOString() ?? null,
    publishedAt: course.publishedAt?.toISOString() ?? null,
    lessons: course.lessons.map(lessonToDTO),
  };
}

/**
 * Application Service — Cursos
 * Camada intermediária entre UI/Redux e o domínio
 */
export const courseService = {
  /**
   * Listar cursos (leitura)
   */
  async fetchCourses() {
    const courses = await fetchCourses({ courseRepository });
    return courses.map(courseToDTO);
  },

  /**
   * Criar curso (escrita)
   */
  async createCourse(data) {
    const course = await createCourse({ courseRepository, data });
    return courseToDTO(course);
  },

  /**
   * Atualizar curso (escrita)
   */
  async updateCourse(data) {
    const course = await updateCourse({ courseRepository, data });
    return courseToDTO(course);
  },

  /**
   * Publicar curso
   */
  async publishCourse(courseId) {
    const course = await publishCourse({ courseRepository, courseId });
    return courseToDTO(course);
  },

  /**
   * Despublicar curso
   */
  async unpublishCourse(courseId) {
    const course = await unpublishCourse({ courseRepository, courseId });
    return courseToDTO(course);
  },

  /**
   * Arquivar curso (soft delete)
   */
  async archiveCourse(courseId) {
    const course = await archiveCourse({ courseRepository, courseId });
    return courseToDTO(course);
  },

  /**
   * EXCLUIR CURSO DEFINITIVAMENTE (HARD DELETE)
   * Remove o documento do Firestore
   */
  async deleteCourse(courseId) {
    if (!courseId) {
      throw new Error("ID do curso é obrigatório para exclusão");
    }

    await courseRepository.delete(courseId);

    return { success: true };
  },

  /**
   * Adicionar aula ao curso (ADMIN)
   */
  async addLesson(courseId, lessonData, user) {
    const course = await addLessonToCourse({
      courseRepository,
      courseId,
      lessonData,
      user,
    });

    return courseToDTO(course);
  },

  /**
   * Remover aula do curso (ADMIN)
   */
  async removeLesson(courseId, lessonId, user) {
    const course = await removeLessonFromCourse({
      courseRepository,
      courseId,
      lessonId,
      user,
    });

    return courseToDTO(course);
  },
};
