import { redirect } from "next/navigation";

interface ISignUpFormProps {
  $onToggleOptionAuthentication: (option: "login" | "signup") => void;
}

export function SignUpFormComponent({
  $onToggleOptionAuthentication,
}: ISignUpFormProps) {
  return (
    <>
      <form>
        <div className="form_group">
          <input placeholder="Nome de Usuário" />
        </div>
        <div className="form_group">
          <input placeholder="E-mail" />
        </div>
        <div className="form_group">
          <input type="password" placeholder="Senha" />
        </div>

        <button type="submit">Registrar</button>
      </form>

      <footer>
        <button onClick={() => $onToggleOptionAuthentication("login")}>
          <span>Já tem conta? Entrar</span>
        </button>
      </footer>
    </>
  );
}
