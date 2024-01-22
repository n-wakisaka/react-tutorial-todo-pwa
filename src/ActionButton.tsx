import Icon from '@mui/material/Icon';
import Fab from '@mui/material/Fab';

import { styled } from '@mui/material/styles';

type Props = {
  todos: Todo[];
  filter: Filter;
  alertOpen: boolean;
  dialogOpen: boolean;
  onToggleAlert: () => void;
  onToggleDialog: () => void;
};

const FabButton = styled(Fab)({
  position: 'fixed',
  right: 15,
  bottom: 15,
});

export const ActionButton = (props: Props) => {
  const removed = props.todos.filter((todo) => todo.removed).length !== 0;

  return (
    <>
      {props.filter !== 'removed' ? (
        <FabButton
          aria-label="fab-add-button"
          color="secondary"
          onClick={props.onToggleDialog}
          disabled={props.filter === 'checked' || props.dialogOpen}
        >
          <Icon>edit</Icon>
        </FabButton>
      ) : (
        <FabButton
          aria-label="fab-delete-button"
          color="secondary"
          onClick={props.onToggleAlert}
          disabled={!removed || props.alertOpen}
        >
          <Icon>delete</Icon>
        </FabButton>
      )}
    </>
  );
};
