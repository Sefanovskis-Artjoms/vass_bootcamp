import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSearchState } from "@/types";

const initialState: IUserSearchState = {
  searchQuery: "",
  searchFields: [],
  filterRoles: [],
};

const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    toggleSearchField(state, action: PayloadAction<string>) {
      const field = action.payload;
      if (state.searchFields.includes(field)) {
        state.searchFields = state.searchFields.filter((f) => f !== field);
      } else {
        state.searchFields.push(field);
      }
    },
    resetSearchFields(state) {
      state.searchFields = [];
    },
    toggleFilterRole(state, action: PayloadAction<string>) {
      const role = action.payload;
      if (state.filterRoles.includes(role)) {
        state.filterRoles = state.filterRoles.filter((r) => r !== role);
      } else {
        state.filterRoles.push(role);
      }
    },
    resetFilterRoles(state) {
      state.filterRoles = [];
    },
  },
});

export const {
  setSearchQuery,
  toggleSearchField,
  resetSearchFields,
  toggleFilterRole,
  resetFilterRoles,
} = userSearchSlice.actions;
export default userSearchSlice.reducer;
