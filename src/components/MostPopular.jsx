import "./MostPopular.css";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firestore";
import { useNavigate } from "react-router";

function MostPopular() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function truncateText(text, maxLength = 200) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  function calculateScore(ratings) {
    if (!ratings) {
      return 20;
    } else if (typeof ratings !== "object") {
      return ratings;
    } else {
      const ratingsArray = Object.values(ratings);
      const total = ratingsArray.reduce((acc, curr) => acc + curr, 0);
      return (total / ratingsArray.length).toFixed(2) * ratingsArray.length;
    }
  }

  function getMostPopularPosts(collection) {
    const posts = [];
    collection.map((user) => {
      user.posts.map((post) => {
        posts.push({
          ...post,
          userId: user.id,
          score: calculateScore(post.rating),
        });
      });
    });
    posts.sort((a, b) => b.score - a.score);
    return posts.slice(0, 2);
  }

  useEffect(() => {
    async function getUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(documents);
    }
    getUsers();
  }, []);

  return (
    <div>
      {users.length ? (
        <section className="most-popular">
          <h2>Most Popular</h2>
          <div className="popular-container">
            {getMostPopularPosts(users).map((post, index) => (
              <div
                className="popular-item"
                key={index}
                onClick={() => navigate(`/post/${post.userId}/${index + 1}`)}
              >
                <img src={post.img} alt={post.title} />
                <div className="info">
                  <p className="event-type">
                    Type of event (exhibition for example)
                  </p>
                  <h3>{post.title}</h3>
                  <p className="description">
                    {truncateText(post.description)}
                  </p>
                  <p className="duration">
                    Duration ( 1th Mar 2025 - 2th Apr 2025)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MostPopular;

