import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, editNote, setActiveNote } from './noteSlice'; 
import { Note } from './noteSlice';

// defining the props this component recives 
interface NoteFormProps {
  editMode?: boolean;
  noteToEdit?: Note;
}

const NoteForm: React.FC<NoteFormProps> = ({ editMode = false, noteToEdit }) => {
  const dispatch = useDispatch();
  // depending on the mode setting the title and content
  const [title, setTitle] = useState(editMode ? noteToEdit?.title || '' : '');
  const [content, setContent] = useState(editMode ? noteToEdit?.content || '' : '');

  // handling the submit function when a not is submitted 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title && content) {
      //  if it is editing mode call the dispatch edit note
      if (editMode && noteToEdit) {
        dispatch(editNote({
          id: noteToEdit.id,
          title,
          content,
          date: new Date().toLocaleString(),
        }));
        dispatch(setActiveNote(null)); 
      } else {
        // dispatching add note 
        dispatch(addNote({
          id: '', 
          title,
          content,
          date: new Date().toLocaleString(),
        }));
      }
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg text-purple-900 font-semibold mb-2">{editMode ? 'Edit Note' : 'Add Note'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 border border-purple-900 rounded mb-2"
        />
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full p-2 border border-purple-900 rounded mb-2"
          rows={12}
        />
        <button type="submit" className="bg-purple-900 text-white py-2 px-4 rounded">
          {editMode ? 'Save Changes' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
