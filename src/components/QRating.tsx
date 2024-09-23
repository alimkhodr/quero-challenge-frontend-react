import { FC } from "react";
import QText from "./QText";
import QIconStar from "./QIconStar";

interface QBadgeProps {
  rating: number;
}

const QRating: FC<QBadgeProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <QText tag="span">{rating.toFixed(1)}</QText>
  
      <div className="flex items-center space-x-1 text-white">
        {Array.from({ length: fullStars }).map((_, index) => (
          <QIconStar/>
        ))}
        
        {hasHalfStar && <QIconStar half />}

        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, index) => (
          <QIconStar empty />
        ))}
      </div>
    </div>
  );
};


export default QRating;
