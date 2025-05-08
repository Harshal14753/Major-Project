import React, { useEffect } from 'react'
import { useState } from "react";
import { FaSave, FaFileUpload } from "react-icons/fa";
import { saveNotes } from '../services/UserService';
import { useUserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import { getNoteById } from '../services/UserService';
import { updateNotes } from '../services/UserService';
import { useNavigate } from 'react-router';

const AddNotes = () => {

  const {user} = useUserContext()
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file: null,
        userEmail:""
      });
    
      // State for session messages
      // const [sessionMsg, setSessionMsg] = useState({
      //   success: "",
      //   error: "",
      // });
    
      // Handle Input Change
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: type === "file" ? files[0] : value,
        }));
      };

      // Fetch Data in edit mode
      useEffect(() => {
        console.log(isEdit)
        console.log(user.email)
        if (isEdit) {
          const fetchData = async () => {
            try {
              console.log("1")
              const note = await getNoteById(id);  // Call backend
              console.log("4")
              setFormData({
                title: note.title,
                description: note.description,
                file: null, // can't set file for security
                userEmail: user.email
              });
            } catch (error) {
              toast.error("Failed to fetch note");
            }
          };
          fetchData();
        }
      }, [id, isEdit, user.email]);
    
      // Handle Form Submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user.email)
        const updatedFormData = { ...formData, userEmail: user.email };
        console.log("Submitting Form:", updatedFormData);
        console.log("1")

        try {
          if (isEdit){
            console.log("2")
            const response = await updateNotes(id, updatedFormData);
            console.log("15")
            console.log(response)
            
            toast.success("Note updated successfully!");
          } else {
            console.log("2")
            const response = await saveNotes(updatedFormData)
            console.log("15")
            console.log(response)
            toast.success("Note added successfully")
          }
          navigate("/user/viewNotes")
        } catch (error) {
          console.log(error)
          console.log("16")
          toast.error("Error adding note")
        }
    
        // Simulate a success or error response
        // setSessionMsg({
        //   success: "Note saved successfully!",
        //   error: "",
        // });
    
        // Reset form after submit
        setFormData({ title: "", description: "", file: null });
        console.log("17")
      };

      // useEffect(() => {

      // }, [])


  return (
    <section className="p-8 mt-6 min-h-[72vh] lg:mt-0 rounded shadow bg-white">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
      {isEdit ? "Edit" : "Add"} Your Notes
      </h2>

      {/* Session Messages
      {sessionMsg.success && (
        <div className="text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span>{sessionMsg.success}</span>
        </div>
      )}
      {sessionMsg.error && (
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span>{sessionMsg.error}</span>
        </div>
      )} */}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        {/* Title Input */}
        <div className="md:flex mb-6">
          <label className="md:w-1/3 text-gray-800 text-xl font-bold mb-2 block">
            Title
          </label>
          <div className="md:w-2/3">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              className="form-input bg-gray-200 focus:bg-transparent w-full text-lg text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="md:flex mb-6">
          <label className="md:w-1/3 text-gray-800 text-xl font-bold mb-2 block">
            Description
          </label>
          <div className="md:w-2/3">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Enter Description"
              className="form-input bg-gray-200 focus:bg-transparent w-full text-lg text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
              required
            ></textarea>
          </div>
        </div>

        {/* File Upload */}
        <div className="md:flex mb-6">
          <label className="md:w-1/3 text-gray-800 text-xl font-bold mb-2 block">
            File
          </label>
          <div className="md:w-2/3">
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="form-input bg-gray-200 focus:bg-transparent w-full text-lg text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2 px-6 py-3 text-sm tracking-wider font-semibold rounded-md text-white"
            >
              <FaSave /> Save
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default AddNotes