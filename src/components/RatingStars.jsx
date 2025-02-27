import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firestore"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './RatingStars.css';

function RatingStars() {
  const { userId, postIndex } = useParams();
  const [post, setPost] = useState(null);
  const [rating, setRating] = useState({});
  const raterId = userId; // Hardcode arac useri ID, piti poxvi darna login exac useri Id

  useEffect(() => {
    async function fetchPost() {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const posts = userData.posts || [];

        if (postIndex < posts.length) {
          setPost(posts[postIndex]);
          setRating(posts[postIndex].rating || {});
        }
      }
    }
    fetchPost();
  }, [userId, postIndex]);

  async function handleRating(value) {
    if (!post) return;

    const userRef = doc(db, "users", userId);
    const updatedRatings = { ...rating, [raterId]: value };
    setRating(updatedRatings); 

    post.rating = updatedRatings; 

    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw new Error("No such user");

      const userData = userSnap.data();
      const posts = userData.posts;

      if (postIndex >= posts.length) throw new Error("No such post");

      posts[postIndex].rating = updatedRatings;

      await updateDoc(userRef, { posts });
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  if (!post) return <h2>Loading...</h2>;

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRating(star)}
          className="star"
        >
          <FontAwesomeIcon
            icon={star <= (rating[raterId] || 0) ? solidStar : regularStar}
            className="star-icon"
          />
        </span>
      ))}
    </div>
  );
}

export default RatingStars;
