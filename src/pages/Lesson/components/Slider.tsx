import React from 'react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/app/components/ui/carousel';
import { TextContentRenderer } from './TextContentRenderer';

interface SliderItem {
  id: number;
  componentType: 'text' | 'image';
  text?: string;
  src?: string;
  annotation?: string;
}

interface SliderProps {
  items: SliderItem[];
}

export const Slider: React.FC<SliderProps> = ({ items }) => {
  return (
    <div className="mt-4 rounded-lg bg-gray-100 p-2 sm:p-4">
      <Carousel
        opts={{
          align: 'center',
          loop: false,
          skipSnaps: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map(item => (
            <CarouselItem key={item.id}>
              <div
                className={cn('flex flex-col items-center p-1 sm:p-2', {
                  'h-full justify-center': item.componentType === 'text',
                })}
              >
                {item.componentType === 'text' && item.text && (
                  <div className="mb-2 w-full max-w-full px-2 sm:mb-4 sm:px-0 md:w-[550px]">
                    <TextContentRenderer
                      content={item.text}
                      allowHtml={true}
                      className="prose mx-auto max-w-full text-sm sm:text-base"
                    />
                  </div>
                )}
                {item.componentType === 'image' && item.src && (
                  <>
                    <img
                      src={item.src}
                      alt={item.annotation || ''}
                      className="mb-2 h-40 w-full rounded object-cover sm:h-52 md:h-64"
                    />
                    {item.annotation && (
                      <div className="mt-1 text-center text-xs text-gray-500 sm:mt-2 sm:text-sm">{item.annotation}</div>
                    )}
                  </>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="md:left-0.6 left-0 h-8 w-8 bg-white sm:h-10 sm:w-10" />
        <CarouselNext className="right-0 h-8 w-8 bg-white sm:h-10 sm:w-10" />
      </Carousel>
    </div>
  );
};
