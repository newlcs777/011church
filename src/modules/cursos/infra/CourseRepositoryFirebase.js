// src/modules/cursos/infra/CourseRepositoryFirebase.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  deleteDoc, // ✅ ADICIONADO
} from "firebase/firestore";

// ✅ IMPORT CANÔNICO (INSTÂNCIA ÚNICA)
import { db } from "@/firebase/firebase";

import { Course } from "../domain/entities/Course";
import { Lesson } from "../domain/entities/Lesson";
import { CourseRepository } from "../domain/repositories/CourseRepository";

export class CourseRepositoryFirebase extends CourseRepository {
  constructor() {
    super();
    this.collectionRef = collection(db, "courses");
  }

  async findById(courseId) {
    const ref = doc(this.collectionRef, courseId);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    return this.toDomain(courseId, data);
  }

  async findAll() {
    const snapshot = await getDocs(this.collectionRef);

    return snapshot.docs.map((docItem) =>
      this.toDomain(docItem.id, docItem.data())
    );
  }

  async save(course) {
    const ref = doc(this.collectionRef, course.id);
    await setDoc(ref, this.toPersistence(course));
  }

  async existsByTitle(title) {
    const q = query(
      this.collectionRef,
      where("title", "==", title)
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty;
  }

  /**
   * ✅ EXCLUIR CURSO DEFINITIVAMENTE (HARD DELETE)
   */
  async delete(courseId) {
    const ref = doc(this.collectionRef, courseId);
    await deleteDoc(ref);
  }

  // ===== Mapeamento =====

  toDomain(id, data) {
    const normalizedStatus =
      typeof data.status === "string"
        ? data.status.toLowerCase()
        : "draft";

    return new Course({
      id,
      title: data.title,
      description: data.description,
      status: normalizedStatus,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      publishedAt: data.publishedAt?.toDate?.() ?? null,
      lessons: (data.lessons || []).map(
        (lesson) =>
          new Lesson({
            id: lesson.id,
            courseId: id,
            title: lesson.title,
            order: lesson.order,
            content: lesson.content,
            createdAt: lesson.createdAt?.toDate?.() ?? new Date(),
          })
      ),
    });
  }

  toPersistence(course) {
    return {
      title: course.title,
      description: course.description,
      status: course.status,
      createdAt: course.createdAt,
      publishedAt: course.publishedAt,
      lessons: course.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.order,
        content: lesson.content,
        createdAt: lesson.createdAt,
      })),
    };
  }
}
