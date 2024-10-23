// Exemplo de um componente que usa o contexto
// import { useUser } from '../context/UserContext';
import { useUser } from "@/context/UseContext";

const UserProfile = () => {
  const { user, login, logout } = useUser();

  const handleLogin = () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    login(userData);
  };

  console.log(user)

  return (
    <div>
      {user ? (
        <div>
          <h1>Bem-vindo, {user.name}!</h1>
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Entrar</button>
      )}
    </div>
  );
};

export default UserProfile;
