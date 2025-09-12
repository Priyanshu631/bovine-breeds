"use client";

import { DiseaseForm } from "@/components/DiseaseForm";
import { motion,AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{
          backgroundColor: '#FFFBEB', // Light cream base
          backgroundImage: 'url(/images/traditional-tile.png)', // Path to your tileable pattern
          backgroundRepeat: 'repeat',
          backgroundSize: '350px 350px', // Adjust size as needed for your pattern
          backgroundBlendMode: 'multiply', // Blend with background color for subtlety
          opacity: 1 // Ensure main container has full opacity
        }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
        className="w-full max-w-3xl z-10"
      >
        <Card className="shadow-2xl rounded-2xl border-2 border-amber-800 bg-amber-50/70 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-extrabold text-amber-950 font-serif">
                  Cattle Health Diagnosis Form
                </CardTitle>
                <CardDescription className="text-lg text-amber-900/80 pt-2">
                  Fill in the form for disease prediction based on symptoms.
                </CardDescription>
                
              </CardHeader>
              
              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                    <motion.div
                      key="picker"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <DiseaseForm />
                    </motion.div>

                <div className="text-center mt-4">
                  <Link href="/" passHref>
                    <Button variant="link" className="text-amber-900 hover:text-amber-950">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                  </Link>
                </div>
                </AnimatePresence>
              </CardContent>

        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
