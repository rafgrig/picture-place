import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firestore";
import "./HomePage.css";
import MostPopular from "./MostPopular";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import YerevanImg from "../images/YerevanSunset.jpg";
import StreetArt from "../images/streetArt.webp";
import MinimalismPhoto from "../images/minimalist.webp";

function HomePage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  // popoxakan vortex postern e
  const posts = filterPostsFromUsers(users);

  // datan stanum enq firestore ic
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    getUsers();
  }, []);

  // vercnum enq miayn postery
  function filterPostsFromUsers(users) {
    const posts = [];
    users.forEach((user) => {
      if (user.posts) {
        user.posts.forEach((post) => {
          posts.push({
            ...post,
            userId: user.id,
            postIdx: user.posts.indexOf(post),
          });
        });
      }
    });
    return posts;
  }

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = posts.slice(firstIndex, lastIndex);
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const numbers = [...Array(pageCount).keys()].map((i) => i + 1); // Generate page numbers

  // page navigation
  function nextPage() {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  // texti krjatum ete erkar e
  function truncateText(text, maxLength = 200) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  return (
    <div className="HomePage">
      {/* Section 1 (First Page)*/}
      <section className="sectionFirst">
        <div className="sectionWrapper">
          <div className="texts">
            <h2 className="title">Picture Place</h2>
            <h5 className="slogan">
              Picture Place - Capture, Share, Remember.
            </h5>
          </div>
        </div>
      </section>

      {/* Section 2 (Most Popular)*/}
      <section className="sectionSecond">
        <MostPopular />
      </section>

      <hr className="sectionDivider" />

      {/* Section 3 (News)*/}
      <section className="sectionThird">
        <h2 className="latestNewsTitle">Latest News</h2>
        <div className="newsWrapper">
          {/* 1in News Card */}
          <div className="newsCard" onClick={() => navigate("/news/1")}>
            <img src={YerevanImg} alt="Yerevan Sunset" className="newsImage" />
            <h3 className="newsTitle">Yerevan Golden Hour Times</h3>
            <p className="newsCaption">
              Yerevan’s Golden Hour: Discover the Best Sunset Times to Capture
              Stunning, Warm-Toned Cityscapes Like a Pro!
            </p>
          </div>

          {/* 2rd News Card */}
          <div className="newsCard" onClick={() => navigate("/news/2")}>
            <img src={StreetArt} alt="Street Art" className="newsImage" />
            <h3 className="newsTitle">Street Art is getting popular</h3>
            <p className="newsCaption">
              Capturing raw moments in public spaces can be powerful, but where
              do we draw the line between artistic expression and respecting
              people’s privacy? We explore both perspectives.
            </p>
          </div>

          {/* 3rd News Card */}
          <div className="newsCard" onClick={() => navigate("/news/3")}>
            <img src={MinimalismPhoto} alt="Minimalism" className="newsImage" />
            <h3 className="newsTitle">Minimalism is the new trend</h3>
            <p className="newsCaption">
              Minimalist Editing: The New Trend Taking Over Photography –
              Embrace Simplicity and Let Natural Beauty Shine!
            </p>
          </div>
        </div>
      </section>

      <hr className="sectionDivider" />

      {/* Section 4 (Posts) */}
      <section className="sectionFourth">
        <h2 className="PostsTitle">Posts</h2>
        <div className="postsWrapper">
          {currentPosts.map((post) => {
            const ratingsArray = Object.values(post.rating || {});
            const total = ratingsArray.reduce((acc, curr) => acc + curr, 0);
            const avgRating =
              ratingsArray.length > 0 ? total / ratingsArray.length : null;

            return (
              <div
                className="postCard"
                key={post.id}
                onClick={() => navigate(`/post/${post.userId}/${post.postIdx}`)}
              >
                <img src={post.img} alt={post.title} className="postImg" />
                <h3 className="postTitle">{post.title}</h3>
                <p className="postDescription">
                  {truncateText(post.description)}
                </p>
                {typeof avgRating === "number" ? (
                  <p>
                    Rating: {avgRating.toFixed(1)}
                    <FontAwesomeIcon icon={solidStar} className="star-icon" />
                  </p>
                ) : (
                  <p>No ratings yet</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination button - naxord*/}
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={prePage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {/* tvayin buttonner */}
            {numbers.map((number) => (
              <li
                className={`page-item ${currentPage === number ? "active" : ""
                  }`}
                key={number}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(number)}
                >
                  {number}
                </button>
              </li>
            ))}

            {/* Pagination button - hajord */}
            <li className="page-item">
              <button
                className="page-link"
                onClick={nextPage}
                disabled={currentPage === pageCount}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
}

export default HomePage;
