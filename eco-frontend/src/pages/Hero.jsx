import KenyaSVG from "@assets/images/forest.jpg";
import { Button } from "flowbite-react";
import { BsGoogle } from "react-icons/bs";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Hero = () => {


  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // user contains info like displayName, email, photoURL, etc.

      // Obtain an ID token (JWT) to pass to your backend (e.g., Streamlit)
      const idToken = await user.getIdToken();
      console.log("ID Token:", idToken);
      // URL-encode the token to ensure safe transmission
      const encodedIdToken = encodeURIComponent(idToken);

      // Redirect to Streamlit app with the encoded token
      window.location.href = "https://ecotracktest.streamlit.app/?token=" + encodedIdToken;

    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-2 text-[#040405] justify-center relative h-screen">
      <div className="flex-1 flex flex-col h-full px-20">
        <h1 className="md:text-9xl pt-10 text-4xl font-black text-center md:text-start">
          <b className="text-green-700">Eco</b> <span className="md:block"><b className="text-blue-600">Track</b></span>
        </h1>
        <p className="text-center md:text-start text-xl pt-5">
          A platform Informing Kenyans on their carbon footprint and what they can do to reduce it.
        </p>
        <hr className="w-full border-gray-400 my-10" />

        <div className="mt-5 flex flex-col items-center gap-5">
          <Button className=" w-full" onClick={handleGoogleSignIn}>
            <div className="flex flex-row items-center gap-2">
              <BsGoogle className="" />
              Sign In with Google
            </div>
          </Button>
          <h3>OR</h3>
          <Button color="gray" size="lg" className="w-full text-blue-500">
            <div className="flex flex-row items-center gap-2">
              <BsGoogle className="" />
              Create an Account
            </div>
          </Button>

        </div>
      </div>
      <div className="flex-1 h-full">
        <img src={KenyaSVG} alt="" className="h-full object-cover w-full" />
      </div>

    </div>
  );
};

export default Hero;
