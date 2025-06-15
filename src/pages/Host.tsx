
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface HostListing {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  is_active: boolean;
  created_at: string;
}

interface BookingSummary {
  total_bookings: number;
  confirmed_bookings: number;
  pending_bookings: number;
  total_revenue: number;
}

const Host = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [listings, setListings] = useState<HostListing[]>([]);
  const [bookingSummary, setBookingSummary] = useState<BookingSummary>({
    total_bookings: 0,
    confirmed_bookings: 0,
    pending_bookings: 0,
    total_revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchHostData();
  }, [user, navigate]);

  const fetchHostData = async () => {
    try {
      // Fetch host listings
      const { data: listingsData, error: listingsError } = await supabase
        .from("listings")
        .select("*")
        .eq("host_id", user?.id)
        .order("created_at", { ascending: false });

      if (listingsError) throw listingsError;
      setListings(listingsData || []);

      // Fetch booking summary
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select(`
          *,
          listing:listings!inner(host_id)
        `)
        .eq("listing.host_id", user?.id);

      if (bookingsError) throw bookingsError;

      const summary = (bookingsData || []).reduce((acc, booking) => {
        acc.total_bookings++;
        if (booking.status === "confirmed") acc.confirmed_bookings++;
        if (booking.status === "pending") acc.pending_bookings++;
        if (booking.status === "confirmed" || booking.status === "completed") {
          acc.total_revenue += booking.total_amount;
        }
        return acc;
      }, {
        total_bookings: 0,
        confirmed_bookings: 0,
        pending_bookings: 0,
        total_revenue: 0
      });

      setBookingSummary(summary);
    } catch (error) {
      console.error("Error fetching host data:", error);
      toast({
        title: "Error",
        description: "Failed to load your host dashboard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleListingStatus = async (listingId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("listings")
        .update({ is_active: !currentStatus })
        .eq("id", listingId);

      if (error) throw error;

      toast({
        title: "Listing updated",
        description: `Listing ${!currentStatus ? "activated" : "deactivated"} successfully.`,
      });

      fetchHostData();
    } catch (error) {
      console.error("Error updating listing:", error);
      toast({
        title: "Error",
        description: "Failed to update listing status.",
        variant: "destructive",
      });
    }
  };

  const deleteListing = async (listingId: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", listingId);

      if (error) throw error;

      toast({
        title: "Listing deleted",
        description: "Your listing has been deleted successfully.",
      });

      fetchHostData();
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Error",
        description: "Failed to delete listing.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Host Dashboard</h1>
              <p className="text-gray-600">Manage your properties and bookings</p>
            </div>
            <Button onClick={() => navigate('/host/create-listing')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Listing
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{bookingSummary.total_bookings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-gray-900">{bookingSummary.confirmed_bookings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{bookingSummary.pending_bookings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">$</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${(bookingSummary.total_revenue / 100).toFixed(0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Listings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Listings</h2>
          
          {listings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-4">Create your first listing to start hosting!</p>
                <Button onClick={() => navigate('/host/create-listing')}>
                  Create Listing
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        listing.is_active 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {listing.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {listing.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{listing.location}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{listing.max_guests} guests</span>
                      <span>{listing.bedrooms} bed</span>
                      <span>{listing.bathrooms} bath</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        ${(listing.price_per_night / 100).toFixed(0)}
                      </span>
                      <span className="text-gray-600 text-sm">/night</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/listing/${listing.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleListingStatus(listing.id, listing.is_active)}
                      >
                        {listing.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteListing(listing.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Host;
