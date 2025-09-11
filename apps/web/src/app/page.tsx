"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, PawPrint } from 'lucide-react';

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
      >
        <Card className="w-full max-w-3xl text-center shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gray-100 p-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <PawPrint className="w-12 h-12 text-primary" />
              <BrainCircuit className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-4xl font-extrabold tracking-tight text-gray-800">
              AI-Powered Indian Bovine Breed Identifier
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground pt-3">
              Leveraging advanced deep learning to accurately identify breeds of cattle and buffalo from a single image.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <p className="text-lg text-gray-600">
              This tool provides instant, data-driven breed suggestions to support Field Level Workers, ensuring data integrity for India's national livestock programs and the Bharat Pashudhan database.
            </p>
            <Link href="/predict" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="mt-4 text-lg px-8 py-6 rounded-full font-bold">
                  Go to Prediction Tool
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
