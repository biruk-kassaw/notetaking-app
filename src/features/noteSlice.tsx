import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// defining Note type
export interface Note{
    id: string;
    title: string;
    content: string;
    date: string;
}

// defining note state
export interface NoteState{
    notes: Note[];
    active: Note | null;
}

// defining initial state
const initialState: NoteState = {
    notes: [{
        id: '1',
        title: 'How to learn react and redux',
        content: 'Go to the documentation and read.',
        date: new Date().toLocaleString(),
    }],
    active: null,
};

// defining note slice
export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers:{
        // defining add reducer
        addNote:(state, action: PayloadAction<Note>) => {
            const newNote = {...action.payload, id: nanoid()};
            state.notes.push(newNote);
        },

        // defining edit reducer
        editNote: (state, action: PayloadAction<Note>) => {
            const { id, title, content, date } = action.payload;
            const noteToEdit = state.notes.find((note) => note.id === id);
            if (noteToEdit) {
                noteToEdit.title = title;
                noteToEdit.content = content;
                noteToEdit.date = date;
            }
            if (state.active?.id === id) {
                state.active = action.payload;
            }
        },
        
        setActiveNote :(state: NoteState, action: PayloadAction<string | null>) => {
            const activeId = action.payload;
            state.active = activeId
                ? state.notes.find((note) => note.id === activeId) || null
                : null;
        },
        // defining delete reducer
        deleteNote: (state, action: PayloadAction<string>) => {
            const deletedId = action.payload;
            state.notes = state.notes.filter((note) => note.id !== deletedId);
            if (state.active?.id === deletedId) {
                state.active = null;
            }
        },
        

    }

})

export const selectNotes = (state: NoteState) => state.notes.notes;
export const { addNote, editNote, setActiveNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
