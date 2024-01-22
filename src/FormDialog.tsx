import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

type Props = {
  text: string;
  dialogOpen: boolean;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToggle: () => void;
};

export const FormDialog = (props: Props) => (
  <Dialog
    fullWidth
    open={props.dialogOpen}
    onClose={props.onToggle}
    PaperProps={{
      component: 'form',
      onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit();
      },
    }}
  >
    <div style={{ margin: '1em' }}>
      <TextField
        aria-label="todo-input"
        variant="standard"
        style={{
          width: '100%',
          fontSize: '16pt',
          fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
        }}
        label="タスクを入力…"
        onChange={(e) => props.onChange(e)}
        value={props.text}
        autoFocus
      />
      <DialogActions>
        <Button aria-label="form-add" color="secondary" onClick={props.onSubmit}>
          追加
        </Button>
      </DialogActions>
    </div>
  </Dialog>
);
