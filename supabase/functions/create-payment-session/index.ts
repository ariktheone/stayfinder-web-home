
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking_id, amount, currency = 'usd' } = await req.json();
    
    // Mock payment session creation
    const mockSessionId = `cs_mock_${Date.now()}`;
    const mockSessionUrl = `https://checkout.stripe.com/pay/${mockSessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0VEhLSHE3NG5xYjFPPWJnZXJOYTdrSE5hPGNSMV9mUG9na2ByUGZic0RSUVZPPXxOcXJmN1JkYk5dfGlARX1dcjNEMG1xbG5NaDF8VnFGVTFHMDY3MjAwTE1gTEl2RGF8SicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`;

    // Return mock session URL
    return new Response(
      JSON.stringify({ 
        url: mockSessionUrl,
        session_id: mockSessionId
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(
      JSON.stringify({ error: "Failed to create payment session" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
