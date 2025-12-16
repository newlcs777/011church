import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchEvents,
  createEventThunk,
  updateEventThunk,
  deleteEventThunk,
} from "../store/eventsThunks";

export default function useEvents() {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const getEventById = (id) =>
    items.find((e) => e.id === id);

  return {
    events: items,
    loading,
    getEventById,
    createEvent: (data) =>
      dispatch(createEventThunk(data)),
    updateEvent: (data) =>
      dispatch(updateEventThunk(data)),
    deleteEvent: (id) =>
      dispatch(deleteEventThunk(id)),
  };
}
