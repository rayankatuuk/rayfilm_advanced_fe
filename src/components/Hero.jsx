const Hero = () => {  return (<section
    className="relative h-[350px] sm:h-[500px] lg:h-[600px] bg-cover bg-center"
    style={{ backgroundImage: "url('/assets/image/Duty After School.png')" }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/10"></div>

    {/* Konten */}
    <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-12 pb-12 sm:pb-20 text-white">
      <div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-5">Duty After School</h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mb-4 sm:mb-6">
          Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.        </p>         
        {/* Tombol */}
        <div className="flex items-center gap-3 flex-wrap">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-all duration-300 hover:scale-105">
            ▶ Mulai
          </button>
          <button className="flex items-center border border-gray-300 px-6 py-3 rounded hover:bg-white hover:text-black transition-all duration-300 gap-2">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 9.5H13V7.5H11M12 20.5C7.59 20.5 4 16.91 4 12.5C4 8.09 7.59 4.5 12 4.5C16.41 4.5 20 8.09 20 12.5C20 16.91 16.41 20.5 12 20.5ZM12 2.5C10.6868 2.5 9.38642 2.75866 8.17317 3.2612C6.95991 3.76375 5.85752 4.50035 4.92893 5.42893C3.05357 7.3043 2 9.84784 2 12.5C2 15.1522 3.05357 17.6957 4.92893 19.5711C5.85752 20.4997 6.95991 21.2362 8.17317 21.7388C9.38642 22.2413 10.6868 22.5 12 22.5C14.6522 22.5 17.1957 21.4464 19.0711 19.5711C20.9464 17.6957 22 15.1522 22 12.5C22 11.1868 21.7413 9.88642 21.2388 8.67317C20.7362 7.45991 19.9997 6.35752 19.0711 5.42893C18.1425 4.50035 17.0401 3.76375 15.8268 3.2612C14.6136 2.75866 13.3132 2.5 12 2.5ZM11 17.5H13V11.5H11V17.5Z" fill="currentColor" />
            </svg>
            Selengkapnya
          </button>
          <span className="border border-gray-300 px-3 py-2 rounded-full text-xs sm:text-sm bg-black/30 backdrop-blur-sm">18+</span>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Hero;
