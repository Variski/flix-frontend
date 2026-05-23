import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Flix App</h1>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="outline" size="lg">
        Large
      </Button>
    </div>
  );
}
