"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HowItWorks() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleMockInterviewClick = () => {
    if (isSignedIn) {
      router.push("/sign-up"); // your actual mock interview route
    } else {
      router.push("/sign-in?redirect_url=/dashboard/mock"); // go to sign-in, then return after login
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-6">
          How the AI Interview Mocker Works
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          Our{" "}
          <span className="font-semibold text-indigo-600">
            AI Interview Mocker Tool
          </span>{" "}
          is designed to simulate real-world technical and HR interviews. It
          helps job seekers prepare confidently by offering personalized,
          realistic interview simulations powered by AI.
        </p>

        <ol className="list-decimal ml-6 text-gray-800 space-y-4">
          <li>
            <span className="font-semibold text-indigo-600">
              Choose a Role or Domain:
            </span>{" "}
            Select your job role like Frontend Developer, Backend Developer, or
            HR Interview.
          </li>
          <li>
            <span className="font-semibold text-indigo-600">
              Get Personalized Questions:
            </span>{" "}
            The AI dynamically generates questions based on your skillset.
          </li>
          <li>
            <span className="font-semibold text-indigo-600">
              Record or Type Your Answers:
            </span>{" "}
            Use voice or keyboard to respond to questions.
          </li>
          <li>
            <span className="font-semibold text-indigo-600">
              Get Instant AI Feedback:
            </span>{" "}
            Receive real-time feedback on technical skills, confidence, and
            communication.
          </li>
        </ol>

        <div className="mt-8 bg-indigo-100 border-l-4 border-indigo-500 text-indigo-700 p-4 rounded">
          <p className="font-medium">Tip:</p>
          <p>
            You can retake interviews anytime. The system adapts based on your
            previous attempts to give better preparation.
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg font-medium text-gray-800 mb-3">
            Ready to get started?
          </p>
          <button
            onClick={handleMockInterviewClick}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Try a Mock Interview Now
          </button>
        </div>
      </div>
    </main>
  );
}
