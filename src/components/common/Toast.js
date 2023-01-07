import toastr from "toastr";
import "toastr/build/toastr.min.css";

export function showToast(toastType, title, message, position, timeOut2) {
    
  const closeButton = true;
  const behaviorButton = true;
  const progressBar = true;
  const preventDuplicates = true;
  const showDuration = true;
  const timeOut = timeOut2;

  toastr.options = {
    positionClass: position,
    timeOut,
    closeButton,
    behaviorButton,
    progressBar,
    preventDuplicates,
    showDuration
  };

  if (toastType === "info") toastr.info(message, title);
  else if (toastType === "warning") toastr.warning(message, title);
  else if (toastType === "error") toastr.error(message, title);
  else toastr.success(message, title);
}

export function clearToast() {
  
  toastr.clear();
}