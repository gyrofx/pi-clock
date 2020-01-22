export interface Alarm {
  index: number;
  enabled: boolean;
  hour: number;
  minute: number;

  // An array with seven entries. Every entry represenets a day. Index 0 = Sunday, 1 = Monday etc
  // Same logic as in the javascript's method getDay()
  // True means that the alarm is enabled on the appropriate day.
  daysOfWeek: boolean[];

  duration: number;
  volume: number;
  playlist: Playlist;
}

export interface Playlist {
  name: string;
  uri: string;
}

export interface NextAlarm {
  alarm: Alarm;
  date: Date;
}
