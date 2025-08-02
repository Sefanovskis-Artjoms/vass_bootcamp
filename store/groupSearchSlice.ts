import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGroupSearchState } from "@/types";

const initialState: IGroupSearchState = {
  searchQuery: "",
};

const groupSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = groupSearchSlice.actions;
export default groupSearchSlice.reducer;
