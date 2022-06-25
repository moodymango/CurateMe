import React, {useState, useEffect }from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from './api/axios';
//user page will contain cards for both collections and individual artworks based on collections
//import collections card here
const UserPage = (props) => {
  const {username} = useParams();
  const noColon = username.substring(1)
  //if user has collections available, will render, if not, prompt user to create a collection
  const [userCollections, setCollections] = useState([])
  //if user does not have any collections, will render call to action
  //else display user collections
  const [userHasCollections, setBoolean] = useState(false)
  const getCollections = async () =>{
    //make get request if user has collections
    try{
      //within axios.get need to define search url for backend
      const collections = await axios({
        method: 'GET',
        url: `http://localhost:5050/${noColon}/collections`
      })
      //so state is not being updated properly in this case!!!
      collections.data.forEach((el) => {
        console.log(el)
        setCollections(...userCollections, el)
      })

    }
    catch (err) {
      console.log('error in getting user collection')
    }
  }
  //will have to use useEffect to check if user has collections
  useEffect(() =>{
    //run get collections, and if user has collections, change boolean to true
    getCollections()
    if (userCollections.length){
      setBoolean(true)
    }
  }, [])
  useEffect(() =>{
    //run get collections, and if user has collections, change boolean to true
  }, [userCollections])

  return (
      <>
      <div className='user-page'>
      <section className='user-name' >
              <h1>{noColon}</h1>
        </section>
        <section id='conditional'>
            {userHasCollections? (
                <section>
                    <p>It Worked!</p>
                </section>
            ) : (
                <section >
                    <h1>Lets get started!</h1>
                    <button>Create your first collection</button>
                </section>
            )}
        </section>
      </div>
      </>
  )
}

export default UserPage