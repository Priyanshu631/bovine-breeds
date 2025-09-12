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
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
);

export default function PredictPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State for the low confidence warning
  const [lowConfidenceWarning, setLowConfidenceWarning] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setPrediction(null);
    setError(null);
    setLowConfidenceWarning(null); // Reset warning on new file
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };
  
  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setPrediction(null);
    setError(null);
    setLowConfidenceWarning(null); // Reset warning
  }

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

      if (!response.ok) {
        throw new Error("Prediction request failed. Is the backend server running?");
      }

      const data: Prediction = await response.json();
      
      // --- DEBUGGING LOGS ---
      console.log("API Response Data:", data);

      const confidenceValue = parseFloat(data.confidence);
      console.log("Parsed Confidence Value:", confidenceValue);

      if (confidenceValue < 25) {
        console.log("Confidence is LOW (< 25). Setting warning.");
        setLowConfidenceWarning("Confidence Is Too Low,<br />Please Provide A Valid Indian Bovine Breed Image");
        setPrediction(null);
      } else {
        console.log("Confidence is HIGH (>= 25). Setting prediction.");
        setLowConfidenceWarning(null); // Clear previous warnings
        setPrediction(data);
      }
      // ------------------------

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error(err);
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
        className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50"
      >
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-3xl text-center font-bold tracking-tight">
                  Breed Identification Tool
                </CardTitle>
                <CardDescription className="text-center pt-1">
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
                        <Button onClick={handleSubmit} disabled={isLoading}>
                          {isLoading ? <><Spinner /> <span className="ml-2">Analyzing...</span></> : "Identify Breed"}
                        </Button>
                        <Button onClick={handleReset} variant="outline" disabled={isLoading}>
                          Choose Different Image
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Display regular errors in red */}
                {error && <p className="text-center text-red-600 font-medium">{error}</p>}

                {/* Display the low confidence warning in orange */}
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
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Card className="mt-6 bg-gray-100 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-center text-xl">Prediction Result</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-1">
                          <p className="text-4xl font-extrabold text-primary">{prediction.breed}</p>
                          <p className="text-lg text-muted-foreground">Confidence: {prediction.confidence}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center mt-4">
                  <Link href="/" passHref>
                    <Button variant="link">
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