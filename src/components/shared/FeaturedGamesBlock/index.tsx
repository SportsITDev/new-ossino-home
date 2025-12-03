import Slider from 'components/shared/Slider';
import { cn } from 'helpers/ui';
import 'swiper/css';
import { SwiperSlide } from 'swiper/react';
import GameRoundedIcon, {
  type RoundedGameIconProps,
} from '../../features/main-page/GameIcon/GameRoundedCard';

interface IRecentlyPlayedBlockProps {
  games: RoundedGameIconProps[];
  label: string;
  className?: string;
  headerClassName?: string;
}

const FeaturedGamesBlock = ({
  games,
  label,
  headerClassName,
  className,
}: IRecentlyPlayedBlockProps) => {
  return (
    <Slider label={label} navigation headerClassName={headerClassName}>
      {games.map((game) => (
        <SwiperSlide
          key={(Math.random() * 100 + 1).toString()}
          className={cn('!w-auto', className)}
        >
          <GameRoundedIcon 
            title={game.title} 
            image={game.image} 
            id={game.id}
            name={game.name}
            game={game.game}
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default FeaturedGamesBlock;