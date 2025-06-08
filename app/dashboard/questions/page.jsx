"use client";
import React from "react";

const QuestionsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Practice Questions
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Explore frequently asked interview questions tailored to your field and experience level. Select a category to get started:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="font-semibold text-xl text-indigo-600">Frontend Development</h2>
          <p className="text-sm text-gray-600">HTML, CSS, JavaScript, React</p>
        </div>
        <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="font-semibold text-xl text-indigo-600">Backend Development</h2>
          <p className="text-sm text-gray-600">Node.js, Java, Databases</p>
        </div>
        <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="font-semibold text-xl text-indigo-600">Data Structures</h2>
          <p className="text-sm text-gray-600">Arrays, Linked Lists, Trees, Graphs</p>
        </div>
        <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="font-semibold text-xl text-indigo-600">System Design</h2>
          <p className="text-sm text-gray-600">Scalability, Architecture, Components</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
