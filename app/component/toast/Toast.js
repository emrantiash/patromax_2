import { View, Text } from "react-native";
import React,{useState} from "react";
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";

export default function showNewToast(){
  const toast = useToast()
  const [toastId, setToastId] = useState(0);
  const newId = Math.random();
  setToastId(newId);
  toast.show({
    id: newId,
    placement: "top right",
    duration: 3000,
    render: ({ id }) => {
      const uniqueToastId = "toast-" + id;
      return (
        <Toast nativeID={uniqueToastId} action="warning" variant="solid">
          <ToastTitle>Hello!</ToastTitle>
          <ToastDescription>
            This is a customized toast message.
          </ToastDescription>
        </Toast>
      );
    },
  });
};
