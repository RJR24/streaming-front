import React, { useEffect } from "react";

import HeroSection from "../../components/hero/HeroSection";
import Carousel from "../../components/carousels/Carousel";
import UserMyList from "../../components/userMyList/UserMyList";
import Top10MoviesUK from "../../components/movieCategoriesCarousels/TopTenUk";
import Upcoming from "../../components/movieCategoriesCarousels/UpcomingMovies";
import PopularMovies from "../../components/movieCategoriesCarousels/PopularMovies";
import Trending from "../../components/movieCategoriesCarousels/Trending";

const Home = () => {
  const KavehKeepWatching = Array.from({ length: 10 }, (_, index) => ({
    title: `Kaveh, Keep Watching ${index}`,
    imageUrl: `/movies-cover-images/Kaveh-keep-watching/MoviePoster-${index}.png`,
  }));

  const netflixOriginals = Array.from({ length: 10 }, (_, index) => ({
    title: `Netflix Original ${index}`,
    imageUrl: `/movies-cover-images/Netflix-original-content/MoviePoster-${index}.png`,
  }));

  useEffect(() => {});

  return (
    <>
      <div className="bg-neutral-900 min-h-full">
        
        <HeroSection />

        <PopularMovies />
        <UserMyList />

        <Trending />

        <Top10MoviesUK />
        <Upcoming />

        <Carousel title="Kaveh, keep watching" items={KavehKeepWatching} />
        <Carousel title="Netflix Original Content" items={netflixOriginals} />

        
      </div>
    </>
  );
};

export default Home;
