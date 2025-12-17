import { setLoading, setEvents } from "./eventsSlice";
import * as service from "../services/eventsService";

export const fetchEvents = () => async (dispatch) => {
  dispatch(setLoading(true));

  const data = await service.getEvents();
  dispatch(setEvents(data));

  dispatch(setLoading(false));
};

export const createEventThunk = (event) => async (dispatch) => {
  dispatch(setLoading(true));
  await service.createEvent(event);
  dispatch(fetchEvents());
};

export const updateEventThunk = (event) => async (dispatch) => {
  if (!event?.id) {
    console.error("updateEventThunk chamado sem id", event);
    return;
  }

  dispatch(setLoading(true));
  await service.updateEvent(event);
  dispatch(fetchEvents());
};

export const deleteEventThunk = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await service.deleteEvent(id);
  dispatch(fetchEvents());
};
