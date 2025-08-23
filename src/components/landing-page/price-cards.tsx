import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const priceCardData = [
  {
    plantype: "Free",
    price: "0",
    description: "Start Right Now",
    features: [
      "fun for the family",
      "Limited file upload",
      "Upto 2 guests to collab",
      "Publish your Pages to the Web with one click",
    ],
  },
  {
    plantype: "Pro Plan",
    price: "10",
    description: "Unlock the true potential",
    features: [
      "All the features of Free Plan",
      "Unlimited* file upload",
      "Invite upto 10 guests",
      "Publish multiple Pages to the web",
    ],
  },
];

const PriceCards = () => {
  return (
    <div className="max-w-[700px] py-12">
      <div>
        <div className="flex flex-col gap-8 items-center justify-center space-y-8
         md:flex-row md:space-y-0 md:items-stretch">
          {priceCardData.map((pcdata, index) => (
            <Card className="w-full max-w-sm shadow-2xl" key={index}>
              <CardHeader className="p-0">
                <CardTitle className="grid gap-2 p-6">
                  <span className="text-3xl font-semibold">
                    {pcdata.plantype}
                  </span>
                  <span className="text-sm font-normal text-gray-500
                   dark:text-gray-400">
                    {pcdata.description}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid items-center p-8">
                  <span className="text-4xl font-semibold">
                    ${pcdata.price}
                  </span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <div className="border-t border-b border-gray-100 dark:border-gray-800">
                  {pcdata.features.map((feature, findex) => (
                    <div
                      key={feature}
                      className={`grid items-center p-6 ${
                        findex % 2 !== 0 ? "bg-gray-100 dark:bg-gray-800" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2 max-w-60">
                        <CheckIcon className="w-4 h-4" />
                        <span className="font-medium">{feature}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 flex justify-center">
                <Button>Sign Up</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

function CheckIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default PriceCards;
