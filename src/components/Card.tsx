import service from "../backend/Config";
interface cardType {
  $id: string;
  title: string;
  featuredImage: string;
}
const Card = ({ $id, title, featuredImage }: cardType) => {
  return (
    <div>
      <div>
        <img src={service.getFilePreview(featuredImage)} alt={title} />
      </div>
      <h4>{title}</h4>
    </div>
  );
};

export default Card;
