import React, { useState } from "react";
import { appSvg } from "../../../../../../data/svg";
import { useDispatch } from "react-redux";
import {
  deleteCommunicationThunk,
  updateCommunicationThunk,
} from "../../../../../../store/slices/communicationSlide";
export const CommunicationCard = ({ data, indx, select }) => {
  const optionFormatDay = { year: "numeric", month: "numeric", day: "numeric" };

  return (
    <div className="communication_card" onClick={() => select(indx)}>
      <span>{indx + 1}</span>
      <p className="name">{data.user.userName}</p>
      <p className="cloudy">
        {appSvg.cloud}
        {data.cloudy.length}
      </p>
      <p className="comment">
        {appSvg.comment}
        {data.comments.length}
      </p>
      <p className="feeling">{data.feeling}</p>
      <p className="time">
        {new Date(data.updatedAt).toLocaleDateString("vi-VN", optionFormatDay)}
      </p>
      <p className="check">{data.checkContent ? appSvg.check : appSvg.none}</p>
    </div>
  );
};

export const CommunicationDetailCard = ({ data, funcSetIndex }) => {
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleCheck = () => {
    const newData = {
      ...data,
      checkContent: true,
    };

    dispatch(updateCommunicationThunk(newData));
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleYes = () => {
    dispatch(deleteCommunicationThunk(data._id));
    funcSetIndex(null);
  };

  return (
    <div className="communication_detail_card">
      <div className="communication_detail_card_head">
        <h3>Detail Communication</h3>
      </div>

      <div className="communication_detail_card_info">
        <p>ID: {data?._id} </p>
        <p>UserName: {data?.user?.userName} </p>
        <p>UserEmail:{data?.user?.userEmail} </p>
        <p className="check">
          Check: {data?.checkContent ? appSvg.check : appSvg.none}{" "}
        </p>
        <div className="communication_detail_card_info_g">
          <p>
            {appSvg.cloud} {data?.cloudy?.length}
          </p>
          <p>
            {appSvg.comment} {data?.comments?.length}
          </p>
        </div>
      </div>

      <div className="communication_detail_card_controls">
        <p onClick={handleCheck}>Check</p>
        <p onClick={handleConfirmDelete}>Delete</p>
      </div>
      {confirmDelete && (
        <div className="communication_detail_card_confirm">
          <h3>Are you sure to delete it?</h3>
          <div className="communication_detail_card_confirm_g">
            <p onClick={handleYes}>Yes</p>
            <p onClick={handleConfirmDelete}>No</p>
          </div>
        </div>
      )}

      <h3>Content</h3>

      <div
        className="communication_detail_card_content"
        dangerouslySetInnerHTML={{ __html: data?.content }}
      ></div>

      <h3>Comments</h3>

      <div className="communication_detail_card_comments">
        {data?.comments.map((item) => (
          <div className="item" key={item._id}>
            <img src={item.user.avatar} />
            <div className="item_content">
              <h4>{item.user.userName}</h4>
              <p>{item.content}</p>
              {item.reply.map((replyItem) => (
                <div className="item_child" key={replyItem._id}>
                  <img src={replyItem.user.avatar} alt="" />
                  <div className="item_child_content">
                    <h4>{replyItem.user.userName}</h4>
                    <p>{replyItem.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CommunicationDetailEmptyCard = () => {
  return (
    <div className="communication_detail_empty_card">
      <p>Empty</p>
    </div>
  );
};
