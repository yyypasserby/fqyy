import { css, StyleSheet } from "aphrodite";
import React from "react";
import ReactModal from "react-modal";

type DialogControlType = {
  headline?: string;
  primaryAction?: string;
  secondaryAction?: string;
  primaryActionCallback?: () => void;
  secondaryActionCallback?: () => void;
};

export function useDialog({
  headline,
  primaryAction,
  secondaryAction,
  primaryActionCallback,
  secondaryActionCallback,
}: DialogControlType): [() => void, JSX.Element] {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const showDialog = React.useCallback(() => setIsOpen(true), []);
  const dismiss = React.useCallback(() => setIsOpen(false), []);
  const dialog = (
    <ReactModal isOpen={isOpen} className={css(styles.dialogModal)}>
      {headline && <h1>{headline}</h1>}
      <div>
        {primaryAction && (
          <button
            onClick={() => {
              primaryActionCallback?.();
              dismiss();
            }}
          >
            {primaryAction}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={() => {
              secondaryActionCallback?.();
              dismiss();
            }}
          >
            {secondaryAction}
          </button>
        )}
      </div>
    </ReactModal>
  );
  return [showDialog, dialog];
}

const styles = StyleSheet.create({
  dialogModal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
