import { useEffect, useState } from 'react';
import { SideBar } from './SideBar';
import { FormDialog } from './FormDialog';
import { ToolBar } from './ToolBar';
import { TodoItem } from './TodoItem';
import { ActionButton } from './ActionButton';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';
import { QR } from './QR';
import { AlertDialog } from './AlertDialog';
import localforge from 'localforage';
import { isTodos } from './lib/isTodos';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },

    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSubmit = () => {
    if (!text) {
      setDialogOpen((dialogOpen) => !dialogOpen);
      return;
    }
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setText('');
    setDialogOpen((_dialogOpen) => !todos);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(id: number, key: K, value: V) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        }
        return todo;
      });

      return newTodos;
    });
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const handleToggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };

  const handleToggleQR = () => {
    setQrOpen((qrOpen) => !qrOpen);
  };

  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
  };

  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };

  useEffect(() => {
    localforge.getItem('todo-20240101').then((values) => isTodos(values) && setTodos(values));
  }, []);

  useEffect(() => {
    localforge.setItem('todo-20240101', todos);
  }, [todos]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={handleToggleDrawer}
        onSort={handleSort}
        onToggleQR={handleToggleQR}
      />
      <QR open={qrOpen} onClose={handleToggleQR} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggle={handleToggleDialog}
      />

      <AlertDialog alertOpen={alertOpen} onEmpty={handleEmpty} onToggle={handleToggleAlert} />

      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />

      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};
