# 🩺 AI-Powered Medical Diagnosis Assistant

An intelligent medical diagnosis assistant that leverages AI to help users understand their symptoms, get possible diagnosis suggestions, and receive emergency advice or locate nearby specialists. The platform aims to be a smart first-step healthcare guide.

## 📝 Description

The AI-Powered Medical Diagnosis Assistant enables users to describe their symptoms and get AI-powered suggestions for potential diagnoses. It enhances the user experience by recommending relevant specialists and nearby clinics. The platform also manages static user medical history (with plans for database integration in the future).

---

## 🚀 Features

- ✅ **Symptom Checker using AI**  
  Users can input symptoms, and the system will analyze them using medical language models.

- ✅ **Diagnosis Suggestions with Confidence Scores**  
  Provides likely medical conditions with associated confidence levels.

- ✅ **Doctor and Clinic Locator**  
  Integrates Google Maps API to help users find relevant specialists or clinics nearby.

- ✅ **Emergency Recommendations**  
  Detects potentially critical symptoms and provides immediate next steps.

- ✅ **User Medical History Management (Static)**  
  Keeps a basic history of previous symptoms and results for better tracking (expandable via database later).

---

## 🧠 AI Capabilities

Powered by **Gemini 1.5 Pro LLM**, the assistant can:

- 🔍 Analyze symptom inputs using medical knowledge.
- 🏥 Suggest treatments and provide medical recommendations.
- 🧬 Detect potential patterns for rare or chronic diseases.

---

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/) for modern UI components

### AI
- [Gemini 1.5 Pro](https://deepmind.google/technologies/gemini/) (via Google API or fine-tuned model)

### APIs
- **Google Maps API** for location-based doctor/clinic suggestions

---

## 📦 Future Improvements

- 🗂️ Dynamic storage of user medical history in a secure database  
- 🔄 Real-time updates and feedback loop to fine-tune AI model  
- 🔒 Enhanced user authentication and privacy management

---

## 📌 Getting Started

1. Clone this repository:
   git clone https://github.com/arsk2512/your-medical-diagnosis-assistant.git
   cd your-medical-diagnosis-assistant

2. Install dependencies:
npm install / yarn install
Set up environment variables (Google Maps API key, AI model key, etc.).

Run the development server:
npm run dev
🤝 Contributing
Contributions, suggestions, and feedback are welcome! Please feel free to open issues or submit pull requests.

📄 License
This project is licensed under the MIT License.

📬 Contact
For questions, feedback, or collaborations, reach out to:
📧 abd.rehmankh2@gmail.com
