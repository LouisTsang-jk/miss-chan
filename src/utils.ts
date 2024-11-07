import axios from 'axios';
import { getAPIKey } from './settings'; // Import the function to get the API key

const model = 'gemma2';

export async function queryOllama(prompt: string): Promise<string> {
  const response = await axios.post(`http://localhost:11434/v1/completions`, {
    model: model,
    prompt: prompt,
  }, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (response.status !== 200) {
    throw new Error(`Ollama API error: ${response.statusText}`);
  }

  const data = response.data as { choices: { text: string }[] };
  console.log("data:", data.choices[0].text)
  return data.choices[0].text;
}

export async function queryGrok(prompt: string): Promise<string> {
  const apiKey = await getAPIKey();
  console.log('api key:', apiKey)
  const response = await axios.post(`https://api.x.ai/v1/chat/completions`, {
    messages: [
      {
        role: "system",
        content: "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "grok-beta",
    stream: false,
    temperature: 0
  }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}` // Use the API key from settings
    }
  });

  if (response.status !== 200) {
    throw new Error(`Grok API error: ${response.statusText}`);
  }

  const data = response.data as { choices: { message: { content: string } }[] };
  console.log("data:", data.choices[0].message.content)
  return data.choices[0].message.content;
}