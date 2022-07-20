export {};

declare global {
  interface dumper {
    is_dumping: boolean;
    has_dumped: boolean;
    status: string;
    message: string;
    data: DumperData;
    time: DumperTime;
  }

  type DumperData = {
    started_at: string | null;
    finalized_at: string | null;
    running_time: number | null;
  }

  type DumperTime = {
    started_at: number | null;
    finalized_at: number | null;
  }
}