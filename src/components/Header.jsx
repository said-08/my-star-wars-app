import { Link, useLocation } from "react-router-dom";
import c3po  from "../assets/JD-34-512.webp"
import { useEffect, useState } from "react";
import { HambugerMenu } from "./HamburgerMenu";

const navigation = [
  {
    id: 1,
    url: "/mi-album",
    title: "Mi Álbum"
  },
  {
    id: 2,
    url: "/obtener-lamina",
    title: "Obtener Laminas"
  }
]

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(true)

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);

    } else {
      setOpenNavigation(true);
    }
  };

  const handleClick = () => {
    // if (!openNavigation) return;

    setOpenNavigation(false);
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
      openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
    }`}>
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[14rem] xl:mr-8 flex items-center">
          <img src={c3po} width={60} height={60} alt="c3po"/>
          <span className="font-bold text-xl">MY STAR WARS</span>
        </a>

        <nav className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:ml-auto lg:bg-transparent`}>
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.url}
              onClick={handleClick}
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.pathname ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-color-1 xl:px-12`}
            >
              {item.title}
            </Link>
            ))}
          </div>
            <HambugerMenu/>
        </nav>
        
          <button onClick={toggleNavigation} className="ml-auto lg:hidden relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {openNavigation === false ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            }
          </span>
          </button>

      </div>
    </div>
  )
}

export default Header