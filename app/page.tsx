import Footer from "@/components/Footer";
import Navbar2 from "@/components/Navbar2";
import XLImagesSlider from "@/components/XLImagesSlider";
import { StoreProvider } from "./StoreProvider";
import BestSellers from "@/components/BestSellers";
import VintageProducts from "@/components/VintageProducts";
import ClutchProducts from "@/components/ClutchProducts";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import ReviewMarquee from "@/components/ReviewsMarqee";
import CarouselComp from "@/components/CarouselComp";

export default function IndexPage() {
  return (
    <>
    <CarouselComp/>
      {/* <XLImagesSlider /> */}
      <BestSellers/>
      <Categories/>
      <VintageProducts/>
      <ClutchProducts/>
      <ReviewMarquee/>
      <AboutUs/>
    </>
  );
}


