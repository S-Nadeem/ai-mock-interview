"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsAnswer from "./_components/QuestionsAnswer";
import RecordAnswerQuestion from "./_components/RecordAnswerQuestion";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState("");
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeInterviewQuestion, setActiveInterviewQuestion] = useState(0);
  const { interviewId } = React.use(params);
  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    const filteredData = JSON.parse(
      result[0].jobMockResponse
        .replace(/\\"/g, '"') // Remove all escaped quotes
        .replace(/^"|"$/g, "") // Remove leading and trailing quotes around the entire string
        .replace(/^{/, "[") // Replace starting { with [
        .replace(/}$/, "]") // Replace ending } with ]
        .replace(/},{/g, "},{") // Ensure separation by comma between objects
        .replace(/}{/g, "},{") // Handle cases where objects have no separator
        .replace(/"{/g, "{") // Remove quotes around object starts
        .replace(/}"/g, "}")
    );
    setMockInterviewQuestion(filteredData);
    setInterviewData(result[0]);
    console.log(filteredData);
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <QuestionsAnswer
          mockInterviewQuestion={mockInterviewQuestion}
          activeInterviewQuestion={activeInterviewQuestion}
        />
        <RecordAnswerQuestion />
      </div>
    </div>
  );
};

export default StartInterview;
