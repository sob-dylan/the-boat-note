"use client";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const testimonialArray = [
  {
    name: "Sonali",
    jobTitle: "Product Manager",
    avatar: "/friends/sonali.svg",
    quote:
      "Boat-Note makes publishing to the internet a one-click affair. It is my personal blog and more.",
  },
  {
    name: "Shivam",
    jobTitle: "Consultant",
    avatar: "/friends/shivs.svg",
    quote: "An excellent place to organize my frantic and scattered thoughts.",
  },
  {
    name: "Aditya",
    jobTitle: "Software developer",
    avatar: "/friends/bhau.svg",
    quote:
      "I love the flexibility and freedom the text editor provides. Boat-Note is my second brain.",
  },
  {
    name: "My mom",
    jobTitle: "Mom",
    avatar: "/friends/mum.svg",
    quote: "Why are you sitting so close to the screen?",
  },
];

const TestimonialCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      orientation="vertical"
      className="sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto z-0"
    >
      <CarouselContent className="-mt-1 h-40 ">
        {testimonialArray.map((testobj, index) => (
          <CarouselItem key={index} className="pt-1">
            <div className="flex border">
              <div className="flex flex-col flex-1 border ">
                <div className="flex-2/3 border-b p-2">{testobj.quote}</div>
                <div className="flex-1/3 text-right p-2">
                  {testobj.name + ", " + testobj.jobTitle}
                </div>
              </div>
              <div className="border-l w-[150px] relative h-[150px]">
                <Image
                  className="relative"
                  src={testobj.avatar}
                  alt="avatar"
                  fill
                ></Image>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="z-10 bg-green-500" />
      <CarouselNext className="z-10 hover:green-500" />
    </Carousel>
  );
};

export default TestimonialCarousel;
