type InfoCardProps = {
  title: string;
  value: string;
  description?: string;
};

function InfoCard({ title, value, description }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-2 font-mono text-xl font-semibold text-slate-100">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}

export default InfoCard;
