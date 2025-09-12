"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react'; // Keeping Sprout for the button, it's a nice earthy touch
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';

export default function LandingPage() {
  return (
    <ClientOnlyWrapper>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        // Adjusted for tiled background pattern using CSS
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
        <div className="w-full max-w-3xl z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            <Card className="w-full text-center shadow-2xl rounded-2xl border-2 border-amber-800 bg-amber-50/70 backdrop-blur-sm">
              <CardHeader>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
                  {/* Custom SVG for a cow */}
                  <div className="mx-auto h-24 w-24 text-amber-800 flex items-center justify-center">
                    <img src="/CowIcon.png" alt="Cow Icon" />
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
                  <Link href="/predict" passHref>
                    <Button 
                      size="lg" 
                      className="mt-4 font-bold bg-amber-800 hover:bg-amber-900 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <Sprout className="mr-2 h-5 w-5" /> Go to Prediction Tool
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