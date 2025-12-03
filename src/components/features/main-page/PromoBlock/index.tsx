import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './promoblock.css';

import Slider from 'components/shared/Slider';
import { useBreakpoint, BREAKPOINTS } from 'helpers/hooks';
import PromotionCard from 'components/shared/PromotionCard';
import { AppDispatch, RootState } from 'store/index';
import { getPromotions } from 'store/promotions/slice';

const PromotionSkeleton = () => {
  return (
    <div className="rounded-xl p-3 animate-pulse bg-gradient-to-b from-gray-700 to-gray-800">
      <div className="flex items-center justify-between mb-[17px]">
        <div className="w-16 h-8 bg-gray-600 rounded"></div>
        <div className="h-[30px] w-24 bg-gray-600 rounded-lg"></div>
      </div>

      <div className="pb-[5px] flex items-center gap-2 justify-between">
        <div className="justify-center bg-gray-600/20 grow h-10 rounded-[4px] border border-gray-500/20 flex flex-col items-center gap-[2px]">
          <div className="w-8 h-3 bg-gray-500 rounded"></div>
          <div className="w-12 h-2 bg-gray-600 rounded"></div>
        </div>

        <div className="justify-center bg-gray-600/20 grow h-10 rounded-[4px] border border-gray-500/20 flex flex-col items-center gap-[2px]">
          <div className="w-6 h-3 bg-gray-500 rounded"></div>
          <div className="w-14 h-2 bg-gray-600 rounded"></div>
        </div>

        <div className="justify-center bg-gray-600/20 grow h-10 rounded-[4px] border border-gray-500/20 flex flex-col items-center gap-[2px]">
          <div className="w-6 h-3 bg-gray-500 rounded"></div>
          <div className="w-10 h-2 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const PromoBlock = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: promotions,
    loading,
    error,
  } = useSelector((state: RootState) => state.promotions);
  const { screenWidth } = useBreakpoint();
  const xl = screenWidth >= BREAKPOINTS.xl;

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="py-[9px]">
        <Slider withShadow>
          {Array.from({ length: 4 }, (_, index) => (
            <SwiperSlide
              key={`skeleton-${index}`}
              style={{ width: xl ? '375px' : 'auto' }}
            >
              <PromotionSkeleton />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-[9px]">
        <div className="text-red-400">
          Error loading promotions: {error.message}
        </div>
      </div>
    );
  }

  if (!promotions || promotions.length === 0) {
    return (
      <div className="py-[9px]">
        <div className="text-gray-400">No promotions found</div>
      </div>
    );
  }

  const activePromotions = promotions
    .filter((promotion) => promotion.is_active)
    .sort((a, b) => a.displayorder - b.displayorder);

  return (
    <Slider withShadow>
      {activePromotions.map((promotion) => (
        <SwiperSlide
          key={promotion.offer_id}
          style={{ width: xl ? '375px' : 'auto' }}
        >
          <PromotionCard promotion={promotion} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default PromoBlock;
