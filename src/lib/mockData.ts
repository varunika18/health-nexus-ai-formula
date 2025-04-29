
// Mock disease data for demonstration purposes
export const diseases = [
  {
    id: 1,
    name: "Hypertension",
    description: "High blood pressure that can lead to heart disease and stroke if untreated.",
    symptoms: ["Headaches", "Shortness of breath", "Nosebleeds", "Dizziness"],
    causes: ["Genetic factors", "Age", "Obesity", "High sodium intake", "Stress"]
  },
  {
    id: 2,
    name: "Type 2 Diabetes",
    description: "A chronic condition affecting how the body processes blood sugar.",
    symptoms: ["Increased thirst", "Frequent urination", "Increased hunger", "Weight loss", "Fatigue"],
    causes: ["Genetic factors", "Obesity", "Physical inactivity", "Age", "Poor diet"]
  },
  {
    id: 3,
    name: "Respiratory Infection",
    description: "Infection affecting the respiratory tract including nose, throat and lungs.",
    symptoms: ["Cough", "Sore throat", "Runny nose", "Fever", "Body aches"],
    causes: ["Viral infection", "Bacterial infection", "Allergens", "Environmental pollutants"]
  },
  {
    id: 4,
    name: "Arthritis",
    description: "Inflammation of one or more joints, causing pain and stiffness.",
    symptoms: ["Joint pain", "Stiffness", "Swelling", "Decreased range of motion", "Redness"],
    causes: ["Age", "Joint injury", "Autoimmune disorders", "Genetic factors", "Obesity"]
  },
  {
    id: 5,
    name: "Gastroesophageal Reflux Disease (GERD)",
    description: "A digestive disorder that affects the lower esophageal sphincter.",
    symptoms: ["Heartburn", "Acid reflux", "Chest pain", "Difficulty swallowing", "Chronic cough"],
    causes: ["Hiatal hernia", "Obesity", "Pregnancy", "Smoking", "Certain foods"]
  }
];

// Mock formula recommendations
export const formulas = [
  {
    id: 1,
    diseaseId: 1,
    name: "Natural BP Support Formula",
    components: ["Hibiscus extract", "Hawthorn berry", "Garlic extract", "Magnesium", "Potassium"],
    description: "A natural formula that may help maintain healthy blood pressure levels.",
    effectiveness: 82,
    researchBasis: "Clinical studies show these components may help reduce systolic and diastolic blood pressure."
  },
  {
    id: 2,
    diseaseId: 2,
    name: "Glucose Balance Complex",
    components: ["Cinnamon bark extract", "Chromium picolinate", "Gymnema sylvestre", "Alpha-lipoic acid", "Bitter melon extract"],
    description: "Supports healthy glucose metabolism and insulin sensitivity.",
    effectiveness: 75,
    researchBasis: "Research indicates these natural compounds may help improve insulin function and glucose utilization."
  },
  {
    id: 3,
    diseaseId: 3,
    name: "Respiratory Support Blend",
    components: ["Elderberry extract", "N-acetyl cysteine", "Vitamin C", "Zinc", "Echinacea"],
    description: "Supports immune function and respiratory health during infections.",
    effectiveness: 78,
    researchBasis: "Studies suggest these components may reduce duration and severity of respiratory symptoms."
  },
  {
    id: 4,
    diseaseId: 4,
    name: "Joint Comfort Formula",
    components: ["Turmeric extract", "Boswellia serrata", "MSM", "Collagen", "Ginger root"],
    description: "Arthritis support formula that helps reduce inflammation and joint discomfort.",
    effectiveness: 80,
    researchBasis: "Multiple studies show these natural anti-inflammatory compounds may help reduce joint pain and stiffness."
  },
  {
    id: 5,
    diseaseId: 5,
    name: "Digestive Harmony Blend",
    components: ["Deglycyrrhizinated licorice", "Aloe vera extract", "Slippery elm", "Marshmallow root", "Chamomile"],
    description: "Gastric issues support formula that soothes digestive discomfort.",
    effectiveness: 77,
    researchBasis: "Traditional use and clinical studies support these herbs for soothing irritated digestive tissue."
  },
  {
    id: 6,
    diseaseId: 1,
    name: "Advanced Blood Pressure Support",
    components: ["Olive leaf extract", "CoQ10", "L-arginine", "Beetroot extract", "Fish oil"],
    description: "A comprehensive formula targeting multiple pathways for blood pressure support.",
    effectiveness: 85,
    researchBasis: "Recent research highlights these components' effects on vascular health and blood pressure regulation."
  },
  {
    id: 7,
    diseaseId: 2,
    name: "Metabolic Balance Formula",
    components: ["Berberine HCL", "Banaba leaf extract", "Fenugreek", "Milk thistle", "Green tea extract"],
    description: "Supports metabolic health and balanced blood sugar levels.",
    effectiveness: 79,
    researchBasis: "Clinical trials show these botanicals may help improve insulin sensitivity and glucose metabolism."
  }
];

// Mock chat messages
export const sampleChat = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I'm your HealthNexus AI assistant. How can I help you today?"
  },
  {
    id: 2,
    role: "user",
    content: "I've been experiencing headaches, feeling dizzy, and have had some nosebleeds recently."
  },
  {
    id: 3,
    role: "ai",
    content: "I understand you're experiencing headaches, dizziness, and nosebleeds. These symptoms could be associated with several conditions, but they are commonly linked to hypertension (high blood pressure). Would you like me to provide more information about hypertension and possible natural approaches?"
  },
  {
    id: 4,
    role: "user",
    content: "Yes, please tell me more about hypertension."
  }
];

// Mock health trends data
export const healthTrends = [
  {
    region: "North America",
    topConditions: ["Obesity", "Hypertension", "Diabetes"],
    prevalence: [23, 18, 12]
  },
  {
    region: "Europe",
    topConditions: ["Cardiovascular Disease", "Mental Health Disorders", "Cancer"],
    prevalence: [19, 16, 14]
  },
  {
    region: "Asia",
    topConditions: ["Respiratory Disease", "Gastrointestinal Disorders", "Hypertension"],
    prevalence: [22, 15, 13]
  },
  {
    region: "Africa",
    topConditions: ["Infectious Disease", "Malnutrition", "Respiratory Infections"],
    prevalence: [27, 21, 17]
  }
];
