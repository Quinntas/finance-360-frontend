import Container from './container'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h4 className=" font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
          Prepare-se para uma jornada de conhecimento financeiro abrangente. Junte-se a nós no Finanças 360 e comece a trilhar o caminho para o sucesso financeiro hoje mesmo!
          </h4>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href=""
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Se inscreva na newsletter
            </a>
            <a
              href={``}
              className="mx-3 font-bold hover:underline"
            >
              Veja o projeto no GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
