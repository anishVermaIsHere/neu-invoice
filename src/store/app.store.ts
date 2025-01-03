import { create } from "zustand";

interface AppStoreState {
  isSidebar: boolean;
  isDialog: boolean;
  dialogConfirm: () => void;
  setDialogConfirm: (handler: () => void) => void;
  setIsDialog: (value: boolean) => void;
  setIsSidebar: () => void;
  resetDialog: () => void;
}


export const useAppStore = create<AppStoreState>()((set) => ({
  isSidebar: true,
  isDialog: false,
  dialogConfirm: () => {},
  setDialogConfirm: (handler) => set(() => ({ dialogConfirm: handler })),
  setIsDialog: (value) => set(() => ({ isDialog: value })),
  setIsSidebar: () => set((state) => ({ isSidebar: !state.isSidebar })),
  resetDialog: () => set(() => ({ isDialog: false, dialogConfirm: ()=>{} }))
}));


export default useAppStore;
