// import type { TaxonomyData, Species, FAQItem, Language } from './types';

export const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export const TAXONOMY_DATA = [
  { name: 'Kingdom', value: 400 },
  { name: 'Phylum', value: 300 },
  { name: 'Class', value: 300 },
  { name: 'Order', value: 200 },
  { name: 'Family', value: 278 },
  { name: 'Genus', value: 189 },
  { name: 'Species', value: 239 },
];

export const PIPELINE_STEPS = [
  'Data Preprocessing',
  'Deep Learning Model Training',
  'Taxonomic Classification',
  'Report Generation',
];

export const DUMMY_SPECIES = [
  { id: 1, name: 'Clownfish', class: 'Actinopterygii', description: 'Known for its bright orange color and symbiotic relationship with sea anemones.', imageUrl: 'https://picsum.photos/seed/clownfish/400/300' },
  { id: 2, name: 'Manta Ray', class: 'Elasmobranchii', description: 'The largest type of ray in the world, known for its graceful swimming.', imageUrl: 'https://picsum.photos/seed/mantaray/400/300' },
  { id: 3, name: 'Sea Turtle', class: 'Reptilia', description: 'Ancient mariners that navigate vast oceans and return to specific beaches to nest.', imageUrl: 'https://picsum.photos/seed/seaturtle/400/300' },
  { id: 4, name: 'Dolphin', class: 'Mammalia', description: 'Highly intelligent marine mammals known for their playful behavior.', imageUrl: 'https://picsum.photos/seed/dolphin/400/300' },
  { id: 5, name: 'Octopus', class: 'Cephalopoda', description: 'Masters of camouflage with remarkable problem-solving abilities.', imageUrl: 'https://picsum.photos/seed/octopus/400/300' },
  { id: 6, name: 'Blue Whale', class: 'Mammalia', description: 'The largest animal on Earth, feeding almost exclusively on tiny krill.', imageUrl: 'https://picsum.photos/seed/bluewhale/400/300' },
];

export const FAQ_DATA = [
  { question: 'What is this platform for?', answer: 'This platform provides tools for marine biologists to analyze DNA data and for enthusiasts to explore marine species information.' },
  { question: 'How is the DNA data processed?', answer: 'We use a state-of-the-art deep learning pipeline to classify species based on their genetic markers, ensuring high accuracy and speed.' },
  { question: 'Where does the species data come from?', answer: 'Our species data is aggregated from peer-reviewed scientific journals, global biodiversity databases, and research expeditions.' },
  { question: 'Can I contribute to the data?', answer: 'Currently, data submission is limited to registered researchers to maintain data integrity. We may open public contributions in the future.' },
];

// Language keys: 'en', 'hi'
export const I18N_STRINGS = {
  en: {
    researcher: 'Researcher',
    user: 'User',
    login: 'Login',
    selectRole: 'Select Your Role',
    dashboard: 'Dashboard',
    helpSupport: 'Help & Support',
    logout: 'Logout',
    uploadReport: 'Upload DNA Report',
    pipelineStatus: 'Pipeline Status',
    taxaDistribution: 'Taxonomic Distribution',
    samplingLocations: 'Sampling Locations',
    speciesGallery: 'Species Gallery',
    classificationDetails: 'Classification Details',
    oceanSource: 'Ocean Source',
    chatbot: 'Chatbot',
    faqTitle: 'Frequently Asked Questions',
    langToggle: 'हिंदी',
    chatPlaceholder: 'Ask about marine life...',
    welcomeChat: "Hello! How can I help you explore the ocean's wonders today?",
    species: "Species",
    class: "Class",
    description: "Description"
  },
  hi: {
    researcher: 'शोधकर्ता',
    user: 'उपयोगकर्ता',
    login: 'लॉग इन करें',
    selectRole: 'अपनी भूमिका चुनें',
    dashboard: 'डैशबोर्ड',
    helpSupport: 'सहायता और समर्थन',
    logout: 'लॉग आउट',
    uploadReport: 'डीएनए रिपोर्ट अपलोड करें',
    pipelineStatus: 'पाइपलाइन स्थिति',
    taxaDistribution: 'वर्गीकरण वितरण',
    samplingLocations: 'नमूनाकरण स्थान',
    speciesGallery: 'प्रजाति गैलरी',
    classificationDetails: 'वर्गीकरण विवरण',
    oceanSource: 'महासागर स्रोत',
    chatbot: 'चैटबॉट',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    langToggle: 'English',
    chatPlaceholder: 'समुद्री जीवन के बारे में पूछें...',
    welcomeChat: 'नमस्ते! मैं आज आपको समुद्र के आश्चर्यों का पता लगाने में कैसे मदद कर सकता हूँ?',
    species: "प्रजाति",
    class: "वर्ग",
    description: "विवरण"
  }
};
