import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchComunicados,
  createComunicadoThunk,
  updateComunicadoThunk,
  deleteComunicadoThunk,
} from "../store/comunicadosThunks";

export default function useComunicados() {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.comunicados
  );

  useEffect(() => {
    dispatch(fetchComunicados());
  }, [dispatch]);

  const getComunicadoById = (id) =>
    items.find((e) => e.id === id);

  return {
    comunicados: items,
    loading,
    getComunicadoById,
    createComunicado: (data) =>
      dispatch(createComunicadoThunk(data)),
    updateComunicado: (data) =>
      dispatch(updateComunicadoThunk(data)),
    deleteComunicado: (id) =>
      dispatch(deleteComunicadoThunk(id)),
  };
}
