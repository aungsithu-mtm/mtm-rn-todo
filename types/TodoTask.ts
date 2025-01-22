export type Task = {
    _id: string
    title: string
    description: string
    userId: string
    date: string
    fromTime: string
    toTime: string
    imageUrl: string
    status: string
    isActive: boolean
    checked?: boolean
}

export type AddTaskForm = {
    title: string
    description?: string
    date: string
    fromTime?: string
    toTime?: string
    imageUrl?: string
    isActive?: boolean
}

export type EditTaskForm = {
    _id?: string
    title: string
    description?: string
    date: string
    fromTime?: string
    toTime?: string
    imageUrl?: string
    isActive?: boolean
    status?: string
}

export type UpdateTaskStatusForm = {
    _id: string
    status: string
}
