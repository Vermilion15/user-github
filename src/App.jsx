import { useState } from "react";
import { User } from "./Component/User";
import Form from "./Component/Form";
import "./App.css";

// Fetch github Rest API
const API_URL = "https://api.github.com";

async function fetchResult(query) {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
}

const App = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  // function HandleChange
  function handleChange(event) {
    setQuery(event.target.value);
  }

  // function handleSubmit
  async function handleSubmit(event) {
    event.preventDefault();
    const results = await fetchResult(query);
    setUsers(results)
    setQuery('')
  };
  return (
    <div className="container">
      <h2>Search Github User</h2>
     <Form
     onSubmit={ handleSubmit }
     onChange={ handleChange }
     value={ query }
     >
     </Form>

      <div className="user">
        {users.map((user) => {
          return (
            <User
              key={user.login}
              avatar={user.avatar_url}
              url={user.html_url}
              username={user.login}
            ></User>
          );
        })}
      </div>
    </div>
  );
};



export default App;
