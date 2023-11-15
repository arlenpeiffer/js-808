export interface Pattern {
  readonly id: string
  name: string
  bpm: number
  instruments: Instrument[]
}

export interface Instrument {
  name: string
  sequence: number[]
  volume?: number
  pan?: number
}
