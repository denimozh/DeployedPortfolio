"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import Projects from "@/components/Projects"
import Header from "@/components/Header"
import Preloader from "@/components/Preloader"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Cursor from "@/components/Cursor/Cursor";
import { AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import Hero from "@/components/Hero";


export default function Home() {

  const [isLoading, setIsloading] = useState(true);
  const paragraph1 = "Hi I'm Denis : A FrontEnd Developer. My TechStack Includes : NextJS, Typescript, React, TailwindCSS. I also know how to expertly use Docker and Github."

  const path = useRef(null);
  let progress = 0;
  let time = Math.PI / 2;
  let reqId = null;
  let x = 0.5;
  const projects = [
    {
      title1: "Ramen",
      title2: "Dev",
      src: "ramendev.png",
      route: "https://github.com/denimozh/DeliveryDev"
    },
    {
      title1: "Book",
      title2: "Dev",
      src: "bookdev.png",
      route: "https://github.com/denimozh/bookdev"
    },
    {
      title1: "NFT",
      title2: "Dev",
      src: "nftdev.png",
      route: "https://github.com/denimozh/nftdev"
    },
    {
      title1: "Pick A",
      title2: "Car",
      src: "cardev.png",
      route: "https://github.com/denimozh/cardev"
    },
    {
      title1: "Dev",
      title2: "Tube",
      src: "devtube.png",
      route: "https://github.com/denimozh/devtube"
    }
  ]

  useEffect( () => {
    (
      async () => {
        setTimeout( () => {
          setIsloading(false);
        }, 1400)
      }
    )()
    setPath(progress);
  }, [])  

  const setPath = (progress) => {
    const { innerWidth } = window;
    const width = innerWidth;
    path.current.setAttributeNS("", "d", `M0 50 Q${width * x} ${50 + progress}, ${width} 50`)
  }

  const manageMouseEnter = () => {
    if(reqId){
      window.cancelAnimationFrame(reqId);
      resetAnimation();
    }
  }

  const manageMouseMove = (e) => {
    const { movementY, clientX } = e;
    const { left, width } = path.current.getBoundingClientRect();
    x = (clientX - left) / width;
    progress += movementY;
    setPath(progress)
  }

  const manageMouseLeave = () => {
    animateOut();
  }

  const lerp = (x, y, a) => x * (1 - a) + y * a

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.01);
    if(Math.abs(progress) > 0.75){
      reqId = window.requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  }

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {
          isLoading && <Preloader/>
        }
      </AnimatePresence>
      <Header/>
      <Cursor/>
      <Hero/>
      <div style={{height:"30vh"}}></div>
      <About value={paragraph1}/>
      <div className={styles.line}>
        <div onMouseEnter={manageMouseEnter} onMouseMove={manageMouseMove} onMouseLeave={manageMouseLeave} className={styles.box}></div>
          <svg>
            <path ref={path}></path>
          </svg>
      </div>
      <div style={{height:"35vh"}}></div>
      <div className={styles.mainDiv}>
        <div className={styles.marqueeDiv}>
          <Marquee className={styles.mainText} speed={200}>
            <p>Featured Projects-</p>
            <p>Featured Projects-</p>
          </Marquee>
        </div>
        <div className={styles.gallery}>
            {
              projects.map( project => {
                return <Projects project={project} key={project}/>
              })
            }
        </div>
      </div>
      <div style={{height:"35vh"}}></div>
      <Contact/>
    </main>
  );
}
