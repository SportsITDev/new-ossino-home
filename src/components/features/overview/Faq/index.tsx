import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from 'components/shared/ui/Accordion';
import { faqs } from './faq';

const Faq = () => {
  return (
    <div className="xl:p-5 xl:bg-gray-800 xl:rounded-xl">
      <h3 className="mb-3 font-bold xl:text-lg">FAQ</h3>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-3"
      >
        {faqs.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={`faq-${id}`}
            className="bg-gray-800 data-[state=open]:border data-[state=open]:border-gray-700 rounded-xl xl:border xl:border-gray-700"
          >
            <AccordionTrigger className="data-[state=open]:pb-2 p-4 data-[state=open]:bg-gray-725">
              <h4 className="font-bold text-sm">{question}</h4>
            </AccordionTrigger>
            <AccordionContent className="text-xs p-4 pt-0 text-gray-200 bg-gray-725">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
