export default function QuoteCard({ quote, author }: { quote: string; author: string }) {
    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="relative p-6">
            <blockquote className="animate-fade-in text-xl font-medium italic sm:text-2xl">
              {quote}
            </blockquote>
            <cite className="mt-4 block text-base not-italic text-muted-foreground">- {author}</cite>
          </div>
        </div>
    )
}