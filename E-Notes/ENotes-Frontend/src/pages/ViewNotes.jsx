import React, { useState, useEffect, useCallback } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { getAllUserNotes } from '../services/UserService';
import toast from 'react-hot-toast';
import { deleteNote } from '../services/UserService';

const ViewNotes = () => {

  const [notes, setNotes] = useState([])

  const deleteNotes = useCallback(async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
  
    try {
      console.log("1")
      const response = await deleteNote(id);
      console.log("4")
      console.log(response)
      toast.success("Note deleted successfully");
  
      // Remove from UI without reloading
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  }, []);

  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token') // assuming JWT is stored here
        const response = await getAllUserNotes(token)
        console.log(response)
        console.log(response.data)
        setNotes(response.data)
      } catch (err) {
        console.error("Error fetching notes", err)
      }
    }

    fetchNotes()
  }, [])

  return (
    <section className="text-gray-600 min-h-[72vh] body-font bg-gray-50">
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
          <h1 className="sm:text-4xl text-3xl font-semibold title-font mb-2 text-gray-800">
            Your Notes
          </h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Whatever you save as notes on this website can be viewed here.
          </p>
        </div>

        <div className="flex flex-wrap m-4 justify-center">
          {notes.map((note) => (
            <div key={note.id} className="xl:w-1/3 md:w-1/2 p-4">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 w-96 h-auto overflow-auto border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                <p className="text-gray-600 mb-4">{note.description}</p>

                {note.fileName && (
                  <img
                    src={`C:/Users/Harshal PC/Desktop/.vscode/Spring Boot/Project/Major-Project/E-Notes/ENotes-Data/${note.user.email}/${note.fileName}`}
                    alt="Note Attachment"
                    className="w-32 h-32 object-cover rounded-lg shadow-sm border border-gray-200 mb-4"
                  />
                )}

                <p className="text-sm text-gray-500 mb-4">
                  Public Date: <span className="font-medium text-gray-700">{note.date}</span>
                </p>

                <div className="flex space-x-4">
                  <a
                    href={`/user/editNotes/${note.id}`}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm flex items-center gap-2 transition"
                  >
                    <FaEdit /> Update
                  </a>
                  <button
                    onClick={() => deleteNotes(note.id)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm flex items-center gap-2 transition"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}

export default ViewNotes