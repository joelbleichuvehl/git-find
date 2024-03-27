import Header from "../../components/Header";
import Background from "../../assets/background.png";
import "./styles.css";
import ItemList from "../../components/ItemList";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState("");
  const [currentUser, setCurretnUser] = useState("");
  const [repos, setRepos] = useState([]);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser) {
      const { avatar_url, name, bio, login } = newUser;
      setCurretnUser({ avatar_url, name, bio, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="app">
      <Header />

      <div className="conteudo">
        <img className="background" src={Background} alt="Imagem Git" />

        <div className="info">
          <div>
            <input
              type="text"
              name="usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="@username"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUser && (
            <>
              <div className="perfil">
                <img
                  className="profile"
                  src={currentUser.avatar_url}
                  alt="imagem perfil"
                />

                <div>
                  <h3>{currentUser.name || "Usuário do GitHub"}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          )}

          {repos.length ? (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              <span>{repos.length} repositórios</span>
              {repos.map((repo, index) => (
                <ItemList
                  key={index}
                  title={repo.name}
                  description={repo.description}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
