import {
  Users, Building2, GraduationCap, BookOpenCheck, Clock, BarChart3, Target,
  BadgeCheck, Medal
} from "lucide-react";

const ACCENT = "#12B6C8";
const ACCENT_LIGHT = "#12B6C820";

function clampPercent(v) {
  if (v == null) return 0;
  let n = typeof v === "string" ? parseFloat(v) : Number(v);
  if (!Number.isFinite(n)) return 0;
  if (n <= 1) n = n * 100;          // 支援 0~1
  return Math.max(0, Math.min(100, n));
}

const Stat = ({ icon: Icon, label, value, hint, highlight = false }) => (
  <div className="rounded-xl border bg-white/70 backdrop-blur p-4 flex items-start gap-3">
    <div className="shrink-0 mt-1 rounded-lg" style={{ background: ACCENT_LIGHT }}>
      <Icon className="size-5 m-2" style={{ color: ACCENT }} />
    </div>
    <div className="min-w-0">
      <div className="text-xs opacity-70">{label}</div>
      <div className={`text-lg font-semibold truncate ${highlight ? "text-slate-900" : ""}`}>{value ?? "--"}</div>
      {hint && <div className="text-[11px] opacity-60 mt-0.5">{hint}</div>}
    </div>
  </div>
);

const ProgressTiny = ({ percent = 0 }) => (
  <div className="mt-2">
    <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${percent}%`, background: ACCENT }}
      />
    </div>
    <div className="text-[11px] mt-1 opacity-70 text-right">{Math.round(percent)}%</div>
  </div>
);

export default function ClassInfoCard({ classInfo = {} }) {
  const {
    school_name,
    class_name,
    teacher_name,
    member_count,
    avg_completion_rate,      // 0~1 或 0~100 都可
    avg_completed_sections,   // 平均完成小節
    avg_courses_completed,    // 平均完成課程數
    avg_score,                // 平均成績
    avg_hours,                // 平均上課時數(小時)
  } = classInfo;

  const pct = clampPercent(avg_completion_rate);

  return (
    <section className="rounded-2xl border shadow-sm p-6 bg-gradient-to-b from-white to-slate-50">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl" style={{ background: ACCENT_LIGHT }}>
            <Building2 className="size-6 m-2" style={{ color: ACCENT }} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">班級資訊</h3>
            <p className="text-sm opacity-70">
              {school_name ? `${school_name}・${class_name ?? "未命名班級"}` : "尚未綁定學校／班級"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat icon={Building2} label="學校名稱" value={school_name || "--"} />
        <Stat icon={GraduationCap} label="班級名稱" value={class_name || "--"} />
        <Stat icon={BadgeCheck} label="教師名稱" value={teacher_name || "--"} />
        <Stat icon={Users} label="成員人數" value={member_count ?? "--"} />

        <div className="rounded-xl border bg-white/70 backdrop-blur p-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-1 rounded-lg" style={{ background: ACCENT_LIGHT }}>
              <Target className="size-5 m-2" style={{ color: ACCENT }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs opacity-70">班級平均課程完成率</div>
              <div className="text-lg font-semibold">{Math.round(pct)}%</div>
              <ProgressTiny percent={pct} />
            </div>
          </div>
        </div>

        <Stat icon={BookOpenCheck} label="班級平均完成小節" value={avg_completed_sections ?? "--"} />
        <Stat icon={BarChart3} label="班級課程平均完成數" value={avg_courses_completed ?? "--"} />
        <Stat icon={Medal} label="班級平均成績" value={avg_score ?? "--"} hint="以最近評量計算" />
        <Stat icon={Clock} label="班級平均上課時數" value={avg_hours != null ? `${avg_hours} 小時` : "--"} />
      </div>
    </section>
  );
}
