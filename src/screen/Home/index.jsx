import { useEffect, useState } from "react";
import CommonStyles from "../../components/CommonStyles";
import FirebaseServices from "../../services/firebaseServices";

const id = 1;

const Home = () => {
  //! State
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  //! Function
  const handleClick = () => {
    setError("error");
  };

  const handleSetUserInfo = () => {
    FirebaseServices.writeUserData(id, "Luan", "thanhluan20880@gmail.com");
  };

  //! Render
  if (error) {
    throw new Error(error);
  }

  useEffect(() => {
    FirebaseServices.readUserData(1, setUserInfo);
  }, []);

  return (
    <CommonStyles.Box>
      <button onClick={handleClick}> test error</button>
      <button onClick={handleSetUserInfo}> set info</button>

      <CommonStyles.Typography type="bold18">
        User info:
      </CommonStyles.Typography>
      <CommonStyles.Typography type="normal14">
        {JSON.stringify(userInfo)}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default Home;
