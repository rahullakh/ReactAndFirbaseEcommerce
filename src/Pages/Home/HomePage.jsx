
import Layout from "../../Component/Layout/Layout";
import HeroSection from "../../Component/HeroSection/HeroSection";
import Category from "../../Component/Category/Category";
import HomePageProductCard from "../../Component/Products/HomePageProductCard";
import Track from "../../Component/Track/Track";
import Clients from "../../Component/Clients/Clients";

const HomePage = () => {

  return (
    <Layout>
        <HeroSection></HeroSection>
        <Category></Category>
        <HomePageProductCard></HomePageProductCard>
        <Track></Track>
        <Clients></Clients>
    </Layout>
  )
}

export default HomePage;
