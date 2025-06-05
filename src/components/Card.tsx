import { Link } from "react-router";
import service from "../backend/Config";

interface cardType {
  $id: string;
  title: string;
  featuredImage: string;
  author: string;
  tags: string[];
  slug?: string;
}
const Card = ({ $id, title, featuredImage, author, tags, slug }: cardType) => {
  return (
    <Link to={`/post/${slug}?id=${$id}`}>
      <div className="bg-white flex flex-col gap-1 rounded-xl h-full shadow-[0px_1px_5px_0px_rgba(0,_0,_0,_0.05)] p-2 transition-all duration-300 hover:shadow-[0px_1px_8px_0px_rgba(0,_0,_0,_0.1)]">
        <div className="rounded-lg overflow-hidden aspect-video">
          <img
            src={service.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2 flex flex-col gap-4 flex-grow-1">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <div
                className="text-xs capitalize bg-[#D57EEB] text-white px-2 py-1 rounded-full"
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex flex-col flex-grow-1 gap-3 justify-between items-stretch">
            <h5 className="font-semibold">{title}</h5>
            <p className="text-studio-300 text-sm ">
              By <span className="text-[#772d8a] font-semibold">{author}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
