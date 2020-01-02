export interface Alarm {
  index: number;
  enabled: boolean;
  hour: number;
  minute: number;
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
