import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createFormation,
  deleteFormationById,
  getAllFormations,
  getFormationById,
  updateFormation,
} from '../actions/formationAction';

interface UserState {
  formations: any;
  createformation: any;
  formationById: any;
  updatedformation: any;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  formations: null,
  createformation: null,
  formationById: null,
  updatedformation: null,
  loading: false,
  error: null,
};

const caseStudiesSlice = createSlice({
  name: 'formation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFormations.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllFormations.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.formations = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getAllFormations.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(createFormation.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createFormation.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          console.log(payload, 'payload');

          state.createformation = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        createFormation.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getFormationById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFormationById.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.formationById = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getFormationById.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(deleteFormationById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteFormationById.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        deleteFormationById.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(updateFormation.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateFormation.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.updatedformation = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        updateFormation.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export default caseStudiesSlice.reducer;
