import {
  getDnas,
  getDnaById,
  createDna,
  updateDna,
  deleteDna,
} from "../services/dnaService";

export default function useDna() {
  return {
    getAll: getDnas,
    getById: getDnaById,
    create: createDna,
    update: updateDna,
    remove: deleteDna,
  };
}
