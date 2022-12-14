import {useEffect} from "react";
import lottie from "lottie-web"
import animationData from "./heroside_image1.json"

  const HeroImage1 = (props) =>{
    const heroimage1 = document.querySelector("#hero_image")

    useEffect(() => {
      lottie.loadAnimation({
        heroimage1: heroimage1,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    },[])
  };

  export default HeroImage1
