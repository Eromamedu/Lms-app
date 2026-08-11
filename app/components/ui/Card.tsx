interface Props {
  children: React.ReactNode;
}

export default function Card({
  children,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      {children}
    </div>
  );
}