import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const DEFAULT_COLORS = [
  "#001219",
  "#fff",
  "#005f73",
  "#0a9396",
  "#94d2bd",
  "#e9d8a6",
  "#ee9b00",
  "#ca6702",
  "#bb3e03",
  "#ae2012",
  "#9b2226",
];

// Initial state
const initialState = {
  colors: {},
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColors(state, action) {
      state.colors[action.payload.key] = _.cloneDeep(DEFAULT_COLORS);
    },
    addColor(state, action) {
      const colors = state.colors[action.payload.key];
      if (!colors.includes(action.payload.value)) {
        colors.push(action.payload.value);
      }
    },
  },
});

export const colorActions = colorSlice.actions;

export default colorSlice.reducer;
