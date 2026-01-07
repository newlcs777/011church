import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCursosThunk } from "../store/cursosThunks";

export default function useCursos() {
  const dispatch = useDispatch();

  const {
    items = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.cursos || {});

  useEffect(() => {
    dispatch(fetchCursosThunk());
  }, [dispatch]);

  return {
    cursos: items,
    loading,
    error,
  };
}
