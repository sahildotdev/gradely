import { Card, CardHeader, CardContent } from "@/components/ui/card";
//import Image from "next/image";
import Chip from "./Chip";
import HeartIcon from "./icons/HeartIcon";

interface FeatureCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  subject: string;
  readTime: string;
  wordCount: string;
  rating: string;
  language: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  subject,
  readTime,
  wordCount,
  rating,
  language,
}) => {
  return (
    <Card className="flex flex-row items-center p-4 bg-gradient-to-r from-purple-100 to-white rounded-lg shadow-lg">
      {/* Image Section */}
      <div className="">
        <img
          src={imageSrc}
          alt={imageAlt}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-2/3 pl-4">
        <CardHeader className="text-xl font-bold text-gray-800">
          {title}
        </CardHeader>
        <CardContent className="text-gray-600">
          <p className="text-base">{description}</p>
          <div className="flex items-center mt-4 space-x-2">
            <Chip label={subject} icon={<HeartIcon />} color="primary" />
            <Chip label={readTime} icon={<HeartIcon />} color="secondary" />
            <Chip label={`${wordCount} words`} icon={<HeartIcon />} />
          </div>
          <div className="flex items-center mt-2 space-x-2">
            <Chip label={rating} icon={<HeartIcon />} color="destructive" />
            <Chip label={language} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default FeatureCard;
