import { arrayRemove, doc, runTransaction, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firestore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";

function Post({ featchPosts, index, img, title, description, deletingData, userId }) {
  const forDeleting = deletingData[index];
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(deletingData[index].title);
  const [newDescr, setNewDescr] = useState(deletingData[index].description);
  const navigate = useNavigate();

  const deleting = useCallback(async () => {
    if (!forDeleting) return;
    await updateDoc(doc(db, "users", userId), { posts: arrayRemove(forDeleting) });
    featchPosts()
    setOpenDel(false);
  }, [forDeleting, userId, featchPosts]);

  const editing = useCallback(async (e) => {
    e.stopPropagation();
    await runTransaction(db, async (transaction) => {
      let array = deletingData;
      array[index] = { ...array[index], title: newTitle, description: newDescr };
      transaction.update(doc(db, "users", userId), { posts: array });
    },);
    featchPosts()
    setOpenEdit(false);
  }, [index, newTitle, newDescr, deletingData, userId, featchPosts]);

  return (
    <>
      <div className="postWrapper" key={index}>
        <button onClick={() => setOpenDel(true)} className="deleteBtn">X</button>
        <div className="divToClick" onClick={() => navigate(`/post/${userId}/${index}`)}>
          <img src={img} alt="post" />
          <div className="misc">
            <h4>{title}</h4>
            <span className="descriptionSpan">{description}</span>
          </div>
        </div>
        <button onClick={() => setOpenEdit(true)} className="editBtn">✏️</button>
      </div>
      <Dialog open={openDel} onClose={() => setOpenDel(false)}>
        <DialogTitle sx={{ fontSize: 16, width: "80%", fontWeight: "bold" }}>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <div className="btnWrapper">
            <button className="commitBtn" style={{ backgroundColor: "rgb(177, 177, 177)", cursor: "pointer" }} onClick={deleting}>Yes</button>
            <button className="commitBtn" style={{ backgroundColor: "rgb(218, 218, 218)", cursor: "pointer" }} onClick={() => setOpenDel(false)}>No</button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog className="editDialog" open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle><h4><b>Edit Post</b></h4></DialogTitle>
        <DialogActions>
          <div className="inputWrapper">
            <h5 style={{ fontSize: 20 }}><b>Edit Title</b></h5>
            <TextField value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter new title" />

            <br />

            <h5 style={{ fontSize: 20 }}><b>Edit Description</b></h5>
            <TextField variant="standard" sx={{ backgroundColor: "rgb(230, 230, 230)", borderRadius: "15px" }} multiline value={newDescr} onChange={(e) => setNewDescr(e.target.value)} placeholder="Enter new description" />

            <br />
            <br />

            <button onClick={editing} style={{ width: 80, fontSize: 20, marginLeft: 50 }} className="submit">submit</button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Post;
