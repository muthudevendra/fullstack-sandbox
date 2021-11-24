import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Button, Typography, Checkbox } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import debounce from 'lodash.debounce';

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const ToDoListForm = ({ toDoList, changeStatus, createItem, updateItem, deleteItem }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form className={classes.form}>
          {toDoList.todos.map((todo, index) => (
            <ToDoListItem key={todo._id} index={index} oneTodo={todo} changeStatus={changeStatus} updateItem={updateItem} deleteItem={deleteItem} />
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={createItem}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}

export const ToDoListItem = ({ index, oneTodo, changeStatus, updateItem, deleteItem }) => {
  const classes = useStyles()
  const [todo, setTodo] = useState(oneTodo)

  const func = useCallback(
    debounce(async (event) => {
      updateItem(todo._id, event.target.value);
    }, 1000),
    []
  );

  return (
    <div className={classes.todoLine}>
      <Checkbox
        id={todo._id}
        checked={todo.isComplete || false}
        onChange={(event) => {
          setTodo({ ...todo, isComplete: event.target.checked });
          changeStatus(todo._id, event.target.checked)
        }}
        color='default'
      />
      <Typography className={classes.standardSpace} variant='h6'>
        {index + 1}
      </Typography>
      <TextField
        label='What to do?'
        value={todo.text}
        onChange={(event) => {
          func(event);
          setTodo({ ...todo, text: event.target.value });
        }}
        className={classes.textField}
      />
      <Button
        size='small'
        color='secondary'
        className={classes.standardSpace}
        onClick={() => deleteItem(todo._id)}
      >
        <DeleteIcon />
      </Button>
    </div>
  )
}

