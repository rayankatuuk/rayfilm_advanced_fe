const AuthCard = ({
  title,
  subtitle,
  children,
  showLogo = true,
  className = ""
}) => {  return (
    <main
      className="h-screen w-screen bg-cover bg-center font-lato"
      style={{ backgroundImage: "url('/assets/image/background login.png')" }}
    >
      <div className="flex items-center justify-center h-full p-6 sm:p-4 md:p-8">
        <div className={`bg-black/20 backdrop-blur-2xl text-white p-6 sm:p-6 md:p-8 rounded-2xl w-full max-w-md shadow-lg ${className}`}>
          <div className="text-center mb-4 sm:mb-6">
            {showLogo && (
              <>
                {/* Logo RAYFILM */}
                <div className="text-2xl sm:text-3xl font-extrabold flex items-center justify-center gap-2 mb-2">
                  <div>
                    <svg width="40" height="35" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
                      <path d="M43.4167 3.99658L35.2292 5.42658L40.9375 11.9166L45.0417 11.1832L43.4167 3.99658ZM29.1042 6.48992L25 7.20492L30.7292 13.6766L34.8125 12.9616L29.1042 6.48992ZM18.8958 8.24992L14.7917 9.00158L20.5208 15.4732L24.6042 14.7582L18.8958 8.24992ZM8.66665 10.0832L6.62498 10.4316C5.54245 10.6219 4.58999 11.1825 3.97674 11.9903C3.36348 12.7981 3.13957 13.787 3.35415 14.7399L4.16665 18.3332L14.375 16.5549L8.66665 10.0832ZM4.16665 18.3332V36.6666C4.16665 38.7016 6.04165 40.3333 8.33332 40.3333H41.6667C43.9792 40.3333 45.8333 38.7016 45.8333 36.6666V18.3332H4.16665Z" fill="white" />
                    </svg>
                  </div>
                  <p>RAYFILM</p>
                </div>
                {/* /Logo RAYFILM */}
              </>
            )}
            <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
            <p className="text-xs sm:text-sm text-gray-300">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthCard; 