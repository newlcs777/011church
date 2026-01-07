// src/modules/cursos/infra/index.js

import { CourseRepositoryFirebase } from "./CourseRepositoryFirebase";

export function makeCourseRepository() {
  return new CourseRepositoryFirebase();
}
