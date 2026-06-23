import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GlobalModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
 const {redirectTo} = useSelector(state => state.modal)
  const {
    isOpen,
    type,
    title,
    message,
  } = useSelector((state) => state.modal);

  if (!isOpen) return null;

  const designConfig = {
    success: {
      icon: (
        <CheckCircle className="h-12 w-12 text-green-600" />
      ),
      bg: "bg-green-100",
      button: "bg-green-600 hover:bg-green-700",
    },

    error: {
      icon: (
        <XCircle className="h-12 w-12 text-red-600" />
      ),
      bg: "bg-red-100",
      button: "bg-red-600 hover:bg-red-700",
    },

    warning: {
      icon: (
        <AlertTriangle className="h-12 w-12 text-yellow-600" />
      ),
      bg: "bg-yellow-100",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },

    info: {
      icon: (
        <Info className="h-12 w-12 text-blue-600" />
      ),
      bg: "bg-blue-100",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const current = designConfig[type];

  const handleClose = () => {
    dispatch(closeModal());
    navigate(redirectTo)
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${current.bg}`}
        >
          {current.icon}
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="mt-3 text-center text-gray-500">
          {message}
        </p>

        <button
          onClick={handleClose}
          className={`mt-6 w-full rounded-xl px-4 py-3 font-medium text-white transition ${current.button}`}
        >
          OK
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}