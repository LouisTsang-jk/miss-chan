import { queryGrok } from "./utils";
import { showToast, Toast, ActionPanel, Form, Action } from "@raycast/api";
import { useState, useEffect } from "react";

async function translateToEnglish(text: string): Promise<string> {
  const prompt = `Translate the following Chinese text to English:\n\n${text}`;
  return await queryGrok(prompt);
}

export default function Command(props: { arguments: { text?: string } }) {
  const initialText = props.arguments.text || "";
  const [text, setText] = useState<string>(initialText);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (initialText) {
      handleSubmit();
    }
  }, [initialText]);

  async function handleSubmit() {
    showToast(Toast.Style.Animated, "Translating...");
    try {
      const result = await translateToEnglish(text);
      setResult(result);
      showToast(Toast.Style.Success, "Translation complete", result);
    } catch (error) {
      showToast(Toast.Style.Failure, "Failed to translate", String(error));
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Translate" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="text"
        title="Input Text"
        placeholder="Enter Chinese text to translate to English"
        value={text}
        onChange={setText}
      />
      <Form.Description title="Result" text={result} />
    </Form>
  );
}
