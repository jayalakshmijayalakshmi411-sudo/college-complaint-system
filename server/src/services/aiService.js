import axios from "axios";

const COMPLAINT_CATEGORIES = [
  "Classroom",
  "Laboratory",
  "Hostel",
  "Wi-Fi",
  "Infrastructure",
  "Transportation",
  "Cleanliness",
  "Other",
];

export const aiService = {
  async categorizeComplaint(title, description) {
    try {
      const prompt = `Given this college complaint, categorize it into one of these categories: ${COMPLAINT_CATEGORIES.join(
        ", "
      )}. 
      
      Complaint Title: ${title}
      Complaint Description: ${description}
      
      Respond with ONLY the category name, nothing else.`;

      // Using Google Generative AI (Gemini)
      if (process.env.GOOGLE_API_KEY) {
        return await this.categorizeWithGoogleAI(prompt);
      }
      // Fallback to simple keyword matching
      return this.categorizeWithKeywordMatching(title, description);
    } catch (error) {
      console.error("AI Categorization Error:", error.message);
      return null;
    }
  },

  async categorizeWithGoogleAI(prompt) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          timeout: 5000,
        }
      );

      const category = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (COMPLAINT_CATEGORIES.includes(category)) {
        return category;
      }
      return null;
    } catch (error) {
      console.error("Google AI Error:", error.message);
      return null;
    }
  },

  categorizeWithKeywordMatching(title, description) {
    const text = `${title} ${description}`.toLowerCase();

    const keywords = {
      Classroom: ["class", "classroom", "lecture", "teaching", "course"],
      Laboratory: ["lab", "laboratory", "computer", "equipment", "experiment"],
      Hostel: ["hostel", "dorm", "dormitory", "room", "bed", "accommodation"],
      "Wi-Fi": ["wifi", "internet", "connection", "network", "broadband"],
      Infrastructure: ["building", "road", "facility", "infrastructure", "construction"],
      Transportation: ["bus", "transport", "vehicle", "commute", "parking"],
      Cleanliness: ["clean", "hygiene", "dirty", "waste", "sanitation"],
      Other: [],
    };

    for (const [category, words] of Object.entries(keywords)) {
      if (words.some((word) => text.includes(word))) {
        return category;
      }
    }

    return "Other";
  },

  async summarizeComplaint(description) {
    try {
      const prompt = `Summarize this college complaint in 2-3 sentences. Keep it concise and clear.
      
      Complaint: ${description}
      
      Respond with only the summary, nothing else.`;

      // Using Google Generative AI
      if (process.env.GOOGLE_API_KEY) {
        return await this.summarizeWithGoogleAI(prompt);
      }
      // Fallback to simple truncation
      return this.simpleSummarize(description);
    } catch (error) {
      console.error("AI Summarization Error:", error.message);
      return null;
    }
  },

  async summarizeWithGoogleAI(prompt) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          timeout: 5000,
        }
      );

      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
    } catch (error) {
      console.error("Google AI Summarization Error:", error.message);
      return null;
    }
  },

  simpleSummarize(description) {
    // Simple summarization: take first 2-3 sentences
    const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];
    return sentences.slice(0, 2).join(" ").trim();
  },
};

export default aiService;
