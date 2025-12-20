import { Icon } from './index';
import { Search, Home, FileText, Code2, Github, Mail, Calendar } from 'lucide-react';

export function IconExamples() {
  return (
    <div className="space-y-8 p-8">
      <section>
        <h3 className="text-xl font-semibold mb-4">Size Variants</h3>
        <div className="flex items-center gap-4">
          <Icon icon={Search} size="xs" aria-label="Extra small search" />
          <Icon icon={Search} size="sm" aria-label="Small search" />
          <Icon icon={Search} size="md" aria-label="Medium search" />
          <Icon icon={Search} size="lg" aria-label="Large search" />
          <Icon icon={Search} size="xl" aria-label="Extra large search" />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Color Variants</h3>
        <div className="flex items-center gap-4">
          <Icon icon={Home} color="primary" aria-label="Primary home" />
          <Icon icon={FileText} color="secondary" aria-label="Secondary document" />
          <Icon icon={Code2} color="muted" aria-label="Muted code" />
          <Icon icon={Github} color="orange" aria-label="Orange GitHub" />
          <Icon icon={Mail} color="brown" aria-label="Brown mail" />
          <Icon icon={Calendar} color="teal" aria-label="Teal calendar" />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Combined Usage</h3>
        <div className="flex items-center gap-4">
          <Icon icon={Search} size="lg" color="orange" aria-label="Large orange search" />
          <Icon icon={Home} size="md" color="brown" aria-label="Medium brown home" />
          <Icon icon={Code2} size="xl" color="teal" aria-label="Extra large teal code" />
        </div>
      </section>
    </div>
  );
}
