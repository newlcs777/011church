export default function AuthHeroLayout({ children }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* FUNDO COM IMAGEM (AQUI ESTÁ A IMAGEM) */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          scale-105
        "
        style={{
          backgroundImage: "url('/images/011-hero.png')", // 👈 IMAGEM
        }}
      />

      {/* OVERLAY (SÓ CLAREADO, IMAGEM CONTINUA ATRÁS) */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/60
          via-black/50
          to-black/70
        "
      />

      {/* CONTEÚDO */}
      <div
        className="
          relative
          min-h-screen
          flex
          flex-col
          lg:grid
          lg:grid-cols-2
          items-center
          justify-center
          gap-14
          px-6
          lg:px-20
        "
      >
        {/* BRANDING */}
        <div
          className="
            text-center
            lg:text-left
            max-w-lg
            lg:ml-24
          "
        >
          <h1
            className="
              text-5xl
              lg:text-6xl
              font-extrabold
              tracking-tight
              text-white
              mb-4
            "
          >
            011 Church
          </h1>

          <p
            className="
              text-xl
              text-white/85
              tracking-wide
              mb-4
            "
          >
            Uma família para a cidade
          </p>

          <p
            className="
              text-base
              text-white/70
              leading-relaxed
            "
          >
            Uma igreja viva, simples e centrada em Jesus.
            <br />
            Pessoas comuns, vivendo um propósito eterno.
          </p>
        </div>

        {/* LOGIN */}
        <div
          className="
            w-full
            flex
            justify-center
            lg:justify-start
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
