import { memo, useEffect } from "react";
import { useSave } from "../../../../stores/useStores";
import cachedKeys from "../../../../constants/cachedKeys";

const CommandLayoutComponent = (props) => {
  const { onCommitButtonClick, onDeleteButtonClick } = props;
  const save = useSave();

  useEffect(() => {
    console.log("mounted");
    save(cachedKeys.onCommitButtonClick, onCommitButtonClick);
    // save(cachedKeys.onDeleteButtonClick, onDeleteButtonClick);
  }, []);

  return null;
};

export default memo(CommandLayoutComponent);
