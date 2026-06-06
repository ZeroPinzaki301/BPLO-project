import React, { forwardRef } from "react";

// Import all assets at the top (keeping as is)
import BanabanLogo from '../assets/brgyLogo/LogoBanaban.png';
import BaybayLogo from '../assets/brgyLogo/LogoBaybay.png';
import BinagbagLogo from '../assets/brgyLogo/LogoBinagbag.png';
import DonacionLogo from '../assets/brgyLogo/LogoDonacion.png';
import EncantoLogo from '../assets/brgyLogo/LogoEncanto.png';
import MarungkoLogo from '../assets/brgyLogo/LogoMarungko.png';
import LaogLogo from '../assets/brgyLogo/LogoLaog.png';
import NiuganLogo from '../assets/brgyLogo/LogoNiugan.png';
import PaltokLogo from '../assets/brgyLogo/LogoPaltok.png';
import PulongYantokLogo from '../assets/brgyLogo/LogoPY.png';
import SanRoqueLogo from '../assets/brgyLogo/LogoSanRoque.png';
import SantaLucaiLogo from '../assets/brgyLogo/LogoStaLucia.png';
import SantaCruzLogo from '../assets/brgyLogo/LogoStaCruz.png';
import SantoCristoLogo from '../assets/brgyLogo/LogoStoCristo.png';
import SuluanLogo from '../assets/brgyLogo/LogoSulucan.png';
import TabocLogo from '../assets/brgyLogo/LogoTaboc.png';

import CapSignBanaban from '../assets/CapSigns/CapSignBan.png';
import CapSignBaybay from '../assets/CapSigns/CapSignBay.png';
import CapSignBinagbag from '../assets/CapSigns/CapSignBin.png';
import CapSignDonacion from '../assets/CapSigns/CapSignDncn.png';
import CapSignEncanto from '../assets/CapSigns/CapSignEnc.png';
import CapSignMarungko from '../assets/CapSigns/CapSignMar.png';
import CapSignLaog from '../assets/CapSigns/CapSignLao.png';
import CapSignNiugan from '../assets/CapSigns/CapSignNiu.png';
import CapSignPulongYantok from '../assets/CapSigns/CapSignPul.png';
import CapSignPaltok from '../assets/CapSigns/CapSignPal.png';
import CapSignSanRoque from '../assets/CapSigns/CapSignSanR.png';
import CapSignSantaCruz from '../assets/CapSigns/CapSignStaC.png';
import CapSignSantaLucia from '../assets/CapSigns/CapSignStaL.png';
import CapSignSantoCristo from '../assets/CapSigns/CapSignStoC.png';
import CapSignSulucan from '../assets/CapSigns/CapSignSul.png';
import CapSignTaboc from '../assets/CapSigns/CapSignTbc.png';

import BanabanHeader from '../assets/Headers/BrgyCertHeader-Ban.png';
import BaybayHeader from '../assets/Headers/BrgyCertHeader-Bay.png';
import BinagbagHeader from '../assets/Headers/BrgyCertHeader-Bin.png';
import DonacionHeader from '../assets/Headers/BrgyCertHeader-Don.png';
import EncantoHeader from '../assets/Headers/BrgyCertHeader-Enc.png';
import LaogHeader from '../assets/Headers/BrgyCertHeader-Lao.png';
import MarungkoHeader from '../assets/Headers/BrgyCertHeader-Mar.png';
import NiuganHeader from '../assets/Headers/BrgyCertHeader-Niu.png';
import PaltokHeader from '../assets/Headers/BrgyCertHeader-Pal.png';
import PulongYantokHeader from '../assets/Headers/BrgyCertHeader-Pul.png';
import SantoCristoHeader from '../assets/Headers/BrgyCertHeader-Scr.png';
import SulucanHeader from '../assets/Headers/BrgyCertHeader-Slu.png';
import SanRoqueHeader from '../assets/Headers/BrgyCertHeader-Srq.png';
import SantaCruzHeader from '../assets/Headers/BrgyCertHeader-StC.png';
import SulHeader from '../assets/Headers/BrgyCertHeader-Sul.png';
import TabocHeader from '../assets/Headers/BrgyCertHeader-Tab.png';

function getDayWithSuffix(day) {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

const barangayAssets = {
  Banaban: {
    logo: BanabanLogo,
    header: BanabanHeader,
    capsign: CapSignBanaban,
    brgyName: "BARANGAY BANABAN",
    captainName: "HON. FERNANDO P. DELA TORRE",
    email: "banaban@angat.gov.ph",
    phone: "0999-###-1111"
  },
  Baybay: {
    logo: BaybayLogo,
    header: BaybayHeader,
    capsign: CapSignBaybay,
    brgyName: "BARANGAY BAYBAY",
    captainName: "HON. JOSE RICKY A. DELOS SANTOS",
    email: "baybay@angat.gov.ph",
    phone: "0999-###-2222"
  },
  Binagbag: {
    logo: BinagbagLogo,
    header: BinagbagHeader,
    capsign: CapSignBinagbag,
    brgyName: "BARANGAY BINAGBAG",
    captainName: "HON. CHRISTOPHER F. VILLARAMA",
    email: "binagbag@angat.gov.ph",
    phone: "0999-###-3333"
  },
  Donacion: {
    logo: DonacionLogo,
    header: DonacionHeader,
    capsign: CapSignDonacion,
    brgyName: "BARANGAY DONACION",
    captainName: "HON. JESSIE SP. CALDERON",
    email: "donacion@angat.gov.ph",
    phone: "0999-###-4444"
  },
  Encanto: {
    logo: EncantoLogo,
    header: EncantoHeader,
    capsign: CapSignEncanto,
    brgyName: "BARANGAY ENCANTO",
    captainName: "HON. CRISOSTOMO S. GARCIA",
    email: "encanto@angat.gov.ph",
    phone: "0999-###-5555"
  },
  Laog: {
    logo: LaogLogo,
    header: LaogHeader,
    capsign: CapSignLaog,
    brgyName: "BARANGAY LAOG",
    captainName: "HON. PATERNO B. MANAYAO JR.",
    email: "laog@angat.gov.ph",
    phone: "0999-###-6666"
  },
  Marungko: {
    logo: MarungkoLogo,
    header: MarungkoHeader,
    capsign: CapSignMarungko,
    brgyName: "BARANGAY MARUNGKO",
    captainName: "HON. DORIS DG. RAMOS",
    email: "marungko@angat.gov.ph",
    phone: "0999-###-7777"
  },
  Niugan: {
    logo: NiuganLogo,
    header: NiuganHeader,
    capsign: CapSignNiugan,
    brgyName: "BARANGAY NIUGAN",
    captainName: "HON. ROBERTO L. MAXIMO",
    email: "niugan@angat.gov.ph",
    phone: "0999-###-8888"
  },
  Paltok: {
    logo: PaltokLogo,
    header: PaltokHeader,
    capsign: CapSignPaltok,
    brgyName: "BARANGAY PALTOK",
    captainName: "HON. VILLAMOR R. LAZARO JR.",
    email: "paltok@angat.gov.ph",
    phone: "0999-###-9999"
  },
  "Pulong Yantok": {
    logo: PulongYantokLogo,
    header: PulongYantokHeader,
    capsign: CapSignPulongYantok,
    brgyName: "BARANGAY PULONG YANTOK",
    captainName: "HON. RENATO C. SAN PEDRO",
    email: "pulongyantok@angat.gov.ph",
    phone: "0999-###-0000"
  },
  "San Roque": {
    logo: SanRoqueLogo,
    header: SanRoqueHeader,
    capsign: CapSignSanRoque,
    brgyName: "BARANGAY SAN ROQUE",
    captainName: "HON. NERIO S. VALDESCO",
    email: "sanroque@angat.gov.ph",
    phone: "0999-###-1234"
  },
  "Santa Cruz": {
    logo: SantaCruzLogo,
    header: SantaCruzHeader,
    capsign: CapSignSantaCruz,
    brgyName: "BARANGAY SANTA CRUZ",
    captainName: "HON. MILLIE DV. CRUZ",
    email: "santacruz@angat.gov.ph",
    phone: "0999-###-2345"
  },
  "Sta Lucia": {
    logo: SantaLucaiLogo,
    header: SulHeader,
    capsign: CapSignSantaLucia,
    brgyName: "BARANGAY SANTA LUCIA",
    captainName: "HON. ALEXANDER M. TIGAS",
    email: "santalucia@angat.gov.ph",
    phone: "0999-###-3456"
  },
  "Sto Cristo": {
    logo: SantoCristoLogo,
    header: SantoCristoHeader,
    capsign: CapSignSantoCristo,
    brgyName: "BARANGAY SANTO CRISTO",
    captainName: "HON. ERNESTO B. SARMIENTO",
    email: "santocristo@angat.gov.ph",
    phone: "0999-###-4567"
  },
  Sulucan: {
    logo: SuluanLogo,
    header: SulucanHeader,
    capsign: CapSignSulucan,
    brgyName: "BARANGAY SULUCAN",
    captainName: "HON. RICHARD C. CRUZ",
    email: "sulucan@angat.gov.ph",
    phone: "0999-###-5678"
  },
  Taboc: {
    logo: TabocLogo,
    header: TabocHeader,
    capsign: CapSignTaboc,
    brgyName: "BARANGAY TABOC",
    captainName: "HON. EDSEL R. LOPEZ",
    email: "taboc@angat.gov.ph",
    phone: "0999-###-6789"
  }
};

const BrgyCertificateTemplate = forwardRef(
  ({ 
    ownerName, 
    businessName, 
    orNumber, 
    date, 
    businessType, 
    status, 
    ctcNumber,
    barangay
  }, ref) => {
    
    const d = date ? new Date(date) : null;
    const dayWithSuffix = d ? getDayWithSuffix(d.getDate()) : "Day";
    const monthYear = d
      ? d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "Month, Year";

    
    const assets = barangayAssets[barangay] || {
      logo: PaltokLogo,
      header: PaltokHeader,
      capsign: CapSignNiugan,
      brgyName: barangay ? `BARANGAY ${barangay.toUpperCase()}` : "BARANGAY PALTOK",
      captainName: "PUNONG BARANGAY",
      email: "sample@sample.com",
      phone: "0999-###-1234"
    };

    return (
      <div
        ref={ref}
        className="
          certificate bg-cover
          w-[8.5in] h-[11in] 
          mx-auto
          border-1 border-[#bbc7ad]
          relative"
        style={{
          fontFamily: "Century Gothic, serif",
        }}
      >
        {/* Header with dynamic background */}
        <div 
          className="w-[97%] mr-[1.1em] h-[10em] mx-auto flex grid grid-cols-[2fr_4.5fr_3.5fr] bg-center bg-cover"
          style={{
            backgroundImage: `url(${assets.header})`,
          }}
        >
          {/* Logo */}
          <div 
            className="h-[6.45em] w-[6.45em] ml-[5.237em] mt-[1.65em] bg-cover"
            style={{
              backgroundImage: `url(${assets.logo})`,
            }}
          >
          </div>
          
          {/* Barangay Information */}
          <div className="">
            <div 
              className="flex flex-col mt-[1.4em] text-center text-white font-bold"
              style={{
                fontFamily: "Century Gothic, serif",
              }}
            >
              <span className="text-[1.15em]">Republic of The Philippines</span>
              <span className="text-[1em]">Province of Bulacan</span>
              <span className="text-[1.25em]">Municipality of Angat</span>
              <span className="text-[1.45em]">
                {assets.brgyName}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-[1em]">
          <h1 className="text-[2em] font-bold">
            BARANGAY BUSINESS CLEARANCE
          </h1>

          <hr className="h-[.1em] text-sky-800 bg-sky-800 mx-[4em] mb-[.2em]"/>

          <p className="italic text-blue-900 text-[1.1em] font-bold">Is hereby granted to</p>

          <h2 className="text-[1.3em] font-bold mb-1">
            {businessName || "Business Name Here"}
            <p className="text-[.85em] font-light italic text-blue-900 text-[.5em]">(Business Name)</p>
          </h2>

          <h2 className="text-[1.4em] font-bold mb-1">
            {barangay ? `${barangay.toUpperCase()}, ANGAT, BULACAN` : "PALTOK, ANGAT, BULACAN"}
            <p className="text-[.85em] font-light italic text-blue-900 text-[.5em]">(Location of Business)</p>
          </h2>

          <h2 className="text-[1.35em] font-bold mb-1">
            {ownerName || "Owner's Name Here"}
            <p className="text-[.85em] font-light italic text-blue-900 text-[.5em]">(President/Owner)</p>
          </h2>

          <h2 className="text-[1.35em] font-bold mb-1">
            {businessType || "Nature of Business"}
            <p className="text-[.85em] font-light italic text-blue-900 text-[.5em]">(Nature of Business)</p>
          </h2>
        </div>

        <hr className="h-[.1em] text-sky-800 bg-sky-800 mx-[4em] mt-[1em]"/>
        
        <div className="px-[2.5em] text-center w-[30em] mx-auto flex place-content-between bg-linear-to-r mx-3 mb-3 mt-[1em]">
          <div className="font-bold flex flex-col my-auto flex gap-[.5em]">
            <div className="italic">OR NUMBER : <span className="font-bold not-italic tracking-widest underline">{orNumber || "_________"}</span></div>
            <div className="italic">CTC NUMBER : <span className="font-bold not-italic tracking-widest underline">{ctcNumber || "_________"}</span></div>
          </div>

          <div className="font-bold flex flex-col my-auto flex gap-[.5em]">
            <p>NEW: [{status && status.toUpperCase() === "NEW" ? " x " : "__"}]</p>
            <p>RENEWAL: [{status && status.toUpperCase() === "RENEWAL" ? " x " : "__"}]</p>
          </div>
          
        </div>
        
        <hr className="h-[.15em] text-sky-800 bg-sky-800 mx-[4em] mt-[1em]"/>
        
        <div className="mt-[.35em] text-justify text-[.9em] w-[93%] mx-auto px-[3.25em] italic text-blue-900">
          <p className="indent-[3em] ">
            Proposed to be established in this Barangay 
            has applied for a Barangay Business Clearance 
            to be used in securing a corresponding Mayor's Permit
            has been found to be in conformity with the provisions of 
            existing Barangay Ordinances, rules and regulations being enforced
            in this Barangay.
          </p>

          <p className="indent-[3em] mb-[.75em]">
            In view of the foregoing, the undersigned interposes 
            no objections for the issuance of the corresponding Mayor's Permit 
            being applied for.
          </p>

          <p className="indent-[3em] mb-[.75em]">
            This Permit shall be valid until December 31, 2026 and can be
            cancelled revoked anytime the establishment is found to have violated
            any law or ordinance within this barangay.
          </p>

          <p className="indent-[3em]">
            Issued on
            <span className="font-bold"> {dayWithSuffix} </span> 
            of 
            <span className="font-bold"> {monthYear} </span>  
            at the Municipality of Angat Bulacan.
          </p>
        </div>
        
        {/* Captain Signature - Dynamic */}
        <div 
          className="flex bg-cover mt-[2em] bg-center flex-col h-[6em] absolute right-0 leading-tight mr-[9em]"
          style={{
            backgroundImage: `url(${assets.capsign})`,
          }}
        >
            <span className="underline text-center font-bold text-[1.2em] mt-[3.25em]">
              {assets.captainName}
            </span>
            <span className="italic text-center text-[.9em] tracking-wider">PUNONG BARANGAY</span>
        </div>
        
        <hr className="h-[.15em] text-sky-800 bg-sky-800 mx-[4em] mt-[11em] "/>
        
        {/* Footer - Dynamic contact info */}
        <div className="w-[80%] mx-auto mt-[.2em]">
          <div className="flex place-content-between">
            <p className="text-center">{assets.email}</p>
            <div className="w-[.15em] bg-black mx-[1em]"></div>
            <span>{assets.phone}</span>
            <div className="w-[.14em] bg-black mx-[1em]"></div>
            <span>Municipality of Angat Bulacan</span>  
          </div>
        </div>
        
      </div>
    );
  }
);

export default BrgyCertificateTemplate;