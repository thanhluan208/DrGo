import MuiIconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";

const Button = (props) => {
  const { isIconButton, sx, ...otherProps } = props;
  if (isIconButton) {
    return <MuiIconButton {...props}>{props.children}</MuiIconButton>;
  }

  return (
    <LoadingButton
      variant="contained"
      sx={{
        textTransform: "none",
        ...sx,
      }}
      {...otherProps}
    >
      {props.children}
    </LoadingButton>
  );
};

export default Button;
