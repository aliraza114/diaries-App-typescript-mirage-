export interface Diary {
    id?: string
    title: string
    type: 'private' | 'public'
    createdAt?: string
    deletedAt?: string
    userId?: string
    entryIds: string[] | null 
}