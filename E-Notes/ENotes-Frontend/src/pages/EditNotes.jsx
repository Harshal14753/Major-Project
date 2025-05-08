import React from 'react'

const EditNotes = () => {

    

  return (
    <section className="p-8 mt-6 min-h-[72vh] lg:mt-0 rounded shadow bg-white">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Add Your Notes
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

export default EditNotes