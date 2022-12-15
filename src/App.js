import { useEffect, useState } from "react";
import "./App.css";
import Items from "./Items";

function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);

  function addTodo(event) {
    setValue(event.target.value);
  }

  const postData = async () => {
    await fetch("https://fake-api-backend.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({ name: value, email: value}),
      headers: { "Content-Type": "application/json" },
    });
    getData();
  };

  async function getData() {
    const response = await fetch(
      "https://fake-api-backend.herokuapp.com/users"
    );
    const data = await response.json();
    console.log(data);
    const apdaitedData = [];
    for (const key in data) {
      apdaitedData.push({
        id: key,
        ...data[key],
      });
    }
    setTodo(apdaitedData);
  }

  useEffect(() => {
    getData();
  }, []);

  async function deleteData(id) {
    await fetch(`https://fake-api-backend.herokuapp.com/users/${id}`, {
      method: "DELETE",
    });
    getData();
  }

  function submitHandler(event) {
    event.preventDefault();
    setTodo((prev) => [...prev, { text: value }]);

    postData();

    setValue("");
    console.log(todo);
  }
  const putData = async (putId, tast, addChandge) => {
    deleteData(putId);
    const response = await fetch(
      `https://fake-api-backend.herokuapp.com/users/${putId}`,
      {
        method: "PUT",
        body: JSON.stringify({ text: tast }),
      }
    );
    console.log(response);
    addChandge();
  };

  return (
    <>
      <form className="App" onSubmit={submitHandler}>
        <input value={value} type="text" onChange={addTodo} />
        <button>Добавить</button>
      </form>
      <div>
        <ul>
          {todo.map((el, index) => (
            <li key={index}>
              <Items
                id={el.id}
                text={el.name}
                deleteId={deleteData}
                getData={getData}
                editData={putData}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
