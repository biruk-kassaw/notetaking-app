import NoteForm from "./features/NoteForm"
import NoteList from "./features/NoteList"

function App() {

  return (
    <div className="maindiv container mx-auto ">
      <h1 className="text-4xl text-center font-semibold text-purple-600 mb-4">
        Notes
      </h1>

      <NoteForm />
      <NoteList />

    </div>
  )
}

export default App
