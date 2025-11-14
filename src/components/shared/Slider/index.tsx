import { type ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { cn } from '../../../helpers/ui';

interface ISliderProps {
  children: ReactNode;
  label?: string;
  withShadow?: boolean;
  navigation?: boolean;
  className?: string;
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
}

const Slider = ({
  children,
  label,
  withShadow = false,
  navigation = false,
  className,
  spaceBetween = 12,
  slidesPerView = 'auto',
}: ISliderProps) => {
  return (
    <div className={cn('', className)}>
      {label && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{label}</h3>
        </div>
      )}
      <Swiper
        className={cn(
          'relative',
          { 'shadow-lg': withShadow }
        )}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigation}
        freeMode
        touchReleaseOnEdges
      >
        {children}
      </Swiper>
    </div>
  );
};

export default Slider;
export { SwiperSlide };