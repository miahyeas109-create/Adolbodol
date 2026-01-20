import { Link } from "wouter";
import { PlusCircle, Search, RefreshCw } from "lucide-react";
import { useItems } from "@/hooks/use-items";
import { ItemCard } from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const { data: items, isLoading, isError } = useItems();
  const [search, setSearch] = useState("");

  const filteredItems = items?.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 border-b border-primary/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <RefreshCw className="h-4 w-4" />
              <span>AdolBodol • অদল-বদল</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              Find things to exchange <span className="text-primary">near you</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              আপনার অব্যবহৃত জিনিস অন্যের সাথে অদল-বদল করুন। সহজে এবং দ্রুত।
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <Link href="/post">
                <Button size="lg" className="rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Post New Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold">Recent Items</h2>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search items..." 
              className="pl-10 bg-white shadow-sm border-border/60 focus-visible:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[350px] rounded-2xl bg-muted/40 animate-pulse border border-border/40" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-destructive/5 rounded-2xl border border-destructive/10">
            <p className="text-destructive font-medium">Failed to load items. Please try again later.</p>
          </div>
        ) : filteredItems?.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No items found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or post the first item!</p>
            <Link href="/post" className="mt-6 inline-block">
              <Button variant="outline">Post Item</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems?.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
