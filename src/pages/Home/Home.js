import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GETUSER } from "../../api/ApiConstant";
import { getByEmail } from "../../api/CommonServices";
import packages from "./packages";

const Home = () => {
  const [profile, setProfile] = useState()
  const user = JSON.parse(localStorage.getItem("user"));
  const access_token = JSON.parse(localStorage.getItem("access_token"));

  const getUser = async () => {
    
      const res = await getByEmail(GETUSER, user.email)
      setProfile(res.data)
    
  }
  useEffect(() => {
   
        getUser()
    
  
  }, [user])

  return (
    <div>
      {access_token && !profile?.is_rider && (
        <div className="w-1/2 mx-auto mt-14 h-[600px]">
          <div className="grid gap-4 place-items-center xl:grid-cols-2 text-center " >
            {
              packages?.map(ele =>
                <div key={ele.id} className="card w-96 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title justify-center">{ele.title}</h2>
                    <p>{ele.body}</p>
                    <p>{ele.price}$</p>
                    <div className="card-actions justify-center">
                      <Link to={`/payment/${ele.id}`}>
                        {" "}
                        <button className="btn ">Buy Now</button>
                      </Link>
                    </div>
                  </div>
                </div>

              )
            }
          </div>
        </div>
      )}
      {access_token && profile?.is_rider && (
        <div className="w-1/2 mx-auto mt-14 h-[600px]">
          <div className="text-center " >
            Home
          </div>
        </div>
      )}
      {
        !access_token && (
          <div className="flex flex-col p-96">
            <div className="flex items-center justify-center gap-5 ">
              <button className="btn btn-wide">
                {" "}
                <Link to="/rider-signup">Join as a rider</Link>{" "}
              </button>
              <button className="btn btn-wide">
                {" "}
                <Link to="/driving-learner-signup">
                  Join as a driving learner
                </Link>{" "}
              </button>
            </div>
            <p className="text-center mt-5">
              Already have an account? please <Link to="/login">login</Link>{" "}
            </p>
          </div>
        )
      }
    </div>
  );
};

export default Home;
