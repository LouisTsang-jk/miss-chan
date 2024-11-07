import { Form, ActionPanel, Action } from "@raycast/api";
import { useState } from "react";
import { LocalStorage } from "@raycast/api";

export default function Settings() {
  const [apiKey, setApiKey] = useState<string>("");

  const handleSave = () => {
    LocalStorage.setItem("XAI_API_KEY", apiKey);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save" onSubmit={handleSave} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="apiKey"
        title="API Key"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={setApiKey}
      />
    </Form>
  );
}

export async function getAPIKey(): Promise<string> {
  return await LocalStorage.getItem("XAI_API_KEY") || "";
}
