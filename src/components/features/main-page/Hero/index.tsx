import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectBanners, selectBannerLoading, selectBannerError } from '../../../../store/banner/selectors';
import { fetchBanner } from '../../../../store/banner/slice';
import BannersSlider from '../BannersSlider';


import type { Banner } from '../../../../store/banner/banner.types';

const Hero: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const banners = useAppSelector(selectBanners) as Banner[];
  const loading = useAppSelector(selectBannerLoading) as boolean;
  const error = useAppSelector(selectBannerError) as { message: string } | null;

  const [selectedBannerImage, setSelectedBannerImage] = useState<string>('');

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  useEffect(() => {
    if (banners.length > 0) {
      setSelectedBannerImage(banners[0]?.image || '');
    }
  }, [banners]);

  const getCurrentBannerImage = () => {
    const selectedBanner = banners.find(
      (banner) => banner.image === selectedBannerImage,
    );
    return selectedBanner?.image || selectedBannerImage;
  };

  const handleBannerClick = () => {
    const selectedBannerObj = banners.find(b => b.image === selectedBannerImage);
    if (selectedBannerObj && selectedBannerObj.link) {
      if (selectedBannerObj.link.startsWith('http')) {
        window.location.href = selectedBannerObj.link;
      } else {
        navigate(selectedBannerObj.link);
      }
    }
  };

  if (loading && banners.length === 0) {
    return (
      <div className="relative mt-5 box-border max-w-full rounded-xl md:min-h-[375px] xl:min-h-[414px] text-center overflow-hidden w-screen">
        <div className="bg-gray-800 flex flex-col justify-end min-h-[360px] xl:min-h-[400px] rounded-xl animate-pulse">
          <div className="p-4 text-gray-400">Loading banners...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative mt-5 box-border max-w-full rounded-xl md:min-h-[375px] xl:min-h-[414px] text-center overflow-hidden w-screen">
        <div className="flex flex-col bg-gray-800 justify-center min-h-[360px] xl:min-h-[400px] rounded-xl">
          <div className="p-4 text-red-400">{error.message}</div>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="relative mt-5 box-border max-w-full rounded-xl md:min-h-[375px] xl:min-h-[414px] text-center overflow-hidden w-screen">
        <div className="flex flex-col bg-gray-800 justify-center min-h-[360px] xl:min-h-[400px] rounded-xl">
          <div className="p-4 text-gray-400">No banners available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-5 box-border max-w-full rounded-xl overflow-hidden w-screen">
      <div className="relative flex flex-col justify-end bg-no-repeat rounded-xl">
        <img
          src={getCurrentBannerImage()}
          alt="Hero banner"
          className="w-full h-auto object-cover rounded-xl cursor-pointer"
          onClick={handleBannerClick}
        />
        <div className="absolute bottom-0 left-0 right-0 mb-[10px] -mr-3 md:ml-1 md:m-3 md:-mr-4 leading-none">
          <BannersSlider
            banners={banners}
            selectedBannerImage={selectedBannerImage}
            onBannerClick={setSelectedBannerImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;