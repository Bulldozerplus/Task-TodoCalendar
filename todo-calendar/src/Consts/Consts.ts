
type LoadingStatus = {
    pending: string
    complete: string
    reject: string
}
export const LOADING_STATUS: LoadingStatus = {
    pending: 'pending',
    complete: 'complete',
    reject: 'error'
}