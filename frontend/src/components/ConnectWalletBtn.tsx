import type { TransitionProps } from "@mui/material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Slide from "@mui/material/Slide";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import React from "react";
import { IoCopyOutline, IoExitOutline } from "react-icons/io5";
import { MetaMaskAvatar } from "react-metamask-avatar";
function ConnectWalletBtn({}) {
  const { ready, login, logout, authenticated }: any = usePrivy();
  const { wallets } = useWallets();
  const user = wallets[0];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function UserDrawer({ open, setOpen }: any) {
    const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
        children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
      <React.Fragment>
        <Dialog
          open={open}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          className=""
          PaperProps={{
            sx: {
              backgroundColor: "#FFFFFF1A",
              color: "white", // text color
              borderRadius: "12px", // optional, for softer look
              border: "1px solid #FFFFFF1A", // subtle border
              padding: "25px",
              bottom: "200px",
            },
          }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className=" text-center">
                {user.address && (
                  <MetaMaskAvatar address={user.address} size={50} />
                )}
                <h1 className="text-gray-300 text-xl font-bold">
                  {" "}
                  {user.address.slice(0, 4) +
                    "..." +
                    user.address.slice(
                      user.address.length - 4,
                      user.address.length
                    )}
                </h1>
                <h1 className="text-gray-300 text-lg font-bold">0.00 Ws</h1>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleClose}
              className="border p-2.5 px-5 text-center rounded-md bg-gray-900/20 border-gray-700/90 "
            >
              <span className="grid grid-flow-row">
                <IoCopyOutline className="m-auto" />
                <h1>Copy Address</h1>
              </span>
            </button>
            <button
              onClick={() => {
                handleClose();
                logout();
              }}
              className="border p-2.5 px-5 text-center rounded-md bg-gray-900/20 border-gray-700/90 "
            >
              <div className="grid grid-flow-row">
                <IoExitOutline className="m-auto size-5" />
                <h1>Disconnect</h1>
              </div>
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  return (
    <div>
      {user && <UserDrawer open={open} setOpen={setOpen} />}
      <button
        className="text-md text-gray-200 font-light border p-2 rounded-lg border-gray-800 hover:border-gray-900 hover:text-gray-300"
        onClick={() => {
          if (ready && authenticated && user) {
            setOpen(true);
          } else {
            login();
          }
        }}
      >
        {ready && authenticated && user ? (
          <div className="flex gap-3 px-2">
            {user.address && <MetaMaskAvatar address={user.address} />}

            <h1 className="text-sm mt-[3px]">
              {user.address.slice(0, 4) +
                "..." +
                user.address.slice(
                  user.address.length - 4,
                  user.address.length
                )}
            </h1>
          </div>
        ) : (
          "Connect Wallet"
        )}
      </button>
    </div>
  );
}

export default ConnectWalletBtn;
