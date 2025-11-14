import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../store';
import { fetchBanner } from '../../../store/banner/slice';
import { fetchGames } from '../../../store/games/slice';
import { getCategories } from '../../../store/categories/slice';
import { getPromotions } from '../../../store/promotions/slice';
import { getRecentlyPlayedGames } from '../../../store/recentlyPlayed/slice';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Hero from '../../features/main-page/Hero';
import CategoriesBlock from '../../features/main-page/CategoriesBlock';
import PromoBlock from '../../features/main-page/PromoBlock';
import RecentlyPlayedGamesBlock from '../../features/main-page/RecentlyPlayedGamesBlock';
import MainPageBlocks from '../../features/main-page/MainPageBlocks';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [currentCategory, setCurrentCategory] = useState<string>('Lobby');

  useEffect(() => {
    // Load all necessary data for the HomePage
    dispatch(fetchBanner());
    dispatch(fetchGames());
    dispatch(getCategories());
    dispatch(getPromotions());
    dispatch(getRecentlyPlayedGames());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-casino-dark">
      <Header />
      
      <div className="min-h-screen overflow-y-auto">
        <div className="flex flex-col gap-5 md:gap-6 xl:gap-8 pt-[70px] md:pt-0 pb-8">
          <div className="px-4 lg:px-5">
            <Hero />
          </div>
          <div className="pl-4 xl:pl-5 flex flex-col gap-9 xl:pr-5">
            <PromoBlock />

            <RecentlyPlayedGamesBlock />

            <div className="xl:bg-gray-800 xl:py-5 xl:px-5 flex flex-col gap-9 rounded-[12px]">
              <CategoriesBlock applyCurrentCategory={setCurrentCategory} />
              <MainPageBlocks category={currentCategory} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;