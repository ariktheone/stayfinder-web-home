
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, Verified } from "lucide-react";

interface ReviewCardProps {
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  comment?: string;
  cleanlinessRating?: number;
  communicationRating?: number;
  checkinRating?: number;
  accuracyRating?: number;
  locationRating?: number;
  valueRating?: number;
  createdAt: string;
}

const ReviewCard = ({
  reviewerName,
  reviewerAvatar,
  rating,
  comment,
  cleanlinessRating,
  communicationRating,
  checkinRating,
  accuracyRating,
  locationRating,
  valueRating,
  createdAt
}: ReviewCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const detailedRatings = [
    { label: 'Cleanliness', rating: cleanlinessRating, color: 'text-blue-600' },
    { label: 'Communication', rating: communicationRating, color: 'text-green-600' },
    { label: 'Check-in', rating: checkinRating, color: 'text-purple-600' },
    { label: 'Accuracy', rating: accuracyRating, color: 'text-rose-600' },
    { label: 'Location', rating: locationRating, color: 'text-orange-600' },
    { label: 'Value', rating: valueRating, color: 'text-teal-600' },
  ].filter(item => item.rating !== null && item.rating !== undefined);

  return (
    <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                <AvatarImage src={reviewerAvatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                  {reviewerName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <Verified className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900">{reviewerName}</h4>
              <p className="text-sm text-gray-500 flex items-center">
                {formatDate(createdAt)}
                <span className="mx-2">•</span>
                <span className="text-green-600 font-medium">Verified stay</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              {renderStars(rating)}
            </div>
            <span className="font-bold text-gray-900">{rating}.0</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {comment && (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed text-lg">{comment}</p>
            <div className="flex items-center mt-3 space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful</span>
              </button>
              <span>•</span>
              <span>Reply</span>
            </div>
          </div>
        )}
        
        {detailedRatings.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h5 className="font-semibold text-gray-900 mb-4">Detailed ratings</h5>
            <div className="grid grid-cols-2 gap-4">
              {detailedRatings.map(({ label, rating, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">{label}</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(rating!)}
                    </div>
                    <span className={`font-bold text-sm ${color}`}>{rating}.0</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
