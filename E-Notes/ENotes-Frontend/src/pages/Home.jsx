import React from 'react'
import { FaDownload, FaUsers, FaFileAlt, FaMapMarkerAlt } from "react-icons/fa";

const Home = () => {

  

  return (
    <> 
    <section>
      {/* Hero Section */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center" src="/src/images/image.png" alt="Notes" />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Enotes</h1>
            <p className="mb-8 leading-relaxed">
            ENotes is your digital companion for effortless learning and organized note-taking. Whether you're a student, educator, or lifelong learner, ENotes provides a seamless platform to create, manage, and share notes with ease. With a user-friendly interface and powerful features, ENotes helps you stay on top of your studies, collaborate with peers, and keep your knowledge at your fingertips. Join ENotes today and experience the future of learning and productivity
            </p>
            <div className="flex justify-center">
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              We’ve helped thousands of students <br/>
               with their essays and homework.
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Are you finding it difficult to grasp the concepts of a book you're reading or feeling stuck on how to begin your essay? Don't worry—you’re not alone. Our platform is designed to connect you with knowledgeable Educators who are ready to assist you with any academic challenge you're facing. Whether you're struggling with understanding a complex topic, need guidance on essay structure, or require help with specific questions, our Educators are here to provide clear, insightful answers. With a wealth of experience, they have successfully responded to over 100,000 questions from students just like you, ensuring that you get the help you need to excel in your studies..
            </p>
          </div>
          <div className="flex flex-wrap -m-4 text-center">
            {[{ icon: FaDownload, value: "2.7K", label: "Downloads" },
              { icon: FaUsers, value: "1.3K", label: "Users" },
              { icon: FaFileAlt, value: "74", label: "Files" },
              { icon: FaMapMarkerAlt, value: "46", label: "Places" }].map((stat, index) => (
              <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <stat.icon className="text-indigo-500 w-12 h-12 mb-3 inline-block" />
                  <h2 className="title-font font-medium text-3xl text-gray-900">{stat.value}</h2>
                  <p className="leading-relaxed">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Testimonials</h1>
          <div className="flex flex-wrap -m-4">
            {[{ name: "HARSH KAKAD", role: "UI DEVELOPER", text: "Working with Harsh Kakad was a fantastic experience! They brought my vision to life with stunning designs that perfectly aligned with my brand. Highly recommend!" },
              { name: "ROHIT KATORE", role: "DEVELOPER", text: "Absolutely thrilled with the designs! They perfectly captured my vision and brought it to life." }].map((testimonial, index) => (
              <div key={index} className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <p className="leading-relaxed mb-6">{testimonial.text}</p>
                  <div className="flex items-center">
                    <img alt="testimonial" src="https://dummyimage.com/106x106" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">{testimonial.name}</span>
                      <span className="text-gray-500 text-sm">{testimonial.role}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
    </>
  )
}

export default Home