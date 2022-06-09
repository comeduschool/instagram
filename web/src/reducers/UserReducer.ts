import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

// models
import { User, InitUser } from '../models/user';
import { UserState, InitUserState } from '../models/user';

// services
import { UserService } from '../services/UserService';

export const UserSlice = createSlice({
    name: "user",
    initialState: InitUserState,
    reducers: {
      UpdateUser: (state: UserState, { payload }: PayloadAction<User>) => {
        state.user = {...payload}
      },
    },
    extraReducers: {
      [UserService.retrieve.pending.type]: (state) => {
        state.loading = true;
        state.user = InitUser;
        state.error = null;
      },
      [UserService.retrieve.fulfilled.type]: (state, { payload }: PayloadAction<User>) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      },
      [UserService.retrieve.rejected.type]: (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.user = InitUser;
        state.error = payload;
      }
    }
  });
  
  export const { UpdateUser } = UserSlice.actions;
  export default UserSlice.reducer;