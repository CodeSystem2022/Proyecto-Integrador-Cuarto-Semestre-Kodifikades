import Hero from '@/app/components/hero/Hero'
import AnuncioImg from "@/app/assets/barril.jpg"
import AnuncioImg2 from "@/app/assets/mano.jpg"
import AnuncioImg3 from "@/app/assets/vasos.jpg"
import AnuncioImg4 from "@/app/assets/vasos2.jpg"
import Image from 'next/image'
export default function Home() {
  return (
    <>
      <Hero />
      <section>
        <div className="flex items-center justify-center container mx-auto mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">

            <div className="card bg-base-100 shadow-xl mx-4">
              <div className="p-5 flex-col">
                <div className="rounded-xl overflox-hidden">
                  <Image src={AnuncioImg} alt="Anuncio" className="" />
                </div>
                <p className="text-2xl md:text-3xl font-medium mt-3">
                  Sabores únicos.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl mx-4">
              <div className="p-5 flex-col">
                <div className="rounded-xl overflox-hidden">
                  <Image src={AnuncioImg2} alt="Anuncio" className="w-full h-full" />
                </div>
                <p className="text-2xl md:text-3xl font-medium mt-3">
                  Calidad artesanal.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl mx-4">
              <div className="p-5 flex-col">
                <div className="rounded-xl overflox-hidden">
                  <Image src={AnuncioImg3} alt="Anuncio" className="w-full h-full" />
                </div>
                <p className="text-2xl md:text-3xl font-medium mt-3">
                  Aromas intensos.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl mx-4">
              <div className="p-5 flex-col">
                <div className="rounded-xl overflox-hidden">
                  <Image src={AnuncioImg4} alt="Anuncio" className="w-full h-full" />
                </div>
                <p className="text-2xl md:text-3xl font-medium mt-3">
                  Tradición moderna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>)
}
