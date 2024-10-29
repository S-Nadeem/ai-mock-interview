import { Lightbulb } from "lucide-react";
import React from "react";

const QuestionsAnswer = ({
  mockInterviewQuestion,
  activeInterviewQuestion,
}) => {
  return (
    mockInterviewQuestion && (
      <div className="p-5 my-5 border rounded-lg">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((item, index) => (
              <div
                key={item.question} // Assuming each question is unique
                className={`p-2 rounded-lg shadow-md bg-secondary ${
                  activeInterviewQuestion === index && "bg-black text-white"
                }`}
              >
                <h2 className="text-xs text-center cursor-pointer md:text-sm ">
                  Question # {index + 1}
                </h2>
              </div>
            ))}
        </div>
        <h2 className="my-5 text-sm md:text-base">
          {mockInterviewQuestion[activeInterviewQuestion]?.question}
        </h2>
        <div className="p-3 border rounded-lg mt-7 bg-secondary">
          <h2 className="flex my-3">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium at dolore architecto porro sint distinctio excepturi
            repellat, delectus alias voluptate.
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsAnswer;
