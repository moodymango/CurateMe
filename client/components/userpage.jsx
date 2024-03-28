import React, { useState, useEffect } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import Masonry from "react-masonry-component";
import { useAuth } from "./Contexts/AuthContext.jsx";
import axios from "axios";
import ArtworkCard from "./artworkCard.jsx";

const UserPage = (props) => {
  const { history } = props;
  const [userFavorites, setUserFavorites] = useState([]);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { removeAuthenticatedUser } = useAuth();

  const getCollections = async () => {
    try {
      const favorites = await axios.get("/:user/collections", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("favorites is ", favorites);
      setUserFavorites([...favorites.data]);
    } catch (err) {
      console.log("error in getting user collection");
    }
  };
  useEffect(() => {
    getCollections();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      //call remove authenticated user
      removeAuthenticatedUser();
      //redirect to user logout page
      history.push("/login");
    } catch (err) {
      setError(true);
    }
  };
  const artworksArr = userFavorites.map((result) => {
    const { id, title, artist_title, medium, date_display, image_id } = result;
    return (
      <ArtworkCard
        artworkId={id}
        artist={artist_title}
        artwork_type={medium}
        date={date_display}
        title={title}
        image_id={image_id}
      />
    );
  });

  return (
    <>
      <div className="user-page">
        <section className="user_collections">
          {userFavorites.length ? (
            <Masonry
              className="user-favorites"
              disableImagesLoaded={false}
              columnWidth={250}
              gutter={10}
            >
              {artworksArr}
            </Masonry>
          ) : (
            <section className="user_no_collection">
              <div className="no_collection_content">
                <h1>Lets get started.</h1>
                <div className="user_instructions">
                  <p>
                    Search for artworks and add them to your favorites by
                    clicking the heart in the top left corner.
                  </p>
                  <p>Then come back and exhibit them to the public! </p>
                </div>
                <Link
                  style={{
                    textDecoration: "none",
                    fontWeight: "800",
                    color: "var(--color-primary)",
                  }}
                  to="/search"
                >
                  {" "}
                  Visit Artwork Search{" "}
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </section>
          )}
        </section>
      </div>
    </>
  );
};

export default withRouter(UserPage);
