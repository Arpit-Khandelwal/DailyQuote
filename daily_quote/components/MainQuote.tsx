export default function MainQuote({ quote, author }: { quote: string; author: string }) {
    return (
        <blockquote className="relative max-w-2xl text-2xl font-medium italic sm:text-3xl md:text-4xl">
            <div className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-primary/20 text-primary">
                <QuoteIcon className="h-full w-full p-2" />
            </div>
            <p>
               {quote}
            </p>
            <cite className="mt-4 block text-base not-italic text-muted-foreground">- {author}</cite>
        </blockquote>
    )
}
function QuoteIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
    )
}