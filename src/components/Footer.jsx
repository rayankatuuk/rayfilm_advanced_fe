import { useState } from 'react';

const Footer = () => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const genreColumns = [
    ['Aksi', 'Anak-anak', 'Anime', 'Britania'],
    ['Drama', 'Fantasi Ilmiah & Fantasi', 'Kejahatan', 'KDrama'],
    ['Komedi', 'Petualangan', 'Perang', 'Romantis'],
    ['Sains & Alam', 'Thriller']
  ];

  const helpItems = ['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan'];

  return (
    <>
      <div className="border-t border-gray-600 my-10"></div>

      {/* Footer untuk tampilan full screen */}
      <footer className="hidden sm:flex bg-primary text-gray-400 py-6 px-4 mx-10 sm:py-10 sm:px-10 mt-10 flex-row items-start gap-10 sm:gap-20">        {/* Logo dan copyright */}        <div className="flex items-start self-center flex-col">
          <img src="/assets/icon/Logo.svg" alt="CHILL" />
          <p>@2025 Rayfilm All Rights Reserved.</p>
        </div>

        {/* Kolom-kolom footer */}
        <div className="flex flex-1 justify-center sm:gap-40">
          <div className="flex flex-col">
            {/* Kolom Genre */}
            <h4 className="text-white font-semibold mb-3">Genre</h4>            
            <ul className="space-y-1">
              {genreColumns[0].map((genre, index) => (
                <li key={index}><button className="hover:text-white">{genre}</button></li>
              ))}
            </ul>
          </div>
          
          {genreColumns.slice(1).map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col">
              <div className="mb-9"></div>              <ul className="space-y-1">
                {column.map((genre, index) => (
                  <li key={index}><button className="hover:text-white">{genre}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Kolom Bantuan */}
        <div className="flex flex-col justify-end">
          <h4 className="text-white font-semibold mb-3">Bantuan</h4>          <ul className="space-y-1">
            {helpItems.map((item, index) => (
              <li key={index}><button className="hover:text-white">{item}</button></li>
            ))}
          </ul>
        </div>
      </footer>

      {/* Footer untuk tampilan mobile */}
      <footer className="sm:hidden bg-primary text-gray-400 pb-6">        {/* Logo dan copyright */}        <div className="flex items-start self-center flex-col px-4 mb-10">
          <img src="/assets/icon/Logo.svg" alt="CHILL" />
          <p className="">@2025 Rayfilm All Rights Reserved.</p>
        </div>

        <div className="flex items-center justify-between px-4 mb-2 text-gray-200">
          <p>Genre</p>
          <button onClick={() => setIsGenreOpen(!isGenreOpen)}>
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.589844 11.33L5.16984 6.75L0.589844 2.16L1.99984 0.75L7.99984 6.75L1.99984 12.75L0.589844 11.33Z" fill="white"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between px-4 mb-10 text-gray-200">
          <p>Bantuan</p>
          <button onClick={() => setIsHelpOpen(!isHelpOpen)}>
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.589844 11.33L5.16984 6.75L0.589844 2.16L1.99984 0.75L7.99984 6.75L1.99984 12.75L0.589844 11.33Z" fill="white"/>
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
