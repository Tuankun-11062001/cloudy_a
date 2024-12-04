import React, { useEffect, useState } from "react";
import { appSvg } from "../../../../../data/svg";
import { useDispatch, useSelector } from "react-redux";
import { createCommunicationThunk } from "../../../../../store/slices/communicationSlide";
import TipTap from "../../../components/rickText";

const CommunicaitonCreate = ({ close }) => {
  const dispatch = useDispatch();
  const { communications } = useSelector((state) => state.communication);
  const [dataCommunication, setDataCommunication] = useState({
    user: "",
    feeling: "",
    content: "",
  });

  console.log(communications);
  useEffect(() => {
    const idUser = localStorage.getItem("_CM_id");
    setDataCommunication((prev) => {
      return {
        ...prev,
        user: idUser,
      };
    });
  }, []);

  const handleChangeRickText = (data) => {
    setDataCommunication((prev) => {
      return {
        ...prev,
        content: data,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataCommunication((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    dispatch(createCommunicationThunk(dataCommunication));
  };
  return (
    <div className="communication_create">
      <div className="communication_create_content">
        <div className="head">
          <h1>Create Communication</h1>
          <p onClick={close}>{appSvg.close}</p>
        </div>
        <select
          name="feeling"
          value={dataCommunication.feeling}
          onChange={handleChange}
        >
          <option value="">Choose</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="cry">Cry</option>
        </select>
        <TipTap
          state={dataCommunication?.content}
          change={handleChangeRickText}
        />
        <p className="submit" onClick={handleSubmit}>
          Submit
        </p>
      </div>
    </div>
  );
};

export default CommunicaitonCreate;
