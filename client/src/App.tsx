The 'Message Seller' button says 'Coming Soon'. For now, please make it functional so that when clicked, it opens the user's phone dialer with the seller's number, or creates a simple chat window."import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PostItem from "@/pages/PostItem";
import ItemDetails from "@/pages/ItemDetails";
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/post" component={PostItem} />
      <Route path="/items/:id" component={ItemDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
