import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

interface NoteCreateDTO {
  title: string;
  content: string;
}

export interface Note extends NoteCreateDTO {
  id: string;
  createDt: string;
  updateDt: string;
}

interface NotesMap {
  [key: string]: Note;
}

const defaultNotes: NotesMap = {
  "0fed8ce7-4386-4528-9fed-fc7b7695cf1e": {
    id: `0fed8ce7-4386-4528-9fed-fc7b7695cf1e`,
    title: `Note 1`,
    content: `Note content 1`,
    createDt: "",
    updateDt: "",
  },
  "fbdcb4aa-78be-4206-b61a-82c46784022a": {
    id: `fbdcb4aa-78be-4206-b61a-82c46784022a`,
    title: `Note 2`,
    content: `Note content 2`,
    createDt: "",
    updateDt: "",
  },
  "83585cca-4c33-4c09-b795-f1c612649c64": {
    id: `83585cca-4c33-4c09-b795-f1c612649c64`,
    title: `Note 3`,
    content: `Note content 3`,
    createDt: "",
    updateDt: "",
  },
} as const;

export const useNotesStore = defineStore("notes", () => {
  let restoredNotes: NotesMap;

  const saveNotes = (notes: NotesMap = notesMap): void => {
    if (process.client) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  };

  if (process.client) {
    restoredNotes = JSON.parse(
      localStorage.getItem("notes") || JSON.stringify(defaultNotes)
    );
    saveNotes(restoredNotes);
  } else {
    restoredNotes = { ...defaultNotes };
  }

  const notesMap = reactive<NotesMap>(restoredNotes);

  const getNotes = (): Note[] => {
    return Object.values(notesMap);
  };

  const getNoteById = (id: string): Note | undefined => {
    return getNotes().find((e) => e.id === id);
  };

  const filteredNotes = (query: string): Note[] => {
    return getNotes().filter(
      (e) =>
        e.title.includes(query.toLowerCase()) ||
        e.content.includes(query.toLowerCase())
    );
  };

  const addNote = (note: NoteCreateDTO): Note => {
    const id = uuid();
    const createDt = new Date().toISOString();
    const updateDt = createDt;
    notesMap[id] = { id, createDt, updateDt, ...note };
    saveNotes();
    return notesMap[id];
  };

  const editNote = (note: Note) => {
    const updateDt = new Date().toISOString();
    notesMap[note.id] = { ...note, updateDt };
    saveNotes();
    return notesMap[note.id];
  };

  const deleteNote = (note: Note) => {
    delete notesMap[note.id];
    saveNotes();
    return getNotes();
  };

  return {
    getNotes,
    getNoteById,
    addNote,
    editNote,
    deleteNote,
    filteredNotes,
  };
});
