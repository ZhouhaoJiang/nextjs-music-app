import { configureStore, createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        showVideoPlayer: false,
        currentId: null,
        currentPlayTime: null,
    },
    reducers: {
        setShowVideoPlayer: (state) => {
            state.showVideoPlayer = !state.showVideoPlayer;
        },
        setCurrentId: (state, action) => {
            state.currentId = action.payload;
        },
        setCurrentPlayTime: (state, action) => {
            state.currentPlayTime = action.payload
        }
    },
});

export const { setShowVideoPlayer, setCurrentId, setCurrentPlayTime } = playerSlice.actions;

export const selectShowVideoPlayer = (state: {
    player: {
        showVideoPlayer: any;
    };
}) => state.player.showVideoPlayer;
export const selectCurrentId = (state: {
    player: {
        currentId: any;
    };
}) => state.player.currentId;
export const selectCurrentPlayTime = (state: {
    player: {
        currentPlayTime: any;
    };
}) => state.player.currentPlayTime;

export default configureStore({
    reducer: {
        player: playerSlice.reducer,
    },
});