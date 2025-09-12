"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sprout,Newspaper,Apple } from 'lucide-react'; 
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';
import Image from 'next/image'; // ADD THIS IMPORT

export default function LandingPage() {
  return (
    <ClientOnlyWrapper>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{
          backgroundColor: '#FFFBEB',
          backgroundImage: 'url(/images/traditional-tile.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '350px 350px',
          backgroundBlendMode: 'multiply',
          opacity: 1
        }}
      >
        <div className="w-full max-w-3xl z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            <Card className="w-full text-center shadow-2xl rounded-2xl border-2 border-amber-800 bg-amber-50/70 backdrop-blur-sm">
              <CardHeader>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
                  <div className="mx-auto h-24 w-24 text-amber-800 flex items-center justify-center">
                    {/* CORRECTED: Use the Image component */}
                    <Image
                      src="/CowIcon.png"
                      alt="Cow Icon"
                      width={96} // Equivalent to h-24 w-24
                      height={96}
                    />
                  </div>
                </motion.div>
                <CardTitle className="text-5xl font-extrabold tracking-tight mt-4 text-amber-950 font-serif">
                  GoSevak
                </CardTitle>
                <CardDescription className="text-lg text-amber-900/80 pt-2 max-w-xl mx-auto">
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
                  <p className="text-amber-900/90">
                    This tool provides instant, data-driven breed suggestions to support Field Level Workers and enhance the Bharat Pashudhan database.
                  </p>
                  <div className="flex flex-col gap-4 justify-center w-full md:flex md:flex-row">
                    <Link href="/disease" passHref>
                      <Button 
                        size="lg" 
                        className="mt-4 font-bold bg-amber-800 hover:bg-amber-900 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <Newspaper className="mr-2 h-5 w-5" /> Cattle Health Diagnosis
                      </Button>
                    </Link>
                    <Link href="/predict" passHref>
                      <Button 
                        size="lg" 
                        className="mt-4 font-bold bg-amber-800 hover:bg-amber-900 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <Sprout className="mr-2 h-5 w-5" /> Go to Prediction Tool
                      </Button>
                    </Link>
                    <Link href="/nutrition" passHref>
                      <Button 
                        size="lg" 
                        className="mt-4 font-bold bg-amber-800 hover:bg-amber-900 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <Apple className="mr-2 h-5 w-5" /> Nutritional Recommendations
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.main>
    </ClientOnlyWrapper>
  );
}