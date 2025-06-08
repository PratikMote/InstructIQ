'use client';

import { Button } from '@/components/ui/button';
import Header from './dashboard/_components/Header';
import Footer from './dashboard/_components/Footer';

export default function Home() {
  const features = [
    { title: "Real‑Time Feedback", desc: "Get interview scores & tips instantly." },
    { title: "Personalized Questions", desc: "Tailored to your profile & goals." },
    { title: "Real Interview Simulator", desc: "Simulates real interview environments." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 flex-grow">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">
              New
            </span>
            <span className="text-sm font-medium">
              INSTRUCTIQ.com – All new Apps
            </span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <h1 className="mb-4 text-4xl font-extrabold leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            AI Mock Interview Taker
          </h1>

          <p className="mb-8 text-lg text-gray-500 lg:text-xl dark:text-gray-400">
            Double your chances of landing that job offer with our AI-powered interview prep
          </p>

          <div className="sm:flex sm:justify-center sm:space-x-4">
           <Button asChild>
  <a
    href="/dashboard"
    className="inline-flex justify-center items-center py-5 px-12 text-2xl font-bold text-white rounded-full bg-primary hover:bg-primary-dark focus:ring-8 focus:ring-primary-400 dark:focus:ring-primary-900 shadow-2xl hover:shadow-3xl transition-all duration-300"
  >
    Get Started
    <svg className="ml-3 -mr-1 w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </a>
</Button>
          </div>
        </div>
      </section>

      {/* Feature Boxes Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            What Our AI Tool Offers
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 p-6 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-300 group"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
