import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertItemSchema, type InsertItem } from "@shared/schema";
import { useCreateItem } from "@/hooks/use-items";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function PostItem() {
  const [, setLocation] = useLocation();
  const { mutate, isPending } = useCreateItem();

  const form = useForm<InsertItem>({
    resolver: zodResolver(insertItemSchema),
    defaultValues: {
      title: "",
      category: "",
      condition: "",
      exchangePreferences: "",
      location: "",
      contactInfo: "",
    },
  });

  function onSubmit(data: InsertItem) {
    mutate(data, {
      onSuccess: () => setLocation("/"),
    });
  }

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">জিনিস অদল-বদল ফর্ম</h1>
          <p className="text-muted-foreground mt-2">Fill in the details to find a match for your item</p>
        </div>

        <Card className="border-border/50 shadow-xl shadow-primary/5 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-green-400 to-primary/60" />
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Item Details</CardTitle>
            <CardDescription>আপনার পণ্যের বিবরণ দিন</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-base">পণ্যের নাম (Product Name)</FormLabel>
                      <FormControl>
                        <Input placeholder="যেমন: গল্পের বই, মোবাইল..." className="h-12 text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-base">ক্যাটাগরি (Category)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Books">বই (Books)</SelectItem>
                            <SelectItem value="Electronics">ইলেকট্রনিক্স (Electronics)</SelectItem>
                            <SelectItem value="Clothing">পোশাক (Clothing)</SelectItem>
                            <SelectItem value="Others">অন্যান্য (Others)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-base">পণ্যের অবস্থা (Condition)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Like New">নতুনের মতো (Like New)</SelectItem>
                            <SelectItem value="Good">ভালো (Good)</SelectItem>
                            <SelectItem value="Used">ব্যবহৃত (Used)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="exchangePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-base">বিনিময়ে আপনি কী চান? (Exchange Preferences)</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3} 
                          placeholder="আপনি এই জিনিসের বদলে কী খুঁজছেন?" 
                          className="resize-none text-base"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-base">আপনার এলাকা (Location)</FormLabel>
                        <FormControl>
                          <Input placeholder="যেমন: ধানমন্ডি, ঢাকা" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-base">যোগাযোগ (Contact Info)</FormLabel>
                        <FormControl>
                          <Input placeholder="মোবাইল বা ইমেইল" className="h-12" {...field} />
                        </FormControl>
                        <FormDescription>Optional: How should people reach you?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all mt-6"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      পোস্ট করা হচ্ছে...
                    </>
                  ) : "পোস্ট করুন (Post Item)"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
