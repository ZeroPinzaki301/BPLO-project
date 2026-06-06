  import { Link } from 'react-router-dom';
import LogoBanaban from '../assets/logo/LogoBanaban.png';
import LogoBaybay from '../assets/logo/LogoBaybay.png';
import LogoBinagbag from '../assets/logo/LogoBinagbag.png';
import LogoDonacion from '../assets/logo/LogoDonacion.png';
import LogoEncanto from '../assets/logo/LogoEncancto.png';
import LogoLaog from '../assets/logo/LogoLaog.png';
import LogoMarungko from '../assets/logo/LogoMarungko.png';
import LogoNiugan from '../assets/logo/LogoNiugan.png';
import LogoPaltok from '../assets/logo/LogoPaltok.png';
import LogoPY from '../assets/logo/LogoPY.png';
import LogoSanRoque from '../assets/logo/LogoSanRoque.png';
import LogoStaCruz from '../assets/logo/LogoStaCruz.png';
import LogoStaLucia from '../assets/logo/LogoStaLucia.png';
import LogoStoCristo from '../assets/logo/LogoStoCristo.png';
import LogoSulucan from '../assets/logo/LogoSulucan.png';
import LogoTaboc from '../assets/logo/LogoTaboc.png';

import CreateBG from '../assets/images/CreateBG.png';
import SearchBG from '../assets/images/SearchBG.png';
import AngatMuniBG from '../assets/images/AngatMuniBG.jpg';

import BarangayCard from '../components/BarangayCard';

const HomePage = () => {
  return (
    <div 
      className='w-[100%] min-h-[90em] bg-cover bg-center'
      style={{
        backgroundImage: `url(${AngatMuniBG})`,
      }}
    >
      <div className='bg-linear-to-r from-yellow-200/75 via-stone-300/50 to-blue-400/75 w-[100%] min-h-[90em] px-[2em]'>

        <h2 className='text-center text-[4em] font-bold tracking-widest '>
          <span className='text-blue-700 text-shadow-lg'> BPLO </span>
          <span className='text-white text-shadow-lg'> Barangay </span>
          <span className='text-yellow-300 text-shadow-lg'> Certification </span>
        </h2>
        <h3 className='text-[2.5em] text-center tracking-widest text-indigo-950'>MUNICIPALITY OF ANGAT BULACAN</h3>

        <div className='h-[42em] gap-[1em]'>

          <div className='gap-[1em]'>

            {/* CREATE card */}
            <div className='bg-stone-950/25 rounded-[.25em] grid grid-cols-[3fr_7fr] mb-[1em] overflow-hidden'>
              
              <div className='mx-auto my-auto'>
                <Link
                  to="/create"
                  className='
                    transition-all duration-500
                    hover:text-green-600 hover:tracking-[.35em]
                    rounded-tr-sm rounded-bl-sm 
                    text-center cursor-pointer
                    text-green-800 e font-light
                    px-[1em] tracking-[.25em] 
                    text-[clamp(3em,4em,5em)]
                    '
                >
                  CREATE
                </Link>
              </div>
              <div 
                className='bg-cover bg-center text-[2.5em] indent-[.25em] min-h-[10em] text-white text-justify'
                style={{
                  backgroundImage: `url(${CreateBG})`,
                }}
              >
                <div className='w-[100%] h-[100%] bg-linear-to-r flex items-center from-stone-950/75 to-stone-400/50 p-[1em]'>
                  Start a new document and populate it with Business Data...
                </div>
              </div>

            </div>

            {/* FIND card */}
            <div className='bg-stone-950/25 rounded-[.25em] grid grid-cols-[7fr_3fr] mb-[1em]'>

              <div 
                className='bg-cover bg-center text-[2.5em] indent-[.25em] min-h-[10em] text-white text-justify'
                style={{
                  backgroundImage: `url(${SearchBG})`,
                }}
              >
                <div className='w-[100%] flex items-center h-[100%] bg-linear-to-l from-stone-950/75 to-stone-400/50 p-[1em]'>
                  Find an existing document to open, modify, or delete...
                </div>
              </div>
              <div className='my-auto mx-auto'>
                <Link
                  to="/find"
                  className='
                    transition-all duration-500
                    hover:text-amber-600 hover:tracking-[.35em] 
                    rounded-tr-sm rounded-bl-sm text-center cursor-pointer
                    text-amber-800 tracking-[.25em]
                    text-[clamp(3em,4em,5em)] px-[1em]
                    '
                >
                  SEARCH
                </Link>
              </div>
              
            </div>

          </div>


          <h3 className='text-center text-[2em] font-bold tracking-[.25em] text-white'>All Barangays in Angat</h3>
          <div 
            className='
              grid grid-rows-[5fr_5fr] 
              grid-cols-[1.25fr_1.25fr_1.25fr_1.25fr_1.25fr_1.25fr_1.25fr_1.25fr] 
              mt-[1em] gap-[.25em] py-[1em]
              
            '
          >
            
            <BarangayCard logo={LogoBanaban} label="BANABAN" />

            <BarangayCard logo={LogoBaybay} label="BAYBAY" />
            
            <BarangayCard logo={LogoBinagbag} label="BINAGBAG" />
            
            <BarangayCard logo={LogoDonacion} label="DONACION" />
            
            <BarangayCard logo={LogoEncanto} label="ENCANTO" />

            <BarangayCard logo={LogoLaog} label="LAOG" />

            <BarangayCard logo={LogoMarungko} label="MARUNGKO" />

            <BarangayCard logo={LogoNiugan} label="NIUGAN" />

            <BarangayCard logo={LogoPaltok} label="PALTOK" />

            <BarangayCard logo={LogoPY} label="PULONG YANTOK" />

            <BarangayCard logo={LogoSanRoque} label="SAN ROQUE" />

            <BarangayCard logo={LogoStaCruz} label="SANTA CRUZ" />

            <BarangayCard logo={LogoStaLucia} label="SANTA LUCIA" />

            <BarangayCard logo={LogoStoCristo} label="SANTO CRISTO" />

            <BarangayCard logo={LogoSulucan} label="SULUCAN" />

            <BarangayCard logo={LogoTaboc} label="TABOC" />

          </div>  


        </div>
      </div>
    </div>
  )
}

export default HomePage