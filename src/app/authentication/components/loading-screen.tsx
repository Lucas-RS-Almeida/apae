export function LoadingScreen() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-full max-w-[200px] h-screen max-h-[200px] relative">
          <img
            src="/images/bloom.png"
            alt="APAE Icon"
            loading="lazy"
            className="max-w-[100px] absolute top-0 left-[52px] spinAnimation"
          />
          <img
            src="/images/petal.png"
            alt="APAE Icon"
            loading="lazy"
            className="max-w-[160px] absolute bottom-24 left-5 hiddenAnimation"
          />
          <img
            src="/images/hands.png"
            alt="APAE Icon"
            loading="lazy"
            className="max-w-[200px] absolute bottom-0"
          />
        </div>

        <span className="text-2xl text-center">Carregando dados, por favor aguarde!</span>
      </div>
    </div>
  )
}
