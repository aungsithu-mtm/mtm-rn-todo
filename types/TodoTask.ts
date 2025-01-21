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
