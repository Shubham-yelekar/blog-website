import { Link } from "react-router";
import Button from "../Button";

export const WritePostBtn = () => {
  return (
    <Link to={"/add-post"}>
      <Button className="primary-btn">Write Post</Button>
    </Link>
  );
};
