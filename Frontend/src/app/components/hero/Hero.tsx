import Image from 'next/image'
import heroImg from '@/app/assets/hero.jpg'

export default function Hero(){
  return (
    <section className="hero min-h-screen bg-base-200">
      <Image src={heroImg} alt='Hero' className="w-full h-full" />
      <div className="flex-col lg:flex-row-reverse">
        <div>
          <h1 className="text-5xl font-bold  text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">Bienvenido a Craft-Beer.</h1>
        </div>
      </div>
    </section>

  )
}