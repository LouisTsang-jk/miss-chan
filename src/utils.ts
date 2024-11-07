import axios from 'axios';

const model = 'gemma2'

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
