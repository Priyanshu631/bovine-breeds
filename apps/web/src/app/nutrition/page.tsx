"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Dog, Bone, Leaf, Droplet, Star, Search } from "lucide-react";
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';

// A list of common Indian bovine breeds for autocomplete
const BOVINE_BREEDS = [
    'Alambadi', 'Amritmahal', 'Ayrshire', 'Banni', 'Bargur', 'Bhadawari',
    'Brown Swiss', 'Dangi', 'Deoni', 'Gir', 'Guernsey', 'Hallikar', 'Hariana',
    'Holstein Friesian', 'Jaffrabadi', 'Jersey', 'Kangayam', 'Kankrej',
    'Kasargod', 'Kenkatha', 'Kherigarh', 'Khillari', 'Krishna Valley',
    'Malnad Gidda', 'Mehsana', 'Murrah', 'Nagori', 'Nagpuri', 'Nili Ravi',
    'Nimari', 'Ongole', 'Pulikulam', 'Rathi', 'Red_Dane', 'Red Sindhi',
    'Sahiwal', 'Surti', 'Tharparkar', 'Toda', 'Umblachery', 'Vechur'
];

interface Recommendation {
  icon: string;
  heading: string;
  text: string;
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

const iconMap: { [key: string]: React.ElementType } = {
  Dog,
  Bone,
  Leaf,
  Droplet,
  Star,
};

export default function NutritionPage() {
  const [inputBreed, setInputBreed] = useState<string>("");
  const [displayedBreed, setDisplayedBreed] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // NEW: State for storing autocomplete suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleFetchRecommendations = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputBreed.trim()) {
      setError("Please enter a bovine breed.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    setDisplayedBreed(null);
    // NEW: Clear suggestions on submit
    setSuggestions([]);

    try {
      const response = await fetch(`/api/nutritional-recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breed: inputBreed }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations.");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      setDisplayedBreed(inputBreed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // NEW: Handle changes in the input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputBreed(value);
    
    // Filter the breed list based on user input
    if (value.length > 0) {
      const filteredSuggestions = BOVINE_BREEDS.filter(breed =>
        breed.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };
  
  // NEW: Handle a user clicking on a suggestion
  const handleSuggestionClick = (breedName: string) => {
    setInputBreed(breedName);
    setSuggestions([]); // Clear suggestions after selection
    // You can also trigger the form submission here if you want
    // handleFetchRecommendations({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5 mr-2 text-amber-900" /> : null;
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
                  Nutritional Recommendations
                </CardTitle>
                <CardDescription className="text-lg text-amber-900/80 pt-2">
                  Find expert nutritional advice for any bovine breed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleFetchRecommendations} className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Input
                      type="text"
                      placeholder="e.g., Sahiwal, Gir, Kankrej..."
                      value={inputBreed}
                      onChange={handleInputChange} // Use the new handler
                      className="w-full bg-white/50 border-amber-300 text-amber-950 placeholder:text-amber-800/60"
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute z-20 w-full mt-1 bg-amber-50 border border-amber-300 rounded-md shadow-lg max-h-48 overflow-auto">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-amber-200 text-amber-950"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-amber-800 hover:bg-amber-900 text-white shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <Spinner /> <span className="ml-2">Generating...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" /> Find Advice
                      </>
                    )}
                  </Button>
                </form>

                {error && <p className="text-center text-red-600 font-medium">{error}</p>}

                <AnimatePresence mode="wait">
                  {recommendations && displayedBreed && (
                    <motion.div
                      key="recommendations"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="space-y-4"
                    >
                      <Card className="bg-amber-100 border-amber-300">
                        <CardContent className="pt-6 space-y-4">
                          <p className="text-xl font-extrabold text-amber-950 text-center">
                            For the {displayedBreed} breed:
                          </p>
                          {recommendations.map((rec, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.3 }}
                              className="flex items-start text-lg text-amber-900"
                            >
                              {getIcon(rec.icon)}
                              <p>
                                <span className="font-semibold text-amber-950">{rec.heading}:</span>{" "}
                                {rec.text}
                              </p>
                            </motion.div>
                          ))}
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