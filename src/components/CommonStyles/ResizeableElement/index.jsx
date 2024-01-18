import React, { useEffect, useRef } from "react";
import CommonStyles from "..";

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
}) => {
  //! State
  const resizeableElmRef = useRef();
  const resizeTopRef = useRef();
  const resizeRightRef = useRef();
  const resizeBottomRef = useRef();
  const resizeLeftRef = useRef();

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
      if (height >= lowerLimitHeight && height <= upperLimitHeight) return;
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpTopResize = () => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event) => {
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
      if (width >= lowerLimitWidth && width <= upperLimitWidth) return;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
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
      if (height >= lowerLimitHeight && height <= upperLimitHeight) return;
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpDownResize = () => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
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
      if (width >= lowerLimitWidth && width <= upperLimitWidth) return;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = () => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event) => {
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
  }, [upperLimitHeight, lowerLimitHeight, upperLimitWidth, lowerLimitWidth]);

  //! Render
  return (
    <div
      style={{
        position: "relative",
      }}
      ref={resizeableElmRef}
    >
      {!disabledTop && (
        <div
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

export default ResizeableElement;
