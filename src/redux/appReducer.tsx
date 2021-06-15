import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentBook {
  title: string;
  author: string;
  firstPublished: number | null | string;
  img: string | number;
  ISBN: string;
  edition: string;
}

interface State {
  currentBook: CurrentBook;
}

export interface StateSelector {
  app: State;
}

const initialState: State = {
  currentBook: {
    title: "",
    author: "",
    firstPublished: null,
    img: "",
    ISBN: "",
    edition: "",
  },
};

export const bookSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentBook(state: State, action: PayloadAction<CurrentBook>) {
      state.currentBook = action.payload;
    },
  },
});

export const { setCurrentBook } = bookSlice.actions;
export default bookSlice.reducer;
