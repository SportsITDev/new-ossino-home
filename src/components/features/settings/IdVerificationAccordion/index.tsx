import Icon from 'components/shared/Icon';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { useAppSelector } from 'store/index';
import { selectPlayerDetails } from 'store/settings/selectors';
import Badge from '../Badge';
import IdVerificationForm from '../IdVerificationForm';
import documentNormal from '/icons/documentNormal.svg?url';

const IdVerificationAccordion = () => {
  const playerDetails = useAppSelector(selectPlayerDetails);
  const idKycStatus = playerDetails?.idKycStatus;

  return (
    <AccordionItem
      value="id-verification"
      className="rounded-xl xl:border xl:border-gray-700 bg-gray-800 xl:bg-none"
    >
      <AccordionTrigger className="data-[state=open]:pb-2 p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
            <Icon
              href={documentNormal}
              id="documentNormalIcon"
              className="w-5 h-5"
            />
          </div>
          <h3 className="text-sm font-medium leading-none">ID Verification</h3>
          <Badge
            variant={idKycStatus === 'VERIFIED' ? 'success' : 'error'}
            className={
              idKycStatus === 'VERIFIED' ? 'text-status-success-100' : ''
            }
          >
            {idKycStatus || 'Not verified'}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-3">
        <div className="lg:max-w-[600px]">
          <IdVerificationForm />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default IdVerificationAccordion;
