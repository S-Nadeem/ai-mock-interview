"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { chatSession } from "../../utils/GeminiAIModal";
import { Loader2 } from "lucide-react";
import { MockInterview } from "../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "../../utils/db";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobDesc, setjobDesc] = useState(null);
  const [jobPosition, setJobPosition] = useState(null);
  const [jobExp, setExp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [JsonDataResponse, setJsonDataResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputPrompt = `Job Position:${jobPosition} , Job Description:${jobDesc} Years of Experience is ${jobExp} Depends on this information can you give me ${process.env.NEXT_PUBLIC_PROMPT_QUESTIONS_NUMBER} interview Questions with answered in JSON format Dont give explanations for this questions at last`;
    const result = await chatSession.sendMessage(inputPrompt);
    const rawData = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
    const mockData = JSON.parse(rawData);
    setJsonDataResponse(mockData);

    if (mockData) {
      const dbResponse = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jobMockResponse: mockData,
          jobPosition: jobPosition,
          jobDescription: jobDesc,
          jobExperience: jobExp,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log("dbResponse", dbResponse);
      setLoading(false);
    } else {
      throw new Error("failed Data");
    }
    console.log(dbResponse);
    if (dbResponse) {
      setOpenDialog(false);
      router.push("/dashboard/interview/" + dbResponse[0]?.mockId);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg hover:shadow-md bg-secondary hover:scale-105"
        onClick={() => setOpenDialog(true)}
      >
        <span className="block text-xl text-center">+ Add New</span>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us More About Your Profile
            </DialogTitle>
            <form onSubmit={onSubmitHandler}>
              <div>
                <span className="block mb-2 text-gray-900">
                  Add your job details and more about your tech stack.
                </span>
                <div className="my-3">
                  <label>Job Position / Role Name</label>
                  <Input
                    className="mt-2 bg-gray-50"
                    placeholder="Ex: Full Stack Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div>
                  <label>Job Description / Tech Stack in short</label>
                  <Textarea
                    className="my-3 bg-gray-50"
                    placeholder="Ex: React, Angular, Node.js, MongoDb etc"
                    required
                    onChange={(e) => setjobDesc(e.target.value)}
                  />
                </div>
                <div>
                  <label>Years of Experience</label>
                  <Input
                    type="Number"
                    className="my-3 bg-gray-50"
                    placeholder="5"
                    required
                    onChange={(e) => setExp(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-5 mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Generating AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
