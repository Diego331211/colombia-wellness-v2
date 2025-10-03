import { Button } from "@/components/ui/button";

interface Props {
  href?: string;
  children: React.ReactNode;
  className: string;
}

export default function MyButton(props: Props) {
  if (props.href) {
    return (
      <a
        href={props.href}
        className={`${props.className} h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`}
      >
        {props.children}
      </a>
    );
  }
  return <Button className={props.className}>{props.children}</Button>;
}
