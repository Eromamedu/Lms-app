interface Props {
  title: string;
  subtitle?: string;
}

export default function Heading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8 text-center">

      <h1 className="text-4xl font-bold text-slate-900">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 text-slate-500">
          {subtitle}
        </p>
      )}

    </div>
  );
}