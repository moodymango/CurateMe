import React, { useState, useRef } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import CollectionsCard from "./collections.jsx";
import { useAuth } from "./Contexts/AuthContext.jsx";
import axios from "axios";

const UserPage = (props) => {
  const { history } = props;
  const { user } = useParams();
  const noColon = user.substring(1);
  const [userCollections, setCollections] = useState([]);
  const prevCollection = useRef([]);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { removeAuthenticatedUser } = useAuth();

  // const getCollections = async () => {
  //   try {
  //     console.log("sending request to backend to pull up user favorites");
  //     const collections = await axios({
  //       method: "GET",
  //       url: `/:user/collections`,
  //     });
  //     if (collections.data) {
  //       userHasCollections(true);
  //     }
  //     collections.data.forEach((el) => {
  //       setCollections(...userCollections, el);
  //       prevCollection.current.push(el);
  //       console.log("updated state array is=>", prevCollection.current);
  //     });
  //   } catch (err) {
  //     console.log("error in getting user collection");
  //   }
  // };
  // useEffect(() => {
  //   getCollections();
  // }, []);

  // useEffect(() => {
  //   const collectionDisplay = [];
  //   if (prevCollection) {
  //     // prevCollection.forEach((elObj) => {
  //     //   collectionDisplay.push(
  //     //     <CollectionsCard
  //     //       title={elObj.title}
  //     //       description={eleObj.description}
  //     //     />
  //     //   );
  //     // });
  //   }
  // }, [prevCollection.current]);
  const handleLogout = async (e) => {
    console.log("logout button pressed");
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
      // setErrMsg(`${err.response.data}`);
    }
  };

  return (
    <>
      <div className="user-page">
        <section className="user_collections">
          {prevCollection.current.length ? (
            <section>{collectionDisplay}</section>
          ) : (
            <section className="user_no_collection">
              <h1>Lets get started.</h1>
              <div className="user_instructions">
                <p>
                  Search for artworks and add them to your favorites by clicking
                  the heart in the top left corner.
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
            </section>
          )}
        </section>
      </div>
    </>
  );
};

export default withRouter(UserPage);
