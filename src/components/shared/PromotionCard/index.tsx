interface PromotionCardProps {
  promotion: {
    offer_id: number;
    title: string;
    displayorder: number;
    is_active: boolean;
    offerimage: string;
    detailedofferlink: string;
    categories: string;
    [key: string]: any;
  };
}

const PromotionCard = ({ promotion }: PromotionCardProps) => {
  const handleCardClick = () => {
    console.log('Promotion clicked:', promotion);
    // Navigate to the detailed offer link if available
    if (promotion.detailedofferlink) {
      window.location.href = promotion.detailedofferlink;
    }
  };

  // Always use the offerimage HTML if available
  if (promotion.offerimage) {
    return (
      <div
        className="relative flex-shrink-0 w-[248px] lg:w-[376px] h-[112px] lg:h-[152px] cursor-pointer hover:opacity-90 transition-opacity"
        dangerouslySetInnerHTML={{ __html: promotion.offerimage }}
        onClick={handleCardClick}
      />
    );
  }

  // Fallback card design
  return (
    <div
      className="relative flex-shrink-0 w-[248px] lg:w-[376px] h-[112px] lg:h-[152px] rounded-xl p-3 lg:p-4 bg-gradient-to-r from-[#011504] to-[#3F803C] uppercase cursor-pointer hover:opacity-90 transition-opacity"
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-1.5 lg:gap-2 justify-start">
        <div className="inline-block w-[60px] lg:w-[76px] py-0.5 px-1.5 rounded-[74px] lg:rounded-[100px] bg-lime-green text-2xs lg:text-[10px] leading-[12px] text-center lg:leading-3 text-black font-bold">
          {promotion.categories?.split(',')[0] || 'Hot Offer'}
        </div>
        <div className="flex flex-col gap-0 font-black text-white">
          <p className="text-xs lg:text-[16px] leading-[14px] lg:leading-5">
            {promotion.title}
          </p>
        </div>
        <div className="flex flex-row gap-0 items-center content-center mt-1.5 lg:mt-1 text-xs lg:text-sm leading-[14px] lg:leading-5 capitalize font-bold text-white">
          <div>Learn More</div>
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;