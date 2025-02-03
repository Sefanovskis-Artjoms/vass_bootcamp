import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoSearchState } from "@/types";

const initialState: ITodoSearchState = {
  searchQuery: "",
  sortOrder: "newest",
  filterTypes: [],
  filterStatuses: [],
};

const searchSlice = createSlice({
  name: "todoSearch",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"newest" | "oldest">) {
      state.sortOrder = action.payload;
    },
    toggleFilterType(state, action: PayloadAction<string>) {
      const type = action.payload;
      if (state.filterTypes.includes(type)) {
        state.filterTypes = state.filterTypes.filter((t) => t !== type);
      } else {
        state.filterTypes.push(type);
      }
    },
    resetFilterTypes(state) {
      state.filterTypes = [];
    },
    toggleFilterStatus(state, action: PayloadAction<string>) {
      const status = action.payload;
      if (state.filterStatuses.includes(status)) {
        state.filterStatuses = state.filterStatuses.filter((s) => s !== status);
      } else {
        state.filterStatuses.push(status);
      }
    },
    resetFilterStatuses(state) {
      state.filterStatuses = [];
    },
  },
});

export const {
  setSearchQuery,
  setSortOrder,
  toggleFilterType,
  resetFilterTypes,
  toggleFilterStatus,
  resetFilterStatuses,
} = searchSlice.actions;
export default searchSlice.reducer;
