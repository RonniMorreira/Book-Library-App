import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // You can mutate state thanks to Immer library
      state.title = action.payload;

      // // You can also return new state as usually
      //   return { ...state, title: action.payload };
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

// экспорт функции action creator, которая была создана атоматически.filterSlice.actions - содержит все action creator
// export const setTitleFilter = filterSlice.actions.setTitleFilter // option 1
export const { setTitleFilter, setAuthorFilter, resetFilters } =
  filterSlice.actions; // option 2 with use destructurisation

export const selectTitleFilter = (state) => state.filter.title;

export const selectAuthorFilter = (state) => state.filter.author;

export default filterSlice.reducer;
