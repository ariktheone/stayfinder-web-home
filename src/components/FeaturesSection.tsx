
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
    <section className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why choose StayFinder?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make it easy to find and book amazing places to stay
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="text-center group hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-rose-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
