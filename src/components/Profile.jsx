import { collection, doc, setDoc, getDoc, } from "firebase/firestore";
import db from "../firestore.js";
import { useEffect, useState } from "react";



function Profile() {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const userDocRef = doc(db, "users", "HzG4wIXuwBnklGF2Gh8T");
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data()); // Save user data in state
            } else {
                console.log("No such document!");
            }
        }
        fetchData()
    }
        , [])

    return (
        <div>
            {userData ? (
                <>
                    <img style={{margin:5, width: 200, height: 200, borderRadius: "100%" }} src={userData["profile_pic"]} />
                    <p>User Name: {userData["nick_name"]}</p>
                    <p>User email: {userData.email}</p>
                </>

            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Profile