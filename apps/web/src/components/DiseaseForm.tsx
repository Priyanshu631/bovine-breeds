"use client";

import { useState } from "react";

export const DiseaseForm = () => {
  const [formData, setFormData] = useState<any>({});
  const [output, setOutput] = useState<string>("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput(JSON.stringify(formData, null, 2));
  };

  const renderSelect = (label: string, options: string[] | number[]) => (
    <div className="flex flex-col gap-1">
      <label className="text-amber-900 font-medium">{label}</label>
      <select
        onChange={(e) => handleChange(label, e.target.value)}
        className="border border-amber-300 bg-amber-50 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4"
    >
      {renderSelect("Breed", [
    'Alambadi', 'Amritmahal', 'Ayrshire', 'Banni', 'Bargur', 'Bhadawari',
    'Brown_Swiss', 'Dangi', 'Deoni', 'Gir', 'Guernsey', 'Hallikar', 'Hariana',
    'Holstein_Friesian', 'Jaffrabadi', 'Jersey', 'Kangayam', 'Kankrej',
    'Kasargod', 'Kenkatha', 'Kherigarh', 'Khillari', 'Krishna_Valley',
    'Malnad_gidda', 'Mehsana', 'Murrah', 'Nagori', 'Nagpuri', 'Nili_Ravi',
    'Nimari', 'Ongole', 'Pulikulam', 'Rathi', 'Red_Dane', 'Red_Sindhi',
    'Sahiwal', 'Surti', 'Tharparkar', 'Toda', 'Umblachery', 'Vechur'
])}

      {renderSelect("Age", [2,3,4,5,6,7,8,9])}
      {renderSelect("Gender", ["Female", "Male"])}

      {renderSelect("Weight", [
        600,580,650,590,700,620,570,550,630,610,500,560,450,680,720,750,
      ])}

      {renderSelect("Symptom 1", [
        "Fever","Lethargy","Decreased Milk Yield","Appetite Loss","Diarrhea",
        "Coughing","Loss of Appetite","Weight Loss","Nasal Discharge","Labored Breathing",
      ])}

      {renderSelect("Symptom 2", [
        "Nasal Discharge","Decreased Milk Yield","Lethargy","Fever","Diarrhea",
        "Coughing","Weight Loss","Dehydration","Reduced Milk Production","Labored Breathing","Loss of Appetite",
      ])}

      {renderSelect("Symptom 3", [
        "Labored Breathing","Fever","Decreased Milk Yield","Appetite Loss",
        "Lethargy","Diarrhea","Loss of Appetite","Coughing","Nasal Discharge",
      ])}

      {renderSelect("Symptom 4", [
        "Coughing","No","Appetite Loss","Lethargy","Nasal Discharge",
        "Decreased Milk Yield","Fever","Dehydration","Reduced Milk Production",
        "Loss of Appetite","Weight Loss","Swollen Legs",
      ])}

      {renderSelect("Duration", [
        "5 days","8 days","7 days","6 days","4 days","3 days","10 days",
      ])}

      {renderSelect("Appetite Loss", ["Yes","No"])}
      {renderSelect("Vomiting", ["Yes","No"])}
      {renderSelect("Diarrhea", ["Yes","No"])}
      {renderSelect("Coughing", ["Yes","No"])}
      {renderSelect("Labored_Breathing", ["Yes","No"])}
      {renderSelect("Lameness", ["Yes","No"])}
      {renderSelect("Skin_Lesions", ["Yes","No"])}
      {renderSelect("Nasal_Discharge", ["Yes","No"])}
      {renderSelect("Eye_Discharge", ["Yes","No"])}

      {renderSelect("Body Temperature", [
        "40.1°C","39.6°C","39.7°C","39.5°C","39.8°C","39.4°C",
        "39.9°C","39.1°C","39.3°C","40.0°C","39.2°C","39.0°C",
      ])}

      {renderSelect("Heart_Rate", [
        90,70,80,75,82,79,81,85,83,84,86,87,78,77,95,100,
      ])}

      <button
        type="submit"
        className="mt-4 bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
      >
        Generate JSON
      </button>

      {output && (
        <pre className="mt-4 p-4 bg-amber-100 rounded-lg text-sm text-amber-900 overflow-x-auto">
          {output}
        </pre>
      )}
    </form>
  );
};
