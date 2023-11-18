import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithID';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setAddBook: (state, action) => {
      // You can mutate state thanks to Immer library
      state.push(action.payload);

      // // You can also return new state as usually
      //   return [...state, action.payload];
    },
    setDeleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    setToggleFavorite: (state, action) => {
      // option 1 with use Immer library - mutate state
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });

      // // option 2 return new state
      //   return state.map((book) =>
      //     book.id === action.payload
      //       ? { ...book, isFavorite: !book.isFavorite }
      //       : book
      //   );
    },
  },
});

export const { setAddBook, setDeleteBook, setToggleFavorite } =
  booksSlice.actions;

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get('http://localhost:4000/random-book');
    // используем оператор опциональной цепочки вместо условия "if (res.data && res.data.title && res.data.author)"
    if (res?.data?.title && res?.data?.author) {
      dispatch(setAddBook(createBookWithID(res.data, 'API')));
    }
  } catch (error) {
    console.log('Error fetching random book', error);
  }
};

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
