import React, { Fragment, useState, useEffect, useCallback } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import { ToDoListForm } from './ToDoListForm'
import client from '../../services/fetch-client'
import debounce from 'lodash.debounce';

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({
    1: {
      id: 1,
      title: 'First List',
      todos: []
    },
    2: {
      id: 2,
      title: 'Second List',
      todos: []
    }
  });


  const [activeList, setActiveList] = useState();

  useEffect(() => {
    getPersonalTodos();
  }, [])

  const getPersonalTodos = async () => {
    const data = await client("/todos", "GET");
    const listOne = data.filter((item) => item.listId === 1);
    const listTwo = data.filter((item) => item.listId === 2);
    setToDoLists({ 1: { ...toDoLists[1], todos: listOne }, 2: { ...toDoLists[2], todos: listTwo } });
  }

  const createItem = async () => {
    await client(`/todos`, "POST", {
      body: {
        text: "",
        listId: activeList,
        isComplete: false,
      }
    });
    getPersonalTodos();
  };

  const deleteTodo = async (id) => {
    await client(`/todo/${id}`, "DELETE");
    getPersonalTodos();
  };

  const updateItem = useCallback(
    debounce(async (id, value) => {
      await client(`/todo/${id}`, "PUT", {
        body: {
          text: value
        }
      });
    }, 1000),
    [],
  );

  const changeStatus = useCallback(
    debounce(async (id, value) => {
      await client(`/todo/${id}`, "PUT", {
        body: {
          isComplete: value
        }
      });
    }, 500),
    [],
  );

  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => {
              getPersonalTodos();
              setActiveList(key);
            }}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList}
      toDoList={toDoLists[activeList]}
      createItem={createItem}
      updateItem={updateItem}
      deleteItem={deleteTodo}
      changeStatus={changeStatus}
    />}
  </Fragment>
}
