import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';

const FAQPage: React.FC = () => {
  const [faq, setFaq ] = React.useState([
    {
      question: 'Question 1',
      answer: 'Ask 1.',
      id: 1,
    },
    {
      question: 'Question 2',
      answer: 'Ask 2.',
      id: 2,
    }
  ]);

  return (
    <div className='min-h-screen flex items-center w-full'>
      <div className='max-w-2xl mx-auto w-full'>
        <Accordion
          type="single"
          collapsible
        >
          {
            faq.map((item) => {
              return (
                <AccordionItem key={item.id} value={`faq-${item.id}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              );
            })
          }
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
