import NewNote, { links as newNoteStyles } from "~/components/AddingNewNote";

const Notes = () => {
  return (
    <div>
      <NewNote />
    </div>
  );
};

export default Notes;

export function links() {
  return [...newNoteStyles()];
}
