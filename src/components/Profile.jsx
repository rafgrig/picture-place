import { doc, getDoc } from "firebase/firestore";
import { db } from "../firestore.js";
import { useCallback, useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router";
import Post from "./Post.jsx";

function Profile({ userId }) {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  console.log(userId);

  function truncateText(text, maxLength = 350) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  const fetchData = useCallback(async () => {
    if (!userId) return;
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
      setData(docSnap);
    } else {
      console.log("No such document!");
    }
  }, [userId])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {userData ? (
        <>
          <img
            style={{ margin: 5, width: 200, height: 200, borderRadius: "100%" }}
            src={userData["profile_pic"]}
            alt="User Profile"
          />
          <h3 style={{ margin: 5 }}>User Name: {userData["nick_name"]}</h3>
          <h3 style={{ margin: 5 }}>User email: {userData.email}</h3>
          {/* <h1>{data["_key"].path.segments[1]}</h1> */}
          <button onClick={() => navigate("/create")} id="addBtn">+</button>
          <div className="posts">
            {userData.posts && userData.posts.length > 0 ? (
              userData.posts.map((post, index) => (
                <Post
                  key={post.id || index}
                  index={index}
                  img={post.img}
                  title={post.title}
                  description={truncateText(post.description)}
                  deletingData={userData.posts}
                  userId={data["_key"].path.segments[1]}
                  featchPosts={fetchData}
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
