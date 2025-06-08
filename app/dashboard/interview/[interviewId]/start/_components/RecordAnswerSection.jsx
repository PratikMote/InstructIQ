'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';

import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';

// Dynamically import Webcam to avoid SSR issues
const Webcam = dynamic(() => import('react-webcam'), { ssr: false });
// Dynamically import useSpeechToText (safe from SSR)
const useSpeechToText = dynamic(
  () => import('react-hook-speech-to-text').then((mod) => mod.default),
  { ssr: false }
);

function RecordAnswerSection({ mockInterviewQuestion = [], activeQuestionIndex = 0, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const [results, setResults] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const currentQuestion = mockInterviewQuestion[activeQuestionIndex];

  useEffect(() => {
    setUserAnswer('');
    setResults([]);
    setHasSubmitted(false);
  }, [activeQuestionIndex]);

  const handleResult = (transcript) => {
    setUserAnswer((prev) => prev + ' ' + transcript);
  };

  const startSpeech = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleResult(transcript);
        setIsRecording(false);
        recognition.stop();
      };

      recognition.onerror = (e) => {
        toast.error('Speech recognition error.');
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      setIsRecording(true);
    } catch (err) {
      toast.error('Could not access microphone.');
      console.error('Speech error:', err);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setUserAnswer('');
      setResults([]);
      startSpeech();
    }
  };

  useEffect(() => {
    if (!isRecording && userAnswer.trim().length > 10 && !hasSubmitted) {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const UpdateUserAnswer = async () => {
    if (!currentQuestion || hasSubmitted) return;

    setLoading(true);
    setHasSubmitted(true);

    const feedbackPrompt = `
      Analyze the following interview answer and provide feedback.
      Question: ${currentQuestion?.question}
      Answer: ${userAnswer}
      Respond in this strict JSON format:
      {
        "rating": "number from 0 to 10",
        "feedback": "Give feedback in 3 to 5 lines"
      }
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = (await result.response.text()).replace(/```json|```/g, '').trim();

      let JsonFeedbackResp;
      try {
        JsonFeedbackResp = JSON.parse(responseText);
      } catch (err) {
        toast.error('Invalid feedback format. Please retry the question.');
        console.error('JSON Parse Error:', err);
        return;
      }

      const insertResp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: currentQuestion?.question,
        correctAns: currentQuestion?.answer,
        userAns: userAnswer.trim(),
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('YYYY-MM-DD'),
      });

      if (insertResp) {
        toast.success('Your answer and feedback were saved successfully!');
        setUserAnswer('');
        setResults([]);
      }
    } catch (err) {
      console.error('Gemini Feedback Error:', err);
      toast.error('Something went wrong while analyzing your answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          className="absolute"
          alt="webcam-mask"
        />
        <Webcam
          mirrored
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
          onUserMediaError={() => toast.error('Webcam access error')}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={toggleRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
