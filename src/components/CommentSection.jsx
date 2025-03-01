import { useState, useEffect, useCallback } from "react";
import { signInAnonymously } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firestore";
import "./CommentSection.css";

function CommentSection({ isLoggedIn, selectedPost, userIdOwner, onCommentAdded, postIndex }) {
  const [commentInput, setCommentInput] = useState("");
  const [FSuser, setFSuser] = useState(null)

  ////////////////////////////////// Anonymous login - arvela testi hamar!!
  async function anonymousLogin() {
    try {
      await signInAnonymously(auth);
      //   console.log("Anonymous user signed in successfully:", user.uid);
    } catch (error) {
      console.error("Error signing in anonymously:", error.message);
      throw error;
    }
  }

  const fetchData = useCallback(async () => {
    if (!auth.currentUser?.uid) return;
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      setFSuser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isLoggedIn) {
      (async () => {
        try {
          await anonymousLogin();
        } catch (error) {
          console.error("Failed to log in anonymously:", error);
        }
      })();
    }
  }, [isLoggedIn]);


  // Post comment logic
  async function postComment() {
    const authUser = auth.currentUser;
    const docSnap = await getDoc(doc(db, "users", authUser.uid))
    const FSuser = docSnap.exists ? docSnap.data() : null
    try {
      if (!authUser) {
        throw new Error("No logged-in user");
      }

      const userId = authUser.uid;
      const userNick = FSuser?.nick_name || "Anonymous";
      const userImg =
        FSuser?.profile_pic ||
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
              FSuser?.profile_pic ||
              "https://i.pinimg.com/474x/25/1c/e1/251ce139d8c07cbcc9daeca832851719.jpg"
            }
            alt="User"
          />
          <p>{FSuser?.nick_name || "Anonymous"}</p>
        </div>
        <input
          type="text"
          className="commentInp"
          placeholder="Write a comment..."
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
        />
        <button className="postBtn" onClick={postComment}>Post</button>
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
