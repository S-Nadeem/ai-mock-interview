"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, LucideWebcam } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const InterviewPage = ({ params }) => {
  const [interviewData, setInterviewData] = useState("");
  const [webCamEnable, setWebCamEnable] = useState(false);
  const { interviewId } = React.use(params);
  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    console.log(result);
    setInterviewData(result[0]);
  };

  return (
    <>
      <div className="my-10 ">
        <h2 className="flex items-center justify-center text-3xl font-bold">
          Lets get Started
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-5 p-10 border rounded-lg shadow-lg ">
              <h2 className="text-lg">
                <strong>Job Role/Job Poition</strong>:{" "}
                {interviewData?.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/ Tech Stack</strong>:{" "}
                {interviewData?.jobDescription}
              </h2>
              <h2 className="text-lg">
                <strong>Job Experience</strong>: {interviewData?.jobExperience}
              </h2>
            </div>
            <div className="p-6 bg-yellow-100 rounded-lg shadow-lg border-3 ">
              <h2 className="flex items-center gap-2">
                <Lightbulb />
                <strong>Instructions</strong>
              </h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              possimus, incidunt voluptate qui ipsa praesentium exercitationem
              deleniti facilis nisi alias provident porro amet! Quis temporibus
              eaque, odit nesciunt quisquam earum debitis maiores laudantium.
              Incidunt nostrum repellendus pariatur necessitatibus debitis
              blanditiis eveniet officiis obcaecati, modi eum culpa cumque ut
              vero facere?
            </div>
          </div>
          <div>
            {webCamEnable ? (
              <>
                <div className="w-full my-[20px]">
                  <Webcam
                    onUserMedia={() => setWebCamEnable(true)}
                    onUserMediaError={() => setWebCamEnable(false)}
                    mirrored={true}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <LucideWebcam className="w-full p-20 border rounded-lg my-7 h-72 bg-secondary" />
                  <Button
                    className="w-full"
                    onClick={() => setWebCamEnable(true)}
                  >
                    Enable Webcam and Microphone
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-end justify-end">
          <Link href={`/dashboard/interview/${interviewId}/start`}>
            <Button>Start Interview</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default InterviewPage;
