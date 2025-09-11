"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BrainCircuit, Leaf } from 'lucide-react';
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';

export default function LandingPage() {
  return (
    <ClientOnlyWrapper>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            <Card className="w-full text-center shadow-2xl rounded-2xl border">
              <CardHeader>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
                  <BrainCircuit className="mx-auto h-16 w-16 text-primary" />
                </motion.div>
                <CardTitle className="text-4xl font-extrabold tracking-tight mt-4">
                  AI-Powered Indian Bovine Breed Identifier
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground pt-2 max-w-xl mx-auto">
                  Leveraging deep learning to accurately identify breeds of cattle and buffalo from an image, ensuring data integrity for India&apos;s national livestock programs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <p className="text-muted-foreground">
                    This tool provides instant, data-driven breed suggestions to support Field Level Workers and enhance the Bharat Pashudhan database.
                  </p>
                  <Link href="/predict" passHref>
                    <Button size="lg" className="mt-4 font-bold">
                      <Leaf className="mr-2 h-5 w-5" /> Go to Prediction Tool
                    </Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.main>
    </ClientOnlyWrapper>
  );
}