import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        error: "API key not found in environment variables",
        status: 500,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const fullPrompt = `
      You are a medical assistant. Based on the provided symptoms, generate a JSON object with the following structure:

      {
        "generalInfo": "General information about the symptoms.",
        "possibleCauses": [
          "Cause 1",
          "Cause 2",
          "Cause 3"
        ],
        "selfCare": [
          "Self-care tip 1",
          "Self-care tip 2",
          "Self-care tip 3"
        ],
        "whenToSeek": "When it is recommended to seek professional medical care."
      }
      
      Symptoms: ${prompt}
    `;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    let text = response.text();

    // Clean up the response
    text = text.trim().replace(/```json\s*|```/g, "");

    try {
      const jsonResponse = JSON.parse(text);
      return NextResponse.json(jsonResponse);
    } catch (error) {
      console.error("Error parsing JSON:", error, text);
      return NextResponse.json({
        error: "Failed to parse JSON from the model's response",
        status: 500,
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({
      error: "An unexpected error occurred",
      status: 500,
    });
  }
}
