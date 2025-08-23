import Logo from "../logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-79">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground ">
        <a href="/privacy-policy">
          <Button variant="ghost" size="sm">
            Privacy Policy
          </Button>
        </a>
        <a href="/termsandconditions">
          <Button variant="ghost" size="sm">
            Terms and Conditions
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Footer;
