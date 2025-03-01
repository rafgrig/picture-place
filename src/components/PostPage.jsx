import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firestore";
import CommentSection from "./CommentSection";
import RatingStars from "./RatingStars";
import "./PostPage.css";

function PostPage({ isLoggedIn }) {
  const { userId, postIndex } = useParams();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Firestore-ic
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        setIsLoading(false); // loadingi avart
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false); // error handling
      }
    };
    fetchUsers();
  }, []);

  // vercnum enq miayn postery users collection-ic
  function filterPostsFromUsers(users) {
    const posts = [];
    users
      .filter((user) => user.id === userId)
      .forEach((user) => {
        if (user.posts) {
          user.posts.forEach((post) => {
            posts.push({
              ...post,
              userId: user.id,
              postIdx: user.posts.indexOf(post),
            });
          });
        }
      });
    return posts;
  }

  const posts = filterPostsFromUsers(users);
  const selectedPost = posts[postIndex];

  // Re-fetch function - kanchvuma nor avelacvac commenty cuyc talu hamar
  const handleCommentAdded = async () => {
    setIsLoading(true); // skizb
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData); // Update users
    } catch (error) {
      console.error("Error refetching users:", error);
    } finally {
      setIsLoading(false); // avart
    }
  };

  // error handling - ete chka post kam loadinga linum
  if (isLoading || !selectedPost) return <h2>Loading...</h2>;

  return (
    <div className="post-container">
      <img
        src={selectedPost.img}
        alt={selectedPost.title}
        className="post-image"
      />
      <h1 className="post-title">{selectedPost.title}</h1>
      <p className="post-description">{selectedPost.description}</p>
      <div className="rating">
        <p>Rating:</p>
        <RatingStars />
      </div>
      <div className="comments">
        <CommentSection
          isLoggedIn={isLoggedIn}
          selectedPost={selectedPost}
          userIdOwner={userId}
          onCommentAdded={handleCommentAdded}
          postIndex={postIndex}
        />
      </div>
    </div>
  );
}

export default PostPage;