import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

import NewNote, { links as newNoteStyles } from "~/components/AddingNewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";
const Notes = () => {
  const notes = useLoaderData();
  return (
    <div>
      <NewNote />
      <NoteList notes={notes} />
    </div>
  );
};

export default Notes;

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "couldnot find any notes" },
      { status: 404, statusText: "not found " }
    );
  }
  return notes;
}

//this is a reserved name
export async function action(data) {
  const formData = await data.request.formData();
  // const noteData ={
  //   title: formData.get("title"),
  // content: ..............
  // }

  const noteData = Object.fromEntries(formData);
  //we can add validation

  if (noteData.title.trim().length < 5) {
    return { message: "invalid titile must be at lkeast 5 chars long" };
  }
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/Notes");
}
// export async function action({request}) {
//   const formData = await request.formData();
// }

export function CatchBoundary() {
  const caughtResponse = useCatch();
  const message = caughtResponse.data?.message || "data not found";
  return (
    <main>
      <p className="info-message">{message}</p>
    </main>
  );
}

//this is a reserved name
export function links() {
  return [...newNoteStyles(), ...noteListLinks()];
}
