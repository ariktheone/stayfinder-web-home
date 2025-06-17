
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotificationSystem from "@/components/NotificationSystem";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Listing from "./pages/Listing";
import Bookings from "./pages/Bookings";
import Host from "./pages/Host";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Wishlist from "./pages/Wishlist";
import AllListings from "./pages/AllListings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes('404')) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

const AppContent = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/host" element={<Host />} />
        <Route path="/host/create-listing" element={<CreateListing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/all-listings" element={<AllListings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <NotificationSystem 
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
