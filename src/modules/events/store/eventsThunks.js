import {
  setLoading,
  setEvents,
} from "./eventsSlice";

import * as service from "../services/eventsService"; // ✅ FALTAVA ISSO

export const fetchEvents = () => async (dispatch) => {
  dispatch(setLoading(true));

  const data = await service.getEvents(); // agora existe
  dispatch(setEvents(data));

  dispatch(setLoading(false));
};

export const createEventThunk = (event) => async (dispatch) => {
  await service.createEvent(event);
  dispatch(fetchEvents());
};

export const updateEventThunk = (event) => async (dispatch) => {
  await service.updateEvent(event);
  dispatch(fetchEvents());
};

export const deleteEventThunk = (id) => async (dispatch) => {
  await service.deleteEvent(id);
  dispatch(fetchEvents());
};
