import { useState, useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firestore";
import "./CommentSection.css";

function CommentSection({ selectedPost, userIdOwner, onCommentAdded, postIndex }) {
  const [commentInput, setCommentInput] = useState("");

  ////////////////////////////////// Anonymous login - arvela testi hamar!!
  async function anonymousLogin() {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
    //   console.log("Anonymous user signed in successfully:", user.uid);
    } catch (error) {
      console.error("Error signing in anonymously:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await anonymousLogin();
        // console.log("Anonymous login successful!");
      } catch (error) {
        console.error("Failed to log in anonymously:", error);
      }
    })();
  }, []);

  ///////////////////////////////////////////////////////////// 


  // Post comment logic
  async function postComment() {
    const user = auth.currentUser;

    try {
      if (!user) {
        throw new Error("No logged-in user");
      }

      const userId = user.uid; 
      const userNick = user.nick_name || "Anonymous";
      const userImg =
        user.profile_pic ||
        "https://i.pinimg.com/474x/25/1c/e1/251ce139d8c07cbcc9daeca832851719.jpg"; // Default image

      // fetching user
      const userDocRef = doc(db, "users", userIdOwner);

      
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        throw new Error("User does not exist");
      }

      const userData = userDocSnapshot.data();
      const posts = userData.posts || [];

      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      // Comment objecti stexcum
      const comment = {
        userId,
        userNick,
        userImg,
        text: commentInput,
        timestamp: Date.now(), // kareli e ogtagorcel sortavorelu hamar
      };

      if (!posts[postIndex].comments) {
        posts[postIndex].comments = []; // stexcel commentneri array ete chka
      }

      // Validation datark commentneri hamar
      if (commentInput.trim() === "") {
        throw new Error("Comment cannot be empty");
      }

      posts[postIndex].comments.push(comment);

      // Update Firestore
      await updateDoc(userDocRef, { posts });

      setCommentInput("");

      // Re-fetchi kanch vor avelacvac commenty ereva
      if (onCommentAdded) {
        onCommentAdded(); 
      }
    } catch (error) {
      console.error(`Error posting comment: ${error.message}`);
      throw error;
    }
  }

  return (
    <div className="comments-container">
      <div className="comment-writing">
        <div className="user-data">
          <img
            src={
              auth.currentUser?.profile_pic ||
              "https://i.pinimg.com/474x/25/1c/e1/251ce139d8c07cbcc9daeca832851719.jpg"
            }
            alt="User"
          />
          <p>{auth.currentUser?.nick_name || "Anonymous"}</p>
        </div>
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
        />
        <button onClick={postComment}>Post</button>
      </div>
      <div className="comments-list">
        {selectedPost.comments && selectedPost.comments.length > 0 ? (
          selectedPost.comments.map((comment, index) => (
            <div className="comment" key={index}>
              <img src={comment.userImg} alt="User" />
              <div>
                <h5 className="user-nick">{comment.userNick}</h5>
                <p>{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
