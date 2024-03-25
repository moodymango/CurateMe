import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import CollectionsCard from "./collections.jsx";
import axios from "./api/axios.js";

const UserPage = (props) => {
  const { user } = useParams();
  const noColon = user.substring(1);
  const [userCollections, setCollections] = useState([]);
  const prevCollection = useRef([]);
  const [userHasCollections, setBoolean] = useState(false);

  const getCollections = async () => {
    try {
      const collections = await axios({
        method: "GET",
        url: `http://localhost:5050/${noColon}/collections`,
      });
      if (collections.data) {
        userHasCollections(true);
      }
      collections.data.forEach((el) => {
        setCollections(...userCollections, el);
        prevCollection.current.push(el);
        console.log("updated state array is=>", prevCollection.current);
      });
    } catch (err) {
      console.log("error in getting user collection");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  // useEffect(() => {
  //   const collectionDisplay = [];
  //   prevCollection.forEach((elObj) => {
  //     collectionDisplay.push(
  //       <CollectionsCard title={elObj.title} description={eleObj.description} />
  //     );
  //   });
  // }, [prevCollection.current]);
  // const collectionDisplay = [];
  // prevCollection.current.forEach((elObj) => {
  //   collectionDisplay.push(
  //     <CollectionsCard title={elObj.title} description={elObj.description} />
  //   );
  // });
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
                <p>
                  Then come back, re-order your artworks to until and exhibit
                  them to the public!{" "}
                </p>
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
            </section>
          )}
        </section>
      </div>
    </>
  );
};

export default UserPage;
