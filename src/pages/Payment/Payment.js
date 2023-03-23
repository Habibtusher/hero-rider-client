import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import packages from "../Home/packages";
// import Loading from "../../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUSLISH_KEY);
const Payment = () => {
 const {id} = useParams()
 const singlePackage = packages.find((ele)=> ele.id == id)
 console.log("🚀 ~ file: Payment.js:12 ~ Payment ~ id:", id)
//   const navigation = useNavigation()
//   const { data } = useLoaderData();
//   const singlePackage = data.data;
// if(navigation.state === "loading"){
//   return "Loading..."
// }



  return (
    <div className="md:w-1/2 mx-auto p-6">

  
    <div className=" mt-14 h-[600px]">
      <h3 className="text-3xl mb-4">Payment For {singlePackage?.body}</h3>
      <p className="text-xl">
        {" "}
        Please pay <span className="font-bold">${singlePackage?.price} </span> for your  {singlePackage?.body}
      </p>
      <div className=" my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm
          packageDetail={singlePackage}
          />
        </Elements>
      </div>
    </div>
    </div>
  );
};

export default Payment;
