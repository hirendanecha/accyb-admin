import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createCaseStudies, deleteCaseStudiesById, getAllCaseStudies, getCaseStudiesById, updateCaseStudies } from '../actions/caseStudiesAction';

interface UserState {
  caseStudies: any;
  caseStudie: any;
  caseStudyByID: any;
  updatedCaseStudies: any;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  caseStudies: null,
  caseStudie: null,
  caseStudyByID: null,
  updatedCaseStudies: null,
  loading: false,
  error: null,
};

const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCaseStudies.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCaseStudies.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.caseStudies = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getAllCaseStudies.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(createCaseStudies.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCaseStudies.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          console.log(payload, 'payload');

          state.caseStudie = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        createCaseStudies.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(getCaseStudiesById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCaseStudiesById.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.caseStudyByID = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getCaseStudiesById.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(deleteCaseStudiesById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCaseStudiesById.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        deleteCaseStudiesById.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )

      .addCase(updateCaseStudies.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCaseStudies.fulfilled,
        (state: any, { payload }: PayloadAction<any>) => {
          state.updatedCaseStudies = payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        updateCaseStudies.rejected,
        (state: any, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export default caseStudiesSlice.reducer;
