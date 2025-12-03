import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import RewardCard from 'components/shared/RewardCard';
import MissionRewardCard from 'components/shared/MissionRewardCard';
import Slider from 'components/shared/Slider';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectRewards,
  selectRewardsError,
  selectRewardsLoading,
  selectMissionRewards,
  selectMissionRewardsError,
  selectMissionRewardsLoading,
  selectClaimingReward,
  selectClaimError,
} from 'store/rewards/selectors';
import { getMissionRewards, claimMissionReward } from 'store/rewards/slice';
import { SwiperSlide } from 'swiper/react';
import RewardCardSkeleton from '../RewardCardSkeleton';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';

type RewardsListProps = {
  onSelectReward: (coins: number) => void;
};

const RewardsList = ({ onSelectReward }: RewardsListProps) => {
  const dispatch = useAppDispatch();

  const rewards = useAppSelector(selectRewards);
  const rewardsLoading = useAppSelector(selectRewardsLoading);
  const rewardsError = useAppSelector(selectRewardsError);

  const missionRewards = useAppSelector(selectMissionRewards);
  const missionRewardsLoading = useAppSelector(selectMissionRewardsLoading);
  const missionRewardsError = useAppSelector(selectMissionRewardsError);
  const claimingReward = useAppSelector(selectClaimingReward);
  const claimError = useAppSelector(selectClaimError);

  const userData = useAppSelector((state: any) => state.user.data);
  const isLoggedIn = useAppSelector((state: any) => state.user.loggedIn);

  useEffect(() => {
    console.log('=== RewardsList useEffect triggered ===');
    console.log('User data:', userData);
    console.log('User logged in status:', isLoggedIn);

    const operatorId = import.meta.env.VITE_OPERATOR_ID || 'ossino';
    const brand = import.meta.env.VITE_OPERATOR_ID || 'ossino';

    const playerId = userData?.id ? userData.id.toString() : '1000120';

    console.log('=== Dispatching getMissionRewards with ===:', {
      playerId,
      operatorId,
      brand,
    });

    dispatch(
      getMissionRewards({
        playerId,
        operatorId,
        brand,
      }),
    );
  }, [dispatch]);

  const handleClaimReward = (promotionId: string, prizeAmount?: number) => {
    if (userData && userData.id) {
      const accessToken = LocalStorageHelper.getItem<string>(STORAGE_KEYS.accessToken);
      if (accessToken) {
        dispatch(
          claimMissionReward({
            promotionId,
            playerId: userData.id,
            accessToken,
            prizeAmount,
          }),
        );
      }
    }
  };

  const isLoading = rewardsLoading || missionRewardsLoading;

  if (isLoading) {
    return (
      <>
        <div className="md:flex-1 md:py-5 md:px-4 md:rounded-xl md:bg-gray-800 hidden md:block">
          <p className="mb-3 md:font-bold xl:text-lg">Rewards</p>
          <div className="flex gap-2.5 md:gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <RewardCardSkeleton key={index} />
            ))}
          </div>
        </div>
        <Slider label="Rewards" className="mt-0 md:hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SwiperSlide key={index} className="w-fit">
              <RewardCardSkeleton />
            </SwiperSlide>
          ))}
        </Slider>
      </>
    );
  }

  const hasError = rewardsError || missionRewardsError || claimError;

  if (hasError && !rewards && !missionRewards) {
    const errorMessage =
      rewardsError?.message ||
      missionRewardsError?.message ||
      claimError?.message ||
      'An error occurred';

    return (
      <div className="md:flex-1 md:py-5 md:px-4 md:rounded-xl md:bg-gray-800 md:w-[360px] xl:w-[498px]">
        <p className="mb-3 md:font-bold xl:text-lg">Rewards</p>
        <div className="flex flex-col h-[120px] md:h-[104px] xl:h-[150px] justify-center">
          <ErrorMessage message={errorMessage} />
        </div>
      </div>
    );
  }

  const hasRewards =
    (rewards && rewards.length > 0) ||
    (missionRewards && missionRewards.length > 0);

  if (!hasRewards) {
    return (
      <div className="md:flex-1 md:py-5 md:px-4 md:rounded-xl md:bg-gray-800 md:w-[360px] xl:w-[498px] h-full">
        <p className="mb-3 md:font-bold xl:text-lg">Rewards</p>
        <NoItemsMessage message="No rewards available" />
      </div>
    );
  }

  const allRewards: Array<{ type: 'legacy' | 'mission'; data: any }> = [];

  if (rewards) {
    rewards.forEach((reward) => {
      allRewards.push({ type: 'legacy', data: reward });
    });
  }

  if (missionRewards) {
    missionRewards.forEach((reward) => {
      allRewards.push({ type: 'mission', data: reward });
    });
  }

  return (
    <>
      <Slider
        label="Rewards"
        count={allRewards.length}
        className="mt-0 md:hidden"
        withShadow
        navigation
      >
        {allRewards.map((rewardItem, index) => (
          <SwiperSlide
            key={`${rewardItem.type}-${rewardItem.data.id || rewardItem.data.promotionId || index}`}
            className="w-fit"
          >
            {rewardItem.type === 'legacy' ? (
              <RewardCard
                data={rewardItem.data}
                onClick={() => onSelectReward(rewardItem.data.value)}
              />
            ) : (
              <MissionRewardCard
                data={rewardItem.data}
                onClick={() => handleClaimReward(rewardItem.data.promotionId, rewardItem.data.prizeAmount)}
                isLoading={claimingReward === rewardItem.data.promotionId}
              />
            )}
          </SwiperSlide>
        ))}
      </Slider>
      <div className="hidden md:block flex-1 py-5 px-4 rounded-xl bg-gray-800">
        <p className="font-bold mb-3 xl:text-lg text-white">Rewards</p>
        <div className="flex gap-2 flex-wrap">
          {allRewards.map((rewardItem, index) => (
            <div
              key={`${rewardItem.type}-${rewardItem.data.id || rewardItem.data.promotionId || index}`}
            >
              {rewardItem.type === 'legacy' ? (
                <RewardCard
                  data={rewardItem.data}
                  onClick={() => onSelectReward(rewardItem.data.value)}
                />
              ) : (
                <MissionRewardCard
                  data={rewardItem.data}
                  onClick={() => handleClaimReward(rewardItem.data.promotionId, rewardItem.data.prizeAmount)}
                  isLoading={claimingReward === rewardItem.data.promotionId}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RewardsList;
