import type { LoyaltyPoint } from 'store/loyaltyPoints/slice';

const LoyaltyPointDesktop = ({
  icon,
  title,
  points,
}: Omit<LoyaltyPoint, 'id'>) => {
  return (
    <div className="bg-[#1C1C1C] rounded-xl py-2 flex flex-col justify-center items-center w-full h-full">
      <img
        src={icon.href}
        alt={icon.id}
        width={24}
        height={24}
        className="mb-[5px]"
      />
      <h4 className="text-xs leading-none mb-[3px]">{title}</h4>
      <p className="text-sm leading-5 text-neon-1">{points}</p>
    </div>
  );
};

export default LoyaltyPointDesktop;
