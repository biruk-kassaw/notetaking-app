import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNote, setActiveNote } from './noteSlice'; // Provide the correct path
import { Note } from './noteSlice';

interface EditFormProps {
  activeNote: Note;
  oncancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ activeNote, oncancel }) => {
  const dispatch = useDispatch();
  const [editedTitle, setEditedTitle] = useState(activeNote.title);
  const [editedContent, setEditedContent] = useState(activeNote.content);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedTitle && editedContent) {
      dispatch(editNote({
        id: activeNote.id,
        title: editedTitle,
        content: editedContent,
        date: new Date().toLocaleString(),
      }));
      dispatch(setActiveNote(null)); 
      oncancel(); 
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-2"
        />
        <textarea
          placeholder="Content"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-2"
          rows={4}
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save Changes
        </button>
        <button type="button" onClick={oncancel} className="bg-gray-300 text-gray-800 py-2 px-4 rounded ml-2">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
