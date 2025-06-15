import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import { router } from '@inertiajs/react';
import { List } from '@/types';

// Supón que tienes acceso a:
// - lists (array global de listas con tareas)
// - setLists (para actualizar el estado local)

export function handleDragEnd(event: DragEndEvent, lists: List[], setLists: any) {
  const { active, over } = event;
  if (!active || !over || active.id === over.id) return;

  const fromListId = active.data.current?.sortable?.containerId;
  const toListId = over.data.current?.sortable?.containerId;
  const activeTaskId = active.id;
  const overTaskId = over.id;

  const movedToAnotherList = fromListId !== toListId;

  if (movedToAnotherList) {
    const fromList = lists.find((l) => l.id === fromListId);
    const toList = lists.find((l) => l.id === toListId);
    if (!fromList || !toList) return;

    const task = fromList.tasks.find((t) => t.id === activeTaskId);
    if (!task) return;

    const overIndex = toList.tasks.findIndex((t) => t.id === overTaskId);
    const newPosition = overIndex === -1 ? toList.tasks.length : overIndex;

    // Actualiza el estado localmente
    const newFromTasks = fromList.tasks.filter((t) => t.id !== activeTaskId);
    const newToTasks = [...toList.tasks];
    newToTasks.splice(newPosition, 0, task);

    const updatedLists = lists.map((list) => {
      if (list.id === fromListId) return { ...list, tasks: newFromTasks };
      if (list.id === toListId) return { ...list, tasks: newToTasks };
      return list;
    });

    setLists(updatedLists);

    // Llama a Laravel para moverla en la BBDD
    router.put(route('tasks.move', activeTaskId), {
      task_list_id: toListId,
      position: newPosition,
    });

  } else {
    // Dentro de la misma lista
    const list = lists.find((l) => l.id === fromListId);
    if (!list) return;

    const oldIndex = list.tasks.findIndex((t) => t.id === activeTaskId);
    const newIndex = list.tasks.findIndex((t) => t.id === overTaskId);
    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedTasks = arrayMove(list.tasks, oldIndex, newIndex);

    const updatedLists = lists.map((l) =>
      l.id === list.id ? { ...l, tasks: reorderedTasks } : l
    );

    setLists(updatedLists);

    router.put(route('lists.reorder', { taskList: list.id }), {
      tasks: reorderedTasks.map((t, i) => ({ id: t.id, position: i })),
    });
  }
}
