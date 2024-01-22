import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

type Props = {
  alertOpen: boolean;
  onEmpty: () => void;
  onToggle: () => void;
};

export const AlertDialog = (props: Props) => (
  <Dialog
    fullWidth
    open={props.alertOpen}
    onClose={props.onToggle}
    sx={{ fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}
  >
    <DialogTitle>アラート</DialogTitle>
    <DialogContent>
      <DialogContentText>本当にゴミ箱を完全に空にしますか？</DialogContentText>
      <DialogContentText>この操作は取り消しできません。</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button aria-label="alert-cancel" color="primary" onClick={props.onToggle}>
        キャンセル
      </Button>
      <Button
        aria-label="alert-ok"
        color="secondary"
        onClick={() => {
          props.onToggle();
          props.onEmpty();
        }}
      >
        OK
      </Button>
    </DialogActions>
  </Dialog>
);
