import logo from '@/app/assets/kodifikades_animated.gif';
import logo2 from '@/app/assets/craf_beer_animated.gif';
import Image from 'next/image'

export default function KodifikadesCard() {
  return (
    <>
      <section>
        <div className="flex items-center justify-center container mx-auto mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-16">
            <div className="bg-transparent">
              <div className="p-5 flex-col">
                <div className="rounded-xl overflox-hidden">
                  <Image src={logo} alt="Anuncio" className="" />
                </div>

              </div>
            </div>

            <div className="bg-transparent">
              <div className="p-5 flex-col">
                <div className="rounded-xl overflox-hidden">

                </div>
                <p className="text-2xl md:text-3xl font-medium mt-3 text-left pl-8">
                  ⭐ Integrantes: <br />
                  <br />
                  ✅ Miguel A. Bru Melis <br />
                  ✅ Eduardo Bru Melis<br />
                  ✅ Lucas Ruiz<br />
                  ✅ Juan Cruz Reche<br />
                  ✅ Nicolás Ortiz<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-center container mx-auto mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-16">
          <div className="bg-transparent">
              <div className="p-5 flex-col">
                <div className="rounded-xl overflox-hidden">

                </div>
                <p className="text-2xl md:text-3xl font-medium mt-3 text-left">
                Craft-Beer es una plataforma en línea especializada en la venta de cervezas artesanales cuidadosamente seleccionadas. Nos dedicamos a proporcionar a nuestros clientes una experiencia de compra única, ofreciendo productos que son difíciles de encontrar en otros lugares. En Craft-Beer, nos enorgullecemos de ofrecer una cuidada selección de cervezas artesanales que satisfacen los paladares más exigentes.
                </p>
              </div>
            </div>
            <div className="bg-transparent">
              <div className="p-5 flex-col">
                <div className="rounded-xl overflox-hidden">
                  <Image src={logo2} alt="Anuncio" className="" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>)
}
