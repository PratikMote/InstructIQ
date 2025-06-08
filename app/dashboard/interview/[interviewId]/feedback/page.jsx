'use client';

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  const calculateAverageRating = () => {
    if (feedbackList.length === 0) return null;
    const total = feedbackList.reduce((sum, item) => {
      const rating = parseFloat(item.rating);
      return sum + (isNaN(rating) ? 0 : rating);
    }, 0);
    return (total / feedbackList.length).toFixed(1);
  };

  const getRatingColor = (avg) => {
    if (avg >= 8) return 'text-green-600';
    if (avg >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const averageRating = calculateAverageRating();
  const avgRatingNumber = parseFloat(averageRating);

  return (
    <div className="p-10 space-y-6">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>

          <h2 className={`text-lg my-3 font-semibold ${getRatingColor(avgRatingNumber)}`}>
            Your overall interview rating:{' '}
            <strong>{averageRating} / 10</strong>
          </h2>

          {feedbackList.length < 5 && (
            <p className="text-yellow-600 text-sm">
              Only {feedbackList.length} of 5 questions were attempted. Complete all to improve your feedback quality.
            </p>
          )}

          <h2 className="text-sm text-gray-500">
            Find below the interview questions with correct answers, your responses, and improvement feedback.
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-5">
              <CollapsibleTrigger className="p-3 bg-secondary rounded-lg flex justify-between items-center w-full text-left">
                {item.question}
                <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-3 mt-3">
                  <div className="p-2 border rounded-lg text-red-500">
                    <strong>Rating:</strong> {item.rating}/10
                  </div>
                  <div className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer:</strong> {item.userAns}
                  </div>
                  <div className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer:</strong> {item.correctAns}
                  </div>
                  <div className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                    <strong>Feedback:</strong> {item.feedback}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button className="mt-6" onClick={() => router.replace('/dashboard')}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
