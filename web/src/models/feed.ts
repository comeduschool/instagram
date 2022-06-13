export interface FeedUser {
    pk: number;
    profile: string;
    username: string;
}

export interface Feed {
    pk?: number;
    user?: FeedUser;
    images?: string[];
    description?: string;
    like?: number;
    created?: string;
    updated?: string;
}

export interface FeedList {
    page: number;
    items: Feed[];
}

export interface FeedState {
    createFeedFormModal: boolean;
    error: any;
    loading: boolean;
    totalCount: number;
    feeds: FeedList;
}

export const InitFeedState: FeedState = {
    createFeedFormModal: false,
    error: null,
    loading: false,
    totalCount: 0,
    feeds: {
        page: 1,
        items: []
    }
}