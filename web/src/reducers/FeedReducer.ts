// react modules
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

// services
import { FeedService } from '../services/FeedService';

// models
import { Feed, FeedState, InitFeedState } from '../models/feed';

export const FeedSlice = createSlice({
    name: 'feed',
    initialState: InitFeedState,
    reducers: {
        ShowCreateFeedFormModal: (state: FeedState) => {
            state.createFeedFormModal = true;
        },
        HideCreateFeedFormModal: (state: FeedState) => {
            state.createFeedFormModal = false;
        },
    },
    extraReducers: {
        [FeedService.list.rejected.type]: (state) => {
            state.loading = true;
            state.error = null;
            state.totalCount = 0;
            state.feeds = {
                page:1, 
                items: []
            }
        },
        [FeedService.list.fulfilled.type]: (state, { payload }: PayloadAction<any>) => {
            state.loading = false;
            state.error = null;
            state.totalCount = payload.totalCount;
            state.feeds.items = [...payload.items];
        },
        [FeedService.list.rejected.type]: (state, { payload }: PayloadAction<any>) => {
            state.loading = false;
            state.error = payload;
        },
        [FeedService.nextPage.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [FeedService.nextPage.fulfilled.type]: (state, { payload }: PayloadAction<Feed[]>) => {
            state.loading = false;
            state.error = null;
            state.feeds = {
                page: state.feeds.page+1,
                items: [...state.feeds.items, ...payload]
            };
        },
        [FeedService.nextPage.rejected.type]: (state, { payload }: PayloadAction<any>) => {
            state.loading = false;
            state.error = payload
        },
        [FeedService.create.pending.type]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [FeedService.create.fulfilled.type]: (state, { payload }: PayloadAction<Feed>) => {
            state.loading = false;
            state.error = null;
        },
        [FeedService.create.rejected.type]: (state, { payload }: PayloadAction<any>) => {
            state.loading = false;
            state.error = payload
        },
        [FeedService.update.rejected.type]: (state) => {
            state.loading = true;
            state.error = null;
            state.totalCount = 0;
            state.feeds = {
                page:1, 
                items: []
            }
        },
        [FeedService.update.fulfilled.type]: (state, { payload }: PayloadAction<any>) => {
            state.loading = false;
            state.error = null;
        },
        [FeedService.update.rejected.type]: (state, { payload }: PayloadAction<any>) => {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const { 
    ShowCreateFeedFormModal,
    HideCreateFeedFormModal,
} = FeedSlice.actions;
export default FeedSlice.reducer;