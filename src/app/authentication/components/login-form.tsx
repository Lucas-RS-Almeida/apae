import { redirect } from "next/navigation";

interface ILoginFormProps {
  $onToggleOptionAuthentication: (option: "login" | "signup") => void;
}

export function LoginFormComponent({
  $onToggleOptionAuthentication,
}: ILoginFormProps) {
  function handleTogglePage(path: string) {
    redirect(path);
  }

  return (
    <>
      <form className="w-full">
        <div>
          <input
            placeholder="E-mail"
            className="w-full h-10 !px-4 border border-[#ccc] rounded-md bg-transparent"
          />
        </div>
        <div className="!mt-4">
          <input
            type="password"
            placeholder="Senha"
            className="w-full h-10 !px-4 border border-[#ccc] rounded-md bg-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full h-10 !mt-6 rounded-md uppercase transition-all duration-200 ease-in bg-[#048ce1] text-white hover:bg-[#006db0]"
        >
          Entrar
        </button>
      </form>

      <footer className="flex items-center flex-col gap-2">
        <button
          onClick={() => $onToggleOptionAuthentication("signup")}
          className="bg-transparent"
        >
          <span>Não tem conta? Cadastrar</span>
        </button>
        <button
          onClick={() => handleTogglePage("/users/forgot-password")}
          className="bg-transparent"
        >
          <span>Esqueci minha senha</span>
        </button>
      </footer>
    </>
  );
}
