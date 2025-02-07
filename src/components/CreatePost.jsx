import { useState } from "react";
import "./CreatePost.css";
import { db } from "../firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router";

function CreatePost() {
    const [imgURL, setImgURL] = useState("");
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const navigate = useNavigate()

    async function addPost() {
        if (!imgURL || !title || !descr) {
            console.log("Fill the inputs!");
            return;
        }

        const userDocRef = doc(db, "users", "HzG4wIXuwBnklGF2Gh8T");

        try {
            await updateDoc(userDocRef, {
                posts: arrayUnion({
                    title: title,
                    description: descr,
                    img: imgURL,
                    rating: 0,
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
            <h1 style={{ display: "flex", fontSize: 100, justifyContent: "center", position: "relative", top: 150 }}>
                <b>Create Post</b>
            </h1>

            <div className="postCrtWrapper">
                <div className="head">
                    <h4>Image</h4>
                    <input value={imgURL} onChange={(e) => setImgURL(e.target.value)} type="text" className="fieldInput" placeholder="Enter image URL" />

                    <h4>Title</h4>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="fieldInput" type="text" placeholder="Enter the title" />

                    <h4>Description</h4>
                    <input value={descr} onChange={(e) => setDescr(e.target.value)} className="fieldInput" type="text" placeholder="Enter the description" />

                    <br />

                    <button onClick={addPost} className="submit">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
