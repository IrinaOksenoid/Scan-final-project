import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное действие для получения лимитов
export const fetchLimits = createAsyncThunk('limits/fetchLimits', async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ limit: 100, used: 50 }), 2000) // Эмуляция API
  );
});

const limitsSlice = createSlice({
  name: 'limits',
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLimits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLimits.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default limitsSlice.reducer;
