import { useRoute, Link } from "wouter";
import { useItem } from "@/hooks/use-items";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  MapPin, 
  Tag, 
  RefreshCw, 
  Phone, 
  Clock, 
  ShieldCheck,
  AlertCircle 
} from "lucide-react";
import { format } from "date-fns";

export default function ItemDetails() {
  const [match, params] = useRoute("/items/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: item, isLoading, isError } = useItem(id);

  if (isLoading) return <DetailsSkeleton />;
  if (isError || !item) return <NotFound />;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header / Nav */}
      <div className="bg-white border-b border-border sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Visual & Key Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
              
              <div className="text-center relative z-10 space-y-4">
                <div className="inline-flex items-center justify-center p-6 bg-white rounded-2xl shadow-xl shadow-primary/10 mb-2 group-hover:scale-105 transition-transform duration-500">
                  <RefreshCw className="h-16 w-16 text-primary" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                  {item.title}
                </h1>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <Badge variant="secondary" className="px-3 py-1 text-sm">
                    <Tag className="h-3 w-3 mr-1.5" />
                    {item.category}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm bg-white/50">
                    <ShieldCheck className="h-3 w-3 mr-1.5" />
                    {item.condition}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Exchange Preferences
                </h2>
                <div className="bg-secondary/30 p-6 rounded-xl border-l-4 border-primary">
                  <p className="text-lg font-medium text-foreground italic">
                    "{item.exchangePreferences}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    — The owner is looking for this in return.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Item Details</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Condition</dt>
                    <dd className="font-medium">{item.condition}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Category</dt>
                    <dd className="font-medium">{item.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Posted On</dt>
                    <dd className="font-medium flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {item.createdAt ? format(new Date(item.createdAt), 'PPP') : 'N/A'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Status</dt>
                    <dd className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Location */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card className="border-border shadow-lg shadow-black/5 overflow-hidden">
              <div className="bg-primary h-2 w-full" />
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">Contact Owner</h3>
                  <p className="text-sm text-muted-foreground">Get in touch to arrange the exchange.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Location</p>
                      <p className="font-medium">{item.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Contact Info</p>
                      <p className="font-medium break-all">
                        {item.contactInfo !== "Not provided" ? item.contactInfo : "No contact info provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 text-base font-semibold shadow-md shadow-primary/20">
                  Message Seller (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-amber-900 text-sm flex gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
              <p>
                <strong>Safety Tip:</strong> Always meet in a public place for exchanges. Check the item condition thoroughly before swapping.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-5xl space-y-8">
        <Skeleton className="h-10 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-3xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-60 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-muted/30 p-8 rounded-full mb-6">
        <RefreshCw className="h-12 w-12 text-muted-foreground opacity-50" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Item Not Found</h1>
      <p className="text-muted-foreground mb-6">The item you are looking for doesn't exist or has been removed.</p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
