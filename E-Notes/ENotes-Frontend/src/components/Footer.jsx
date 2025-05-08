import React from 'react'
import { FaBook, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-gray-600 body-font" id="footer">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <FaBook className="w-12 h-12 p-2" />
          <span className="ml-3 text-2xl">ENotes</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 ENotes —
          <a
            href="mailto:harshaljambhale16@gmail.com"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
          >
            harshaljambhale16@gmail.com
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            className="text-gray-500 hover:text-blue-600"
            href="https://www.facebook.com/share/QnWDrYp4Q1sazg3x/?mibextid=qi2Omg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            className="ml-3 text-gray-500 hover:text-blue-400"
            href="https://x.com/HarshalJam72238?s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            className="ml-3 text-gray-500 hover:text-pink-600"
            href="https://www.instagram.com/_harshal_139?igsh=bm1mcGZmbHpzcnlu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            className="ml-3 text-gray-500 hover:text-blue-700"
            href="https://www.linkedin.com/in/harshal-jambhale-3a569027b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer