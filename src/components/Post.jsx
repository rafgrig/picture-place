import { arrayRemove, doc, runTransaction, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firestore";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function Post({ index, img, title, description, rating, deletingData, userId, setRefresh }) {

    const forDeleting = deletingData[index];
    const [openDel, setOpenDel] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newDescr, setNewDescr] = useState("")

    const deleting = useCallback(async () => {
        if (!forDeleting) return;

        await updateDoc(doc(db, "users", userId), {
            posts: arrayRemove(forDeleting),
        });

        setRefresh((prevState) => {
            return prevState + 1;
        });

        setOpenDel(false)

    }, [forDeleting, userId, setRefresh]);

    const editing = useCallback(async ()=>{
        await runTransaction(db, async(transaction)=>{
            let array = deletingData
            array[index] = {...array[index], title: newTitle, description: newDescr}
            transaction.update(doc(db, "users", userId), {posts: array})
        })
        setOpenEdit(false)
        setRefresh((prevState) => {
            return prevState + 1;
        });

    }, [index, newTitle, newDescr, deletingData, userId, setRefresh])

    return (
        <>
            <div className="postWrapper" key={index}>
                <button onClick={() => { setOpenDel(true) }} className="deleteBtn">X</button>
                <img src={img} alt="post image" />
                <div className="misc">
                    <h4>{title}</h4>
                    <span>{description}</span>
                    <br />
                    <br />
                    <b>Rating: {rating}</b>

                    <button onClick={() => { setOpenEdit(true) }} className="editBtn">✏️</button>

                </div>
            </div>
            <Dialog open={openDel} onClose={() => { setOpenDel(false) }}>
                <DialogTitle>
                    Are you sure you want to delete this post?
                </DialogTitle>
                <DialogActions>
                    <div className="btnWrapper">
                        <button style={{ backgroundColor: "rgb(177, 177, 177)", cursor: "pointer" }} onClick={deleting}>Yes</button>
                        <button style={{ backgroundColor: "rgb(218, 218, 218)", cursor: "pointer" }} onClick={() => { setOpenDel(false) }}>No</button>
                    </div>
                </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={() => { setOpenEdit(false) }}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogActions>
                    <div className="inputWrapper">
                        <label><b>Edit Title</b></label>
                        <br />
                        <input value={deletingData[index].title} onChange={(e)=>{setNewTitle(e.target.value)}} placeholder="Enter new title" />

                        <br />
                        <br />

                        <label><b>Edit Description</b></label>
                        <br />
                        <input value={deletingData[index].description} onChange={(e)=>{setNewDescr(e.target.value)}} placeholder="Enter new description" />
                        
                        <br/>
                        <br/>

                        <button onClick={editing} style={{width:80, fontSize:20, marginLeft: 50}} className="submit">submit</button>
                    </div>
                </DialogActions>
            </Dialog>


        </>
    );
}

export default Post;
