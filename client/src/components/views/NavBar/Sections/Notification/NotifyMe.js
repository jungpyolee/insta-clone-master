import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { reactLocalStorage } from "reactjs-localstorage";
import { Bell, BookOpen, AlertTriangle } from "react-feather";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NotifyMe.scss";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";

const NotifyMe = (props) => {
  moment.locale(navigator.languages[0].toLowerCase()); // State variabls

  const [showCount, setShowCount] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [readIndex, setReadIndex] = useState(0); // Useref for the overlay
  const ref = useRef(null); // Props passed to the component

  const data = props.data;

  const storageKey = props.storageKey || "notification_timeline_storage_id";
  const key = props.notific_key;
  const notificationMsg = props.notific_value;
  const notificationImg = props.notific_img;
  const sortedByKey = props.sortedByKey;
  const heading = props.heading || "Notifications";
  const bellSize = props.size || 32;
  const bellColor = props.color || "black";
  const multiLineSplitter = props.multiLineSplitter || "\n";
  const showDate = props.showDate || false;

  useEffect(() => {
    if (!sortedByKey) {
      data.sort((a, b) => b[key] - a[key]);
    } // We read if any last read item id is in the local storage

    let readItemLs = reactLocalStorage.getObject(storageKey);
    let readMsgId = Object.keys(readItemLs).length > 0 ? readItemLs["id"] : ""; // if the id found, we check what is the index of that message in the array and query it. If not found,
    // nothing has been read. Hence count should be same as all the message count.

    let readIndex =
      readMsgId === ""
        ? data.length
        : data.findIndex((elem) => elem[key] === readMsgId); // if the id is not found, it all flushed out and start again

    if (readIndex === -1) {
      readIndex = data.length;
    } else {
      return;
    }
    setReadIndex(readIndex); // If there are messages and readIndex is pointing to at least one message, we will show the count bubble.

    (data.length && readIndex) > 0 ? setShowCount(true) : setShowCount(false);
    setMessageCount(readIndex);
  }, [data]); // Handle the click on the notification bell

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  }; // Calculate the day diff

  const getDayDiff = (timestamp) => {
    let a = moment();
    let b = moment(timestamp);
    let diff = a.diff(b, "year");

    if (diff === 0) {
      diff = a.diff(b, "month");

      if (diff === 0) {
        diff = a.diff(b, "days");

        if (diff === 0) {
          diff = a.diff(b, "hour");

          if (diff === 0) {
            diff = a.diff(b, "minute");

            if (diff === 0) {
              diff = a.diff(b, "second");
              return `${diff} 초 전`;
            } else {
              return `${diff} 분 전`;
            }
          } else {
            return `${diff} 시간 전`;
          }
        } else {
          return `${diff} 일 전`;
        }
      } else {
        return `${diff} 달 전`;
      }
    } else {
      return `${diff} 년 전`;
    }
  };

  const getWhen = (timestamp) => {
    let when = `${moment(timestamp).format("L")} ${moment(timestamp).format(
      "LTS"
    )}`;
    return when;
  }; // Get the notification message

  const getContent = (message) => {
    if (message.indexOf(multiLineSplitter) >= 0) {
      let splitted = message.split(multiLineSplitter);
      let ret = "<ul>";

      for (let i = 0; i <= splitted.length - 1; i++) {
        if (splitted[i] !== "") {
          ret = ret + "<li>" + splitted[i] + "</li>";
        }
      }

      ret = ret + "</ul>";
      return ret;
    }

    return (
      <ul style={{ listStyle: "none", padding: "0", marginLeft: 10 }}>
        <li>{message}</li>
      </ul>
    );
  }; // Hide the notification on clicking outside

  const hide = () => {
    setShow(false);
  }; // Call the function when mark as read link is clicked

  const markAsRead = () => {
    setShowCount(false);
    reactLocalStorage.setObject(storageKey, {
      id: data[0][key],
    });
    setReadIndex(0);
    setShow(false);
  };

  return (
    <>
      <div className="notification-container">
        <div
          className={
            showCount ? "notification notify show-count" : "notification notify"
          }
          data-count={messageCount}
          onClick={(event) => handleClick(event)}
        >
          <Bell color={bellColor} size={bellSize} />
        </div>
      </div>

      <div ref={ref}>
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref.current}
          containerPadding={20}
          rootClose={true}
          onHide={hide}
        >
          <Popover className="popover-contained">
            <div className="popover-content" style={{ padding: "3px 3px" }}>
              {showCount && (
                <div>
                  <Button
                    variant="link"
                    onClick={props.markAsReadFn || markAsRead}
                  >
                    <BookOpen size={24} />
                    모두 읽음으로 표시
                  </Button>
                </div>
              )}
              <ul className="notification-info-panel">
                {data.length > 0 ? (
                  data.map((message, image, index) => {
                    return (
                      <li
                        className={
                          index < readIndex
                            ? "notification-message unread"
                            : "notification-message"
                        }
                        key={index}
                      >
                        <div className="timestamp">
                          <span>{getDayDiff(message[key])}</span>
                          {showDate && (
                            <span>
                              {" ("}
                              {getWhen(message[key])}
                              {")"}
                            </span>
                          )}
                        </div>
                        <div className="content">
                          <Link
                            style={{ display: "flex", color: "black" }}
                            onClick={props.markAsReadFn || markAsRead}
                            to={`/post/${message.postId}`}
                          >
                            <Avatar src={message.image} alt="t" />
                            {getContent(message[notificationMsg])}
                          </Link>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <>
                    <AlertTriangle color="#000000" size={32} />
                    <h5 className="nodata">새 알림이 없습니다~!</h5>
                  </>
                )}
              </ul>
            </div>
          </Popover>
        </Overlay>
      </div>
    </>
  );
};

NotifyMe.prototype = {
  storageKey: PropTypes.string,
  notific_key: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  notific_value: PropTypes.string.isRequired,
  sortedByKey: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  heading: PropTypes.string,
  multiLineSplitter: PropTypes.string,
  showDate: PropTypes.bool,
  markAsReadFn: PropTypes.func,
};
export default NotifyMe;
