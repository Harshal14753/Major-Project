import React from 'react'
import { FaFileAlt, FaCloudUploadAlt, FaShieldAlt } from "react-icons/fa";

const About = () => {
  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          About <span className="text-blue-600">Document Saver</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A secure and efficient platform to store, manage, and access your important documents anytime, anywhere.
        </p>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 - Secure Storage */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaFileAlt className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Document Storage</h3>
            <p className="text-gray-600">Save and organize your documents with ease, ensuring accessibility at all times.</p>
          </div>

          {/* Feature 2 - Cloud Backup */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaCloudUploadAlt className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud Backup</h3>
            <p className="text-gray-600">Automatically sync and backup your documents to the cloud for maximum security.</p>
          </div>

          {/* Feature 3 - Secure and Encrypted */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaShieldAlt className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Encrypted</h3>
            <p className="text-gray-600">Your documents are protected with top-tier encryption to ensure privacy and security.</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Choose Us?</h2>
          <p className="text-lg">
            Document Saver is designed to provide **effortless document management** while keeping your files 
            **secure, organized, and always accessible**. Whether you're a student, professional, or business owner, 
            our platform ensures that your documents are always within reach.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-8">
          <a href="/register" className="btn btn-primary px-6 py-3 rounded-md text-white text-lg">
            Get Started
          </a>
        </div>
      </div>
    </section>
  )
}

export default About