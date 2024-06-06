import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import beersJSON from "./../assets/beers.json";
import axios from "axios";


function BeerDetailsPage() {
  // Mock initial state, to be replaced by data from the Beers API. Store the beer info retrieved from the Beers API in this state variable.
  const [beer, setBeer] = useState(null);

  // React Router hook for navigation. We use it for the back button. You can leave this as it is.
  const navigate = useNavigate();

  // TASKS:
  // 1. Get the beer ID from the URL, using the useParams hook.
  const { beerId } = useParams(); 

  // 2. Set up an effect hook to make a request for the beer info from the Beers API.
  // 3. Use axios to make a HTTP request.
  // 4. Use the response data from the Beers API to update the state variable.
  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const { data } = await axios(`https://ih-beers-api2.herokuapp.com/beers/${beerId}`);
        setBeer(data);
          const beersWithImages = data.map((oneBeer) => {
        oneBeer.image_url =
          "https://images.unsplash.com/photo-1436076863939-06870fe779c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        return oneBeer;
      });
      setBeer(beersWithImages);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBeer();
  }, [beerId]);
  if (!beer) {
    return <p>loading...</p>;
  }



  // Structure and the content of the page showing the beer details. You can leave this as it is:
  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      {beer && (
        <>
          <img
            src={beer.image_url}
            alt="Beer Image"
            height="300px"
            width="auto"
          />
          <h3>{beer.name}</h3>
          <p>{beer.tagline}</p>
          <p>Attenuation level: {beer.attenuation_level}</p>
          <p>Description: {beer.description}</p>
          <p>Created by: {beer.contributed_by}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default BeerDetailsPage;
