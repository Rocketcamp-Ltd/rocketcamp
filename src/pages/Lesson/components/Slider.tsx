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
    <div className="mt-4 rounded-lg bg-gray-100 p-4">
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
            <CarouselItem
              key={item.id}
              className="w-full"
            >
              <div
                className={cn('flex flex-col items-center p-2', {
                  'h-full justify-center': item.componentType === 'text',
                })}
              >
                {item.componentType === 'text' && item.text && (
                  <div className="mb-4 w-full">
                    <TextContentRenderer
                      content={item.text}
                      allowHtml={true}
                      className="prose mx-auto max-w-full text-base"
                    />
                  </div>
                )}
                {item.componentType === 'image' && item.src && (
                  <>
                    <img
                      src={item.src}
                      alt={item.annotation || ''}
                      className="mb-2 h-64 w-full rounded object-cover"
                    />
                    {item.annotation && <div className="mt-2 text-center text-sm text-gray-500">{item.annotation}</div>}
                  </>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white" />
        <CarouselNext className="right-2 bg-white" />
      </Carousel>
    </div>
  );
};
