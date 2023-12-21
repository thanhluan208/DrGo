import { cloneDeep } from "lodash";
import { useRef, useState } from "react";

const useScheduler = (initState) => {
  //! State
  const [data, setData] = useState(initState);
  const onCommitButtonClick = useRef(null);

  //! Function
  const handleChangeScheduler = (value) => {
    const { changed } = value;
    const cloneData = cloneDeep(data);
    console.log("changed", changed);
    console.log("before edit: ", data);

    if (changed) {
      const changedId = Object.keys(changed)[0];
      const changePlace = cloneData.findIndex((item) => item.id === +changedId);
      console.log("changePlace", { changePlace, changedId });

      cloneData[changePlace] = {
        ...cloneData[changePlace],
        ...changed[changedId],
      };

      setData(cloneData);
    }
  };

  const handleAddScheduler = (values) => {
    console.log("values");
    const cloneData = cloneDeep(data);
    const newScheduler = {
      id: cloneData.length + 1,
      ...values,
    };

    cloneData.push(newScheduler);
    setData(cloneData);
  };

  //! Return
  return {
    data,
    handleChangeScheduler,
    onCommitButtonClick,
    handleAddScheduler,
    setData,
  };
};

export default useScheduler;
