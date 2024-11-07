import { queryOllama, queryGrok } from "./utils";
import { showToast, Toast, ActionPanel, Form, Action } from "@raycast/api";
import { useState, useEffect } from "react";

async function grammarCheck(text: string): Promise<string> {
  const prompt = `Check the following English text for grammar errors. If there are errors, explain the incorrect parts and the corrected version in Chinese, and then provide the corrected version of the text(english):\n\n${text}`;
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
    showToast(Toast.Style.Animated, "Checking grammar...");
    try {
      const result = await grammarCheck(text);
      setResult(result);
      showToast(Toast.Style.Success, "Grammar checked", result);
    } catch (error) {
      showToast(Toast.Style.Failure, "Failed to check grammar", String(error));
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Check Grammar" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="text"
        title="Input Text"
        placeholder="Enter text to check for grammar errors"
        value={text}
        onChange={setText}
      />
      <Form.Description title="Result" text={result} />
    </Form>
  );
}
