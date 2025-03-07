import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSearchState } from "@/types";

const initialState: IUserSearchState = {
  // Viewusers and viewGroupDetails are the namespaces for the two pages where the same search slice is used
  viewUsers: { searchQuery: "", searchFields: [], filterRoles: [] },
  viewGroupDetails: { searchQuery: "", searchFields: [], filterRoles: [] },
};

const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    setSearchQuery(
      state,
      action: PayloadAction<{ namespace: string; query: string }>
    ) {
      const { namespace, query } = action.payload;
      if (!state[namespace]) return;
      state[namespace].searchQuery = query;
    },
    toggleSearchField(
      state,
      action: PayloadAction<{ namespace: string; field: string }>
    ) {
      const { namespace, field } = action.payload;
      if (!state[namespace]) return;
      if (state[namespace].searchFields.includes(field)) {
        state[namespace].searchFields = state[namespace].searchFields.filter(
          (f) => f !== field
        );
      } else {
        state[namespace].searchFields.push(field);
      }
    },
    resetSearchFields(state, action: PayloadAction<{ namespace: string }>) {
      const { namespace } = action.payload;
      if (!state[namespace]) return;
      state[namespace].searchFields = [];
    },
    toggleFilterRole(
      state,
      action: PayloadAction<{ namespace: string; role: string }>
    ) {
      const { namespace, role } = action.payload;
      if (!state[namespace]) return;
      if (state[namespace].filterRoles.includes(role)) {
        state[namespace].filterRoles = state[namespace].filterRoles.filter(
          (r) => r !== role
        );
      } else {
        state[namespace].filterRoles.push(role);
      }
    },
    resetFilterRoles(state, action: PayloadAction<{ namespace: string }>) {
      const { namespace } = action.payload;
      if (!state[namespace]) return;
      state[namespace].filterRoles = [];
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
