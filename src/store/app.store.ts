
import { create } from 'zustand';


interface AppStoreState {
    isSidebar: boolean;
    setIsSidebar: ()=>void;
};

export const useAppStore = create<AppStoreState>()((set)=>({
    isSidebar: true,
    setIsSidebar: ()=>set((state)=>({ isSidebar: !state.isSidebar }))
}))


export default useAppStore