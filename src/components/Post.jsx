import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firestore";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function Post({ index, img, title, description, rating, deletingData, userId, setRefresh }) {

    const forDeleting = deletingData[index];
    const [open, setOpen] = useState(false)

    const deleting = useCallback(async () => {
        if (!forDeleting) return;

        await updateDoc(doc(db, "users", userId), {
            posts: arrayRemove(forDeleting),
        });

        setRefresh((prevState) => {
            return prevState + 1;
        });

        setOpen(false)

    }, [forDeleting, userId, setRefresh]);

    return (
        <>
            <div className="postWrapper" key={index}>
                <button onClick={()=>{setOpen(true)}} className="deleteBtn">X</button>
                <img src={img} alt="post image" />
                <div className="misc">
                    <h4>{title}</h4>
                    <span>{description}</span>
                    <br />
                    <br />
                    <b>Rating: {rating}</b>
                </div>
            </div>
            <Dialog open={open} onClose={()=>{setOpen(false)}}>
                <DialogTitle>
                    Are you sure you want to delete this post?
                </DialogTitle>
                <DialogActions>
                    <div className="btnWrapper">
                    <button style={{backgroundColor:"rgb(177, 177, 177)", cursor:"pointer"}} onClick={deleting}>Yes</button>
                    <button style={{backgroundColor:"rgb(218, 218, 218)", cursor:"pointer"}} onClick={()=>{setOpen(false)}}>No</button>
                    </div>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default Post;
