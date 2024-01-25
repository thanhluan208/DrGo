import React, { memo, useEffect, useRef } from "react";
import CommonStyles from "..";
import { useTheme } from "@emotion/react";
import { CircularProgress } from "@mui/material";

const ResizeableElement = ({
  children,
  disabledTop,
  disabledRight,
  disabledBottom,
  disabledLeft,
  upperLimitHeight,
  lowerLimitHeight,
  upperLimitWidth,
  lowerLimitWidth,
  callbackMouseOver,
  callbackMouseLeave,
  loading,
  heightValue,
  onChangeSize,
}) => {
  //! State
  const resizeableElmRef = useRef();
  const resizeTopRef = useRef();
  const resizeRightRef = useRef();
  const resizeBottomRef = useRef();
  const resizeLeftRef = useRef();
  const [isResize, setIsResize] = React.useState(false);

  //! Function
  useEffect(() => {
    const resizeableElement = resizeableElmRef.current;
    const styles = window.getComputedStyle(resizeableElement);

    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);

    let xCord = 0;
    let yCord = 0;

    //! Top
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - yCord;
      height = height - dy;
      yCord = event.clientY;
      if (height <= lowerLimitHeight || height >= upperLimitHeight) return;
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpTopResize = () => {
      setIsResize(false);
      onChangeSize(height, "top");
      document.removeEventListener("mousemove", onMouseMoveTopResize);
      document.removeEventListener("mouseup", onMouseUpTopResize);
    };

    const onMouseDownTopResize = (event) => {
      setIsResize(true);
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.bottom = styles.bottom;
      resizeableElement.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    //! Right
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - xCord;
      width = width + dx;
      xCord = event.clientX;
      if (width <= lowerLimitWidth && width >= upperLimitWidth) return;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpRightResize = () => {
      setIsResize(false);
      onChangeSize(width, "right");
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      document.removeEventListener("mouseup", onMouseUpRightResize);
    };

    const onMouseDownRightResize = (event) => {
      setIsResize(true);
      xCord = event.clientX;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.right = styles.right;
      resizeableElement.style.left = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    //! Bottom
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - yCord;
      height = height + dy;
      yCord = event.clientY;
      if (upperLimitHeight && height >= upperLimitHeight) {
        height = upperLimitHeight;
        return;
      }
      if (lowerLimitHeight && height <= lowerLimitHeight) {
        height = lowerLimitHeight;
        return;
      }
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpDownResize = () => {
      setIsResize(false);
      onChangeSize(height, "bottom");
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
      document.removeEventListener("mouseup", onMouseUpDownResize);
    };

    const onMouseDownBottomResize = (event) => {
      setIsResize(true);

      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.top = styles.top;
      resizeableElement.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpDownResize);
    };

    //! Left
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - xCord;
      width = width - dx;
      xCord = event.clientX;
      if (lowerLimitHeight && width <= lowerLimitWidth) {
        width = lowerLimitWidth;
        return;
      }
      if (upperLimitHeight && width >= upperLimitWidth) {
        width = upperLimitWidth;
        return;
      }
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = () => {
      setIsResize(false);
      onChangeSize(width, "left");
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
      document.removeEventListener("mouseup", onMouseUpLeftResize);
    };

    const onMouseDownLeftResize = (event) => {
      setIsResize(true);
      xCord = event.clientX;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.left = styles.left;
      resizeableElement.style.right = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    !disabledBottom &&
      resizeBottomRef.current.addEventListener(
        "mousedown",
        onMouseDownBottomResize
      );
    !disabledTop &&
      resizeTopRef.current.addEventListener("mousedown", onMouseDownTopResize);
    !disabledRight &&
      resizeRightRef.current.addEventListener(
        "mousedown",
        onMouseDownRightResize
      );
    !disabledLeft &&
      resizeLeftRef.current.addEventListener(
        "mousedown",
        onMouseDownLeftResize
      );

    return () => {
      !disabledBottom &&
        resizeBottomRef?.current?.removeEventListener(
          "mousedown",
          onMouseDownBottomResize
        );
      !disabledTop &&
        resizeTopRef?.current?.removeEventListener(
          "mousedown",
          onMouseDownTopResize
        );
      !disabledRight &&
        resizeRightRef?.current?.removeEventListener(
          "mousedown",
          onMouseDownRightResize
        );
      !disabledLeft &&
        resizeLeftRef?.current?.removeEventListener(
          "mousedown",
          onMouseDownLeftResize
        );
    };
  }, [
    upperLimitHeight,
    lowerLimitHeight,
    upperLimitWidth,
    lowerLimitWidth,
    onChangeSize,
  ]);

  //! Render
  return (
    <div
      style={{
        position: "relative",
        height: heightValue,
        background: isResize || loading ? "rgba(0,0,0,0.5)" : "transparent",
        borderRadius: "6px",
        transition: "background 0.2s ease",
      }}
      ref={resizeableElmRef}
    >
      {loading && (
        <CommonStyles.Box
          centered
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {<CircularProgress />}
        </CommonStyles.Box>
      )}
      {!disabledTop && (
        <div
          className="resizeElm"
          onMouseOver={callbackMouseOver}
          onMouseLeave={callbackMouseLeave}
          ref={resizeTopRef}
          style={{
            position: "absolute",
            height: "5px",
            width: "100%",
            top: 0,
            left: 0,
            cursor: "ns-resize",
          }}
        />
      )}

      {!disabledRight && (
        <div
          className="resizeElm"
          ref={resizeRightRef}
          onMouseOver={callbackMouseOver}
          onMouseLeave={callbackMouseLeave}
          style={{
            position: "absolute",
            height: "100%",
            width: "5px",
            top: 0,
            right: 0,
            cursor: "ew-resize",
          }}
        />
      )}

      {!disabledBottom && (
        <div
          className="resizeElm"
          ref={resizeBottomRef}
          onMouseOver={callbackMouseOver}
          onMouseLeave={callbackMouseLeave}
          style={{
            position: "absolute",
            height: "5px",
            width: "100%",
            bottom: 0,
            left: 0,
            cursor: "ns-resize",
          }}
        />
      )}

      {!disabledLeft && (
        <div
          className="resizeElm"
          ref={resizeLeftRef}
          onMouseOver={callbackMouseOver}
          onMouseLeave={callbackMouseLeave}
          style={{
            position: "absolute",
            height: "100%",
            width: "5px",
            top: 0,
            left: 0,
            cursor: "ew-resize",
          }}
        />
      )}
      {children}
    </div>
  );
};

export default memo(ResizeableElement);
