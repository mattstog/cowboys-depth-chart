export const Header = () => {
  return (
    <header className="relative overflow-hidden shadow-lg" style={{ background: 'linear-gradient(180deg, #143352 25%, #001f3e 75%)' }}>
      {/* Faded logo watermark */}
      <img 
        src="/cowboys-logo.svg" 
        alt="" 
        className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10"
        aria-hidden="true"
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        <div className="flex items-center gap-x-4">
          <img 
            src="/cowboys-logo.svg" 
            alt="Dallas Cowboys" 
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <div className="flex flex-col items-start gap-y-1">
            {/* Desktop: DALLAS / COWBOYS stacked */}
            <div className="text-white italic hidden lg:block">
              <div className="text-2xl font-bold leading-none tracking-wide" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                DALLAS
              </div>
              <div className="text-4xl font-bold leading-none tracking-wide" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                COWBOYS
              </div>
            </div>
            
            {/* Tablet: COWBOYS only */}
            <div className="text-white italic hidden md:block lg:hidden">
              <div className="text-4xl font-bold leading-none tracking-wide" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                COWBOYS
              </div>
            </div>
            
            {/* Mobile: DAL only */}
            <div className="text-white italic md:hidden">
              <div className="text-3xl font-bold leading-none tracking-wide" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                DAL
              </div>
            </div>
            
            {/* Subtitle */}
            <div className="text-white text-xs md:text-sm tracking-widest opacity-80 mt-1">
              DEPTH CHART
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
