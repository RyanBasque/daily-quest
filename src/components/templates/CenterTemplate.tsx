import React from 'react';

interface CenterTemplateProps {
  children: React.ReactNode;
}

export const CenterTemplate: React.FC<CenterTemplateProps> = ({ children }) => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 pt-24 sm:pt-8 relative overflow-y-auto overflow-x-hidden">
      {/* Optional: Add some floating decorative blobs for more depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-2xl">
        {children}
      </div>
    </main>
  );
};
