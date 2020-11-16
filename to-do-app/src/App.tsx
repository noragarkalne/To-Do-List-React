import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { Button } from "./components/button/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToDo = {
  id: number;
  text: string;
  finished: boolean;
  editOpen: boolean;
};

const App = () => {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const inputEl = useRef(null);

  //mounted, updated, removed - cikli

  const isInitialMount = useRef(true);

  useEffect(() => {
    const toDoStorage = localStorage.getItem("todos");
    if (toDoStorage) {
      setToDos(JSON.parse(toDoStorage));
    }
  }, []);

  // izsaucās ik reizi kad komponents apdeitojās
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem("todos", JSON.stringify(toDos));
    }
  }, [toDos]);

  // izsaucās ik reizi kad komponents ielādējās vai apdeitojās
  useEffect(() => {
    console.log("Komponents ir ielādējies vai atjauninājies");
  });
  // izsaucās ik reizi kad komponents ielādējās
  useEffect(() => {
    console.log("Komponents ir ielādējies");
  }, []);
  // izsaucās ik reizi kad komponents ielādējās vai tiek atjaunināts toDos state
  useEffect(() => {
    console.log("Komponents ir ielādējies vai toDos state ir mainīts");
  }, [toDos]);

  const checkboxHandler = (index: number) => {
    const newToDos = [...toDos];
    newToDos[index].finished = !newToDos[index].finished;

    setToDos(newToDos);
  };

  const addNewItemHandler = () => {
    if (inputValue === "") {
      setErrorInput("You can't add empty value!");
      return;
    }
    setErrorInput(" ");
    setToDos([
      ...toDos,
      {
        id: toDos.length + 1,
        text: inputValue,
        finished: false,
        editOpen: false,
      },
    ]);
    setInputValue("");
    toast("Jauns Todo ir pievienots");
  };

  const copyHandler = (index: number) => {
    const newToDo = { ...toDos[index], id: toDos.length + 2 };

    setToDos([...toDos, newToDo]);
  };

  const deleteHandler = (index: number) => {
    const newToDos = [...toDos];
    newToDos.splice(index, 1);
    setToDos(newToDos);
    toast("Todo ir noņemts");
  };

  const editInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newToDos = [...toDos];
    newToDos[index].text = e.target.value;
    setToDos(newToDos);
  };

  const editToggleHandler = (index: number) => {
    const newToDos = [...toDos];
    newToDos[index].editOpen = !newToDos[index].editOpen;
    setToDos(newToDos);
  };

  const focusInputHandler = () => {
    //@ts-ignore
    inputEl.current.focus();
  };

  return (
    <div className="App">
      <h1>To do list</h1>
      <input
        ref={inputEl}
        type="text"
        placeholder="Add item"
        value={inputValue} //sitas loti svarigi
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button text="add" clickHandler={addNewItemHandler} />
      &nbsp; &nbsp;
      <Button text="focus input" clickHandler={() => focusInputHandler()} />
      <br />
      {errorInput && <span style={{ color: "red" }}>{errorInput}</span>}
      <ul>
        {toDos.map(({ text, finished, id, editOpen }, index) => {
          return (
            <li key={id}>
              {!editOpen ? (
                <>
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    checked={finished}
                    onChange={() => checkboxHandler(index)}
                  />
                  <p>{text}</p> 

                  <Button text="copy" clickHandler={() => copyHandler(index)} />

                  <Button
                    text="delete"
                    clickHandler={() => deleteHandler(index)}
                  />

                  <Button
                    text="edit"
                    clickHandler={() => editToggleHandler(index)}
                  />
                </>
              ) : (
                <>
                  <input
                    className="edit-input"
                    type="text"
                    value={text}
                    onChange={(e) => editInputHandler(e, index)}
                  />
                  <Button
                    text="save"
                    clickHandler={() => editToggleHandler(index)}
                  />
                </>
              )}
            </li>
          );
        })}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default App;

//npm i uuid
//react toastify - npm install --save react-toastify

//mājās:
//edit opcija (conditional renderings)
//saglabāt to dos localstorage, lai pēc pārlādes viss ir saglabājies
//piečinīt dizainu
