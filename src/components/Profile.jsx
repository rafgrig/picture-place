import { doc, getDoc } from "firebase/firestore";
import { db } from "../firestore.js";
import { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router";
import Post from "./Post.jsx";
function Profile() {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  function truncateText(text, maxLength = 350) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }
  useEffect(() => {
    async function fetchData() {
      const userDocRef = doc(db, "users", "HzG4wIXuwBnklGF2Gh8T");
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data()); // Save user data in state
        setData(docSnap);
      } else {
        console.log("No such document!");
      }
    }
    fetchData();
  }, [refresh]);
  function calculateAverageRating(ratings) {
    if (!ratings) {
      return 0;
    } else if (typeof ratings !== "object") {
      return ratings;
    } else {
      const ratingsArray = Object.values(ratings);
      const total = ratingsArray.reduce((acc, curr) => acc + curr, 0);
      return (total / ratingsArray.length).toFixed(2);
    }
  }
  return (
    <div>
      {userData ? (
        <>
          <img
            style={{ margin: 5, width: 200, height: 200, borderRadius: "100%" }}
            src={userData["profile_pic"]}
          />
          <h3 style={{ margin: 5 }}>User Name: {userData["nick_name"]}</h3>
          <h3 style={{ margin: 5 }}>User email: {userData.email}</h3>
          <h1>{data["_key"].path.segments[1]}</h1>
          <button
            onClick={() => {
              navigate("/create");
            }}
            id="addBtn"
          >
            +
          </button>
          <div className="posts">
            {userData.posts && userData.posts.length > 0 ? (
              userData.posts.map((post, index) => (
                <Post
                key={post.id || index}
                  index={index}
                 img={post.img}
                  title={post.title}
                  description={truncateText(post.description)}
                  rating={calculateAverageRating(post.rating)}
                  deletingData={userData.posts}
                  userId={data["_key"].path.segments[1]}
                  setRefresh={setRefresh}
                />
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
export default Profile;