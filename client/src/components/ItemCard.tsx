import { Link } from "wouter";
import { Book, Smartphone, Shirt, Package, MapPin, ArrowLeftRight } from "lucide-react";
import { type Item } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categoryIcons: Record<string, React.ReactNode> = {
  "Books": <Book className="h-4 w-4" />,
  "Electronics": <Smartphone className="h-4 w-4" />,
  "Clothing": <Shirt className="h-4 w-4" />,
  "Others": <Package className="h-4 w-4" />,
  // Bengali mappings just in case
  "বই": <Book className="h-4 w-4" />,
  "ইলেকট্রনিক্স": <Smartphone className="h-4 w-4" />,
  "পোশাক": <Shirt className="h-4 w-4" />,
  "অন্যান্য": <Package className="h-4 w-4" />,
};

const conditionColors: Record<string, string> = {
  "Like New": "bg-green-100 text-green-700 border-green-200",
  "Good": "bg-blue-100 text-blue-700 border-blue-200",
  "Used": "bg-orange-100 text-orange-700 border-orange-200",
  // Bengali mappings
  "নতুনের মতো": "bg-green-100 text-green-700 border-green-200",
  "ভালো": "bg-blue-100 text-blue-700 border-blue-200",
  "ব্যবহৃত": "bg-orange-100 text-orange-700 border-orange-200",
};

export function ItemCard({ item }: { item: Item }) {
  const icon = categoryIcons[item.category] || <Package className="h-4 w-4" />;
  const badgeColor = conditionColors[item.condition] || "bg-gray-100 text-gray-700";

  return (
    <Link href={`/items/${item.id}`} className="block h-full hover-lift group">
      <Card className="h-full border-border/50 bg-card hover:border-primary/50 transition-colors overflow-hidden flex flex-col">
        <div className="h-32 bg-gradient-to-br from-primary/5 to-primary/10 relative flex items-center justify-center">
          <div className="text-primary/20 group-hover:text-primary/40 transition-colors transform group-hover:scale-110 duration-500">
            {/* Using a larger version of the category icon as a placeholder graphic */}
            {categoryIcons[item.category] ? (
               <div className="w-16 h-16 [&>svg]:w-full [&>svg]:h-full opacity-50">
                 {categoryIcons[item.category]}
               </div>
            ) : <Package className="w-16 h-16 opacity-50" />}
          </div>
          <Badge className="absolute top-3 right-3 bg-white/90 text-foreground hover:bg-white shadow-sm backdrop-blur-sm">
            {icon}
            <span className="ml-1.5">{item.category}</span>
          </Badge>
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-display font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {item.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badgeColor}`}>
              {item.condition}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 pb-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-secondary/30 p-2 rounded-lg">
              <ArrowLeftRight className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              <p className="line-clamp-2 italic">"{item.exchangePreferences}"</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 text-xs text-muted-foreground flex items-center gap-1 border-t border-border/30 p-4 bg-muted/20 mt-auto">
          <MapPin className="h-3.5 w-3.5" />
          {item.location}
        </CardFooter>
      </Card>
    </Link>
  );
}
