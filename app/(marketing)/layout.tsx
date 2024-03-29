import React from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <Navbar />
      <main className="pt-40 pb-20 ">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default MarketingLayout;
