import { useParams } from "react-router";
import RatingStars from "./RatingStars";

function PostPage() {
  const { userId, postIndex } = useParams();
  return (
    <div>
      <div>
        <h2>Post Page</h2>
        <p>User ID: {userId}</p>
        <p>Post Index: {postIndex}</p>
        <div>
          <p>Rating:</p>
          <RatingStars />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
