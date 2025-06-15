
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

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
    { label: 'Cleanliness', rating: cleanlinessRating },
    { label: 'Communication', rating: communicationRating },
    { label: 'Check-in', rating: checkinRating },
    { label: 'Accuracy', rating: accuracyRating },
    { label: 'Location', rating: locationRating },
    { label: 'Value', rating: valueRating },
  ].filter(item => item.rating !== null && item.rating !== undefined);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={reviewerAvatar} />
              <AvatarFallback>
                {reviewerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{reviewerName}</h4>
              <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {comment && (
          <p className="text-gray-700 mb-4">{comment}</p>
        )}
        
        {detailedRatings.length > 0 && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {detailedRatings.map(({ label, rating }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-gray-600">{label}</span>
                <div className="flex items-center space-x-1">
                  {renderStars(rating!)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
