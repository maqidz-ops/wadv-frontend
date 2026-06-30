import { useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import { useNotif } from "../contexts/NotifContext";

export function useRealTimeTasks(setTasks) {
  const { socket } = useSocket();
  const { addToast } = useNotif();

  useEffect(() => {
    if (!socket) return;

    const onTaskCreated = ({ task }) => {
      setTasks((prev) => {
        const exists = prev.some(
          (t) => t.id === task.id
        );

        if (exists) return prev;

        return [task, ...prev];
      });
    };

    const onTaskUpdated = ({ task }) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? task : t
        )
      );

      addToast({
        type: "INFO",
        title: "Task Diperbarui",
        message: `"${task.title}" telah diperbarui.`,
      });
    };

    const onTaskDeleted = ({ taskId }) => {
      setTasks((prev) =>
        prev.filter((t) => t.id !== taskId)
      );
    };

    const onNotification = (notif) => {
      addToast(notif);
    };

    socket.on("task:created", onTaskCreated);
    socket.on("task:updated", onTaskUpdated);
    socket.on("task:deleted", onTaskDeleted);
    socket.on("notification", onNotification);

    return () => {
      socket.off(
        "task:created",
        onTaskCreated
      );
      socket.off(
        "task:updated",
        onTaskUpdated
      );
      socket.off(
        "task:deleted",
        onTaskDeleted
      );
      socket.off(
        "notification",
        onNotification
      );
    };
  }, [socket, setTasks, addToast]);
}