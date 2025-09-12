"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FilePicker } from "@/components/FilePicker";
import { ArrowLeft } from "lucide-react";
import Image from 'next/image';
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';

interface Prediction {
  breed: string;
  confidence: string;
}

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 
         0 5.373 0 12h4zm2 5.291A7.962 
         7.962 0 014 12H0c0 3.042 1.135 
         5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function PredictPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lowConfidenceWarning, setLowConfidenceWarning] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setPrediction(null);
    setError(null);
    setLowConfidenceWarning(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setPrediction(null);
    setError(null);
    setLowConfidenceWarning(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setLowConfidenceWarning(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://priyanshu631-bovine-breed-api.hf.space/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Prediction request failed.");

      const data: Prediction = await response.json();
      const confidenceValue = parseFloat(data.confidence);

      if (confidenceValue < 25) {
        setLowConfidenceWarning(
          "Confidence Is Too Low,<br />Please Provide A Valid Indian Bovine Breed Image"
        );
        setPrediction(null);
      } else {
        setLowConfidenceWarning(null);
        setPrediction(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ClientOnlyWrapper>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{
          backgroundColor: "#FFFBEB",
          backgroundImage: "url(/images/traditional-tile.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "350px 350px",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="w-full max-w-2xl z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          >
            <Card className="shadow-2xl rounded-2xl border-2 border-amber-800 bg-amber-50/70 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-extrabold text-amber-950 font-serif">
                  Breed Identification Tool
                </CardTitle>
                <CardDescription className="text-lg text-amber-900/80 pt-2">
                  Upload an image to identify the bovine breed.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {!preview ? (
                    <motion.div
                      key="picker"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FilePicker onFileChange={handleFileChange} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center space-y-4"
                    >
                      <Image
                        src={preview}
                        alt="Image preview"
                        width={400}
                        height={400}
                        className="mx-auto h-72 w-auto rounded-xl object-cover shadow-md"
                      />
                      <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
                        <Button
                          onClick={handleSubmit}
                          disabled={isLoading}
                          className="bg-amber-800 hover:bg-amber-900 text-white shadow-lg"
                        >
                          {isLoading ? (
                            <>
                              <Spinner /> <span className="ml-2">Analyzing...</span>
                            </>
                          ) : (
                            "Identify Breed"
                          )}
                        </Button>
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          disabled={isLoading}
                        >
                          Choose Different Image
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && <p className="text-center text-red-600 font-medium">{error}</p>}

                {lowConfidenceWarning && (
                  <p
                    className="text-center text-orange-600 font-medium"
                    dangerouslySetInnerHTML={{ __html: lowConfidenceWarning }}
                  />
                )}

                <AnimatePresence>
                  {prediction && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Card className="mt-6 bg-amber-100 border-amber-300">
                        <CardHeader>
                          <CardTitle className="text-center text-xl text-amber-950">
                            Prediction Result
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-1">
                          <p className="text-3xl font-extrabold text-amber-900">
                            {prediction.breed}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center mt-4">
                  <Link href="/" passHref>
                    <Button variant="link" className="text-amber-900 hover:text-amber-950">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.main>
    </ClientOnlyWrapper>
  );
}
