import { useParams } from "react-router";
import RatingStars from "./RatingStars";
import { useEffect, useState } from "react";
import { db } from "../firestore";
import {collection, getDocs} from "firebase/firestore"

function PostPage() {
  const { userId, postIndex } = useParams();
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(()=>{
    const fetchUsers = async()=>{
      try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, [])

  useEffect(()=>{
    if (users.length > 0){
      const user = users.find(user => user.id === userId);
        setPost(user.posts[postIndex]);
      }
  }, [users])

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <div>
        <h2>Post Page</h2>
        <img src={post.img} alt="post img" />
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
