"use client"

import { CopilotTextarea } from "@copilotkit/react-textarea";
import "@copilotkit/react-textarea/styles.css";
import { Children, useEffect, useState } from "react";
import Header from "./Header"
import QuoteCard from "./QuoteCard"
import { useCopilotAction } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
/** Add fonts into your Next.js project:

import { Caudex } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'

caudex({
  subsets: ['latin'],
  display: 'swap',
})

cormorant_garamond({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
export function Quote() {
  const [text, setText] = useState("");
  const [mainQuote, setMainQuote] = useState("");
  const [quoteCards, setQuoteCards] = useState<Array<{ quote: string; author: string }>>(
    Array(6).fill({ quote: '', author: '' })
  );

  const [showMore, setShowMore] = useState(false);

  const getQuote = async () => {
    const response = await fetch('https://quotely-m7oa.onrender.com/quotes')
    const res = await response.json()
    return { quote: res.quoteText, author: res.quoteAuthor };
  }

  // useEffect(() => {
  //   const fetchMainQuote = async () => {
  //     const data = await getQuote();
  //     setMainQuote(data);
  //   };

  //   const fetchQuoteCards = async () => {
  //     const quotes = await Promise.all(Array(6).fill(null).map(() => getQuote()));
  //     setQuoteCards(quotes);
  //   };

  //   fetchQuoteCards();
  //   const value = setInterval(fetchMainQuote, 5000);
  //   fetchMainQuote();
  //   return () => {
  //     clearInterval(value)
  //   }
  // }, []);

  return (
    <>
      <div className="flex flex-col min-h-[100dvh] bg-background">
        <section className="flex flex-col items-center justify-center gap-6 py-4 ">
          <Header />
          <CopilotSidebar className="w-full"
            instructions={"You generate positive quotes for the user based on how they are feeling."}
            // Header={() => null}
            // Button={() => <> </>}
            Window={({children}) => <div>{children}</div>}
            Input={()=><input className="w-1/2 h-1/4 p-4 border border-gray-300 rounded-md" />}
            
            // onSetOpen={() => null}
            Messages={({ children }) => <h1>{children} </h1>}
          />
          <MainQuote />
          {/* <CopilotTextarea
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
          /> */}
          <blockquote className="relative max-w-2xl text-2xl font-medium italic sm:text-3xl md:text-4xl m-10">
            <div className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-primary/20 text-primary">
            </div>
            <p>
              {mainQuote}
            </p>
            {/* <cite className="mt-4 text-xl block text-base not-italic text-muted-foreground">- LLAMA 3</cite> */}
          </blockquote>
        </section>
        {/* <button onClick={() => setShowMore(!showMore)}> {showMore ? 'Hide' : 'Show more'} </button>
      {showMore &&
        <section className="container grid grid-cols-1 gap-6 px-4 py-12 md:grid-cols-2 lg:grid-cols-3 lg:px-6">
          {quoteCards.map((quoteData, index) => (
            <QuoteCard key={index} quote={quoteData.quote} author={quoteData.author} />
          ))}
        </section>
      } */}
      </div>
    </>
  )
}


function MainQuote({ }) {

  useCopilotAction({
    name: "generate_quote",
    description: "Generate a positive quote for user based on how they feel",
    parameters: [
      {
        name: "quote",
        type: "string",
        description: "The quote for user based on how they are feeling",
      },
    ],
    handler: async ({ quote }) => {
      console.log(quote)
      return <>
        {quote}
      </>
    },
  });
  return (
    <>
      {/* Copilot sidebar properties:
    Properties
      instructions
      string
      Custom instructions to be added to the system message. Use this property to provide additional context or guidance to the language model, influencing its responses. These instructions can include specific directions, preferences, or criteria that the model should consider when generating its output, thereby tailoring the conversation more precisely to the user's needs or the application's requirements.

      onInProgress
      (inProgress: boolean) => void
      A callback that gets called when the in progress state changes.

      onSubmitMessage
      (message: string) => void | Promise<void>
      A callback that gets called when a new message it submitted.

      icons
      CopilotChatIcons
      Icons can be used to set custom icons for the chat window.

      labels
      CopilotChatLabels
      Labels can be used to set custom labels for the chat window.

      makeSystemMessage
      SystemMessageFunction
      A function that takes in context string and instructions and returns the system message to include in the chat request. Use this to completely override the system message, when providing instructions is not enough.

      showResponseButton
      boolean
      Default: "true"
      Whether to show the response button.

      Messages
      React.ComponentType<MessagesProps>
      A custom Messages component to use instead of the default.

      RenderTextMessage
      React.ComponentType<RenderMessageProps>
      A custom RenderTextMessage component to use instead of the default.

      RenderActionExecutionMessage
      React.ComponentType<RenderMessageProps>
      A custom RenderActionExecutionMessage component to use instead of the default.

      RenderAgentStateMessage
      React.ComponentType<RenderMessageProps>
      A custom RenderAgentStateMessage component to use instead of the default.

      RenderResultMessage
      React.ComponentType<RenderMessageProps>
      A custom RenderResultMessage component to use instead of the default.

      Input
      React.ComponentType<InputProps>
      A custom Input component to use instead of the default.

      ResponseButton
      React.ComponentType<ResponseButtonProps>
      A custom ResponseButton component to use instead of the default.

      className
      string
      A class name to apply to the root element.

      children
      React.ReactNode
      Children to render.

      defaultOpen
      boolean
      Default: "false"
      Whether the chat window should be open by default.

      clickOutsideToClose
      boolean
      Default: "true"
      If the chat window should close when the user clicks outside of it.

      hitEscapeToClose
      boolean
      Default: "true"
      If the chat window should close when the user hits the Escape key.

      shortcut
      string
      Default: "'/'"
      The shortcut key to open the chat window. Uses Command-[shortcut] on a Mac and Ctrl-[shortcut] on Windows.

      onSetOpen
      (open: boolean) => void
      A callback that gets called when the chat window opens or closes.

      Window
      React.ComponentType<WindowProps>
      A custom Window component to use instead of the default.

      Button
      React.ComponentType<ButtonProps>
      A custom Button component to use instead of the default.

      Header
      React.ComponentType<HeaderProps>
      A custom Header component to use instead of the default.

     */}

      {/* I only want the user to see a text box and nothing else on the copilotsidebar */}

      {/* <CopilotSidebar className="w-1/2 h-1/4 p-4 border border-gray-300 rounded-md"
        instructions={"You generate positive quotes for the user based on how they are feeling."}
      /> */}
    </>
  )

  // return (
  //   <blockquote className="relative max-w-2xl text-2xl font-medium italic sm:text-3xl md:text-4xl m-10">
  //     {/* <div className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-primary/20 text-primary"> */}
  //     {/* <QuoteIcon className="h-full w-full p-2" /> */}
  //     {/* </div> */}
  //     <p>
  //       {quote}
  //     </p>
  //     <cite className="mt-4 text-xl block text-base not-italic text-muted-foreground">- LLAMA 3</cite>
  //   </blockquote>
  // )
}
