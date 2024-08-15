import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SortingOptyionsState = {
  selectedSortingOption: string;
}

const initialState : SortingOptyionsState = {
  selectedSortingOption: 'Popular'
};

export const sortingOptionSlice = createSlice({
  name: 'sortingOption',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      state.selectedSortingOption = action.payload;
    }
  }
});

export const { setSort: setSortingOption} = sortingOptionSlice.actions;

export const sortingOptionReducer = sortingOptionSlice.reducer;
