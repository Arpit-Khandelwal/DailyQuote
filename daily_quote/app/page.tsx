"use client"

import { Quote } from '@/components/quote';
import { CopilotKit } from '@copilotkit/react-core';

export default function Home() {

  return (
    <>
      <CopilotKit runtimeUrl='/api/copilotkit'>
        {/* <h1>Daily Motivational Quote</h1> */}
        <Quote />
      </CopilotKit>
    </>
  );
}