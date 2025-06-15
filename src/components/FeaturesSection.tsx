
import { Search, Users, Calendar, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Easy Search",
      description: "Find your perfect stay with our advanced search filters"
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join millions of travelers and hosts worldwide"
    },
    {
      icon: Calendar,
      title: "Flexible Booking",
      description: "Book instantly or request to book with flexible dates"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your payments are protected with bank-level security"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-white/50 section-spacing">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 mobile-title mobile-optimized">
            Why choose StayFinder?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mobile-text">
            We make it easy to find and book amazing places to stay
          </p>
        </div>
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="text-center group hover-scale touch-manipulation"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-rose-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform touch-target">
                <feature.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 mobile-subtitle mobile-optimized">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base mobile-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
