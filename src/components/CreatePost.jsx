import { useState } from "react";
import "./CreatePost.css";
import { db } from "../firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router";

function CreatePost({ userId }) {
    const [imgURL, setImgURL] = useState("");
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const navigate = useNavigate()

    async function addPost() {
        if (!imgURL || !title || !descr) {
            alert("Fill the inputs!");
            return;
        }
        console.log(userId)
        try {
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, {
                posts: arrayUnion({
                    title: title,
                    description: descr,
                    img: imgURL,
                    rating: {},
                }),
            });
            console.log("Post Added!");
            setImgURL("");
            setTitle("");
            setDescr("");
            navigate("/profile")
        } catch (error) {
            console.error("Error! ", error);
        }
    }
    return (
        <div>
            <h1 style={{ display: "flex", fontSize: 100, justifyContent: "center" }}>
                <b>Create Post</b>
            </h1>
            <div className="postCrtWrapper">
                <div className="head    ">
                    <h4 style={{ fontSize: "50px" }}>Image</h4>

                    <br />

                    <input style={{ borderRadius: "100px", border: "none" }} value={imgURL} onChange={(e) => setImgURL(e.target.value)} type="text" className="fieldInput" placeholder="Enter image URL" />
                    <h4 style={{ fontSize: "50px" }}>Title</h4>

                    <br />

                    <input style={{ borderRadius: "100px", border: "none" }} value={title} onChange={(e) => setTitle(e.target.value)} className="fieldInput" type="text" placeholder="Enter the title" />
                    <h4 style={{ fontSize: "50px" }}>Description</h4>

                    <br />

                    <input style={{ borderRadius: "100px", border: "none" }} value={descr} onChange={(e) => setDescr(e.target.value)} className="fieldInput" type="text" placeholder="Enter the description" />

                    <br />

                    <button onClick={addPost} className="submit">Submit</button>
                </div>
            </div>
        </div>
    );
}
export default CreatePost;