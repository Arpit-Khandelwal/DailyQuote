"use client"
import { useState } from "react";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import "@copilotkit/react-textarea/styles.css";
 
export default function TextArea() {
  const [text, setText] = useState("");
 
  return (
    <CopilotTextarea
    //Q: how do i make this text box bigger as user types?
    //A: You achieve this by changing class name to w-full h-40 p-4 border border-gray-300 rounded-md
      className="w-1/2 h-1/4 p-4 border border-gray-300 rounded-md"
      value={text}
      onValueChange={(value: string) => setText(value)}
      placeholder="How do you feel..."
      autosuggestionsConfig={{
        textareaPurpose: "help the user express how they feel and navigate them in a positive direction",
        chatApiConfigs: {
          suggestionsApiConfig: {
            maxTokens: 100,
            stop: [".", "?", "!"],
          },
        },
      }}
    />
  );
}