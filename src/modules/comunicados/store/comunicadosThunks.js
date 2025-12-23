import { setLoading, setComunicados } from "./comunicadosSlice";
import * as service from "../services/comunicadosService";

export const fetchComunicados = () => async (dispatch) => {
  dispatch(setLoading(true));

  const data = await service.getComunicados();
  dispatch(setComunicados(data));

  dispatch(setLoading(false));
};

export const createComunicadoThunk = (event) => async (dispatch) => {
  dispatch(setLoading(true));
  await service.createComunicado(event);
  dispatch(fetchComunicados());
};

export const updateComunicadoThunk = (event) => async (dispatch) => {
  if (!event?.id) {
    console.error("updateComunicadoThunk chamado sem id", event);
    return;
  }

  dispatch(setLoading(true));
  await service.updateComunicado(event);
  dispatch(fetchComunicados());
};

export const deleteComunicadoThunk = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await service.deleteComunicado(id);
  dispatch(fetchComunicados());
};
