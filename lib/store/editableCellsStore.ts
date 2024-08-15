import { create } from 'zustand';

interface EditableCellsState {
  editableCells: { [key: string]: boolean };
  setEditableCells: (cells: { [key: string]: boolean }) => void;
  toggleEditableCell: (cellId: string) => void;
}

export const useEditableCellsStore = create<EditableCellsState>((set) => ({
  editableCells: {},
  setEditableCells: (cells) => set({ editableCells: cells }),
  toggleEditableCell: (cellId) => set((state) => ({
    editableCells: {
      ...state.editableCells,
      [cellId]: !state.editableCells[cellId],
    },
  })),
}));
