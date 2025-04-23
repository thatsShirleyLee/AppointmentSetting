
interface TimeChunk {
  id: string
  start: string
  end: string
}
export type DayAvailability = {
  [key: string]: TimeChunk[]
}

export interface TimeBlock {
  id: string
  time: string;
  booked: boolean;
}
export type DateWithTimeBlocks = {
  [key: string]: TimeBlock[]
}