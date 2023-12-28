
export interface Event {
  title: string,
  day: string,
  month: string,
  weekday: string,
  timeRange: string,
}
export interface User {
  id: string,
  username: string,
  userRank: string,
  specialName: string,
}
export interface Certificate {
  name: string,
  type: string,
  progress: string,
  mission: string,
  imageUrl?: string
}
