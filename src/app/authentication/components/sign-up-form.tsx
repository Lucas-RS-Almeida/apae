import { redirect } from "next/navigation";

interface ISignUpFormProps {
  $onToggleOptionAuthentication: (option: "login" | "signup") => void;
}

export function SignUpFormComponent({
  $onToggleOptionAuthentication,
}: ISignUpFormProps) {
  return (
    <>
      <form className="w-full boomAnimation">
        <div>
          <input
            placeholder="Nome de Usuário"
            className="w-full h-10 !px-4 border border-[#ccc] rounded-md bg-transparent"
          />
        </div>
        <div className="!mt-4">
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
          Registrar
        </button>
      </form>

      <footer className="flex items-center flex-col gap-2">
        <button
          onClick={() => $onToggleOptionAuthentication("login")}
          className="bg-transparent"
        >
          <span>Já tem conta? Entrar</span>
        </button>
      </footer>
    </>
  );
}
