interface Banner {
  id: string;
  image: string;
  title: string;
  thumbnailImage?: string;
}

interface BannersSliderProps {
  banners: Banner[];
  selectedBannerImage: string;
  onBannerClick: (image: string) => void;
}

const BannersSlider: React.FC<BannersSliderProps> = ({
  banners,
  onBannerClick,
  selectedBannerImage,
}) => {
  return (
    <div className="relative mx-3 p-0">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-16 xl:w-20 cursor-pointer"
            onClick={() => onBannerClick(banner.image)}
          >
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className={`w-full aspect-square rounded-2xl xl:rounded-[24px] overflow-hidden border-2 transition-colors ${
                banner.image === selectedBannerImage
                  ? 'border-neon-1'
                  : 'border-transparent'
              }`}>
                <img
                  src={banner.thumbnailImage || banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-white text-center truncate w-full px-1">
                {banner.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannersSlider;