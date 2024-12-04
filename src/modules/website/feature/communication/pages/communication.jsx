import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CommunicationCard,
  CommunicationDetailCard,
  CommunicationDetailEmptyCard,
} from "../components/card/communicationCard";
import CommunicaitonCreate from "../components/communicaitonCreate";
import { useDispatch, useSelector } from "react-redux";
import { getCommunicationThunk } from "../../../../../store/slices/communicationSlide";

const Communication = () => {
  const [create, setCreate] = useState(false);
  const { communications } = useSelector((state) => state.communication);
  const [communicationSelect, setCommunicationSelect] = useState(null);

  console.log(communicationSelect);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommunicationThunk());
  }, []);

  const handleCreate = () => {
    setCreate(!create);
  };

  console.log(communications);

  return (
    <div className="communication">
      <div className="communication_head">
        <p onClick={handleCreate}>Create one</p>
        <p className="active">All</p>
        <p>Check</p>
        <p>Not Check</p>
      </div>
      <div className="communication_content">
        <div className="communication_content_list">
          {communications.map((item, index) => (
            <CommunicationCard
              data={item}
              indx={index}
              select={setCommunicationSelect}
              key={index}
            />
          ))}
        </div>
        <div className="communication_content_review">
          <CommunicationDetailCard
            data={communications[communicationSelect]}
            funcSetIndex={setCommunicationSelect}
          />
        </div>
      </div>

      {create && <CommunicaitonCreate close={handleCreate} />}
    </div>
  );
};

export default Communication;
