import { useDispatch } from "react-redux";
import { setCurrentId, setShowVideoPlayer } from "@/redux/store.tsx";

export function useSetGlobalMusicID() {
    const dispatch = useDispatch();

    return (id: any) => {
        dispatch(setCurrentId(id));
        dispatch(setShowVideoPlayer());
    };
}
