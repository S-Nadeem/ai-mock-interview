import React from "react";
import Webcam from "react-webcam";
import webcam from "../../../../../../assests/webcam.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";

const RecordAnswerQuestion = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-20 bg-black rounded-lg ">
          <Image
            src={webcam}
            height={200}
            width={200}
            className="absolute"
            alt="webcam"
          />
          <Webcam
            mirrored={true}
            style={{
              width: "100%",
              height: 300,
              zIndex: 10,
            }}
          />
        </div>
        <Button className="my-10">Record Answer</Button>
      </div>
    </>
  );
};

export default RecordAnswerQuestion;
