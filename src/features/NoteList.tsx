import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectNotes, deleteNote } from './noteSlice';
import { Note } from './noteSlice';
import EditForm from './EditForm'; 

const NoteList: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  // handling delete note 
  const handleDeleteNote = (noteId: string) => {
    dispatch(deleteNote(noteId));
  };

  // handling edit note
  const handleEditNote = (noteId: string) => {
    setEditNoteId(noteId);
  };
  // handling cancel edit
  const handleCancelEdit = () => {
    setEditNoteId(null);
  }

  return (
    <div>
      <h2 className="text-lg text-purple-900 font-semibold mb-2">Notes</h2>
      <ul className="list-disc pl-6">
        {notes.map((note: Note) => (
          <li key={note.id} className="mb-2">
            <strong>{note.title}</strong>
            <p className="text-gray-600">{note.content}</p>
            <p className="text-gray-400 text-xs">{note.date}</p>
            {editNoteId === note.id ? (
              <EditForm activeNote={note} oncancel={handleCancelEdit} />
            ) : (
              <>
                <button onClick={() => handleDeleteNote(note.id)} className="bg-red-900 text-white p-2 m-2 rounded">
                  Delete
                </button>
                <button onClick={() => handleEditNote(note.id)} className="bg-blue-500 text-white p-2 m-2 rounded">
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
