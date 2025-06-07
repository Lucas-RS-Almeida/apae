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
      <form>
        <div className="form_group">
          <input placeholder="E-mail" />
        </div>
        <div className="form_group">
          <input type="password" placeholder="Senha" />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <footer>
        <button onClick={() => $onToggleOptionAuthentication("signup")}>
          <span>Não tem conta? Cadastrar</span>
        </button>
        <button onClick={() => handleTogglePage("/users/forgot-password")}>
          <span>Esqueci minha senha</span>
        </button>
      </footer>
    </>
  );
}
