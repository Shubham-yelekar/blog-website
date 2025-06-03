import { Link } from "react-router";
import service from "../backend/Config";
interface cardType {
  $id: string;
  title: string;
  featuredImage: string;
}
const Card = ({ $id, title, featuredImage }: cardType) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white rounded-xl shadow-[0px_1px_8px_0px_rgba(0,_0,_0,_0.1)] p-2">
        <div className="rounded-lg overflow-hidden aspect-video">
          <img
            src={service.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h5 className="font-semibold p-2">{title}</h5>
      </div>
    </Link>
  );
};

export default Card;
