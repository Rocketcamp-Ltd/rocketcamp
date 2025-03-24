import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';

const FAQPage: React.FC = () => {
  // @ts-ignore
  const [faq, setFaq] = useState([
    {
      question: 'Question 1',
      answer: 'Ask 1.',
      id: 1,
    },
    {
      question: 'Question 2',
      answer: 'Ask 2.',
      id: 2,
    },
  ]);

  return (
    <div className="flex min-h-screen w-full items-center">
      <div className="mx-auto w-full max-w-2xl">
        <Accordion
          type="single"
          collapsible
        >
          {faq.map(item => {
            return (
              <AccordionItem
                key={item.id}
                value={`faq-${item.id}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
