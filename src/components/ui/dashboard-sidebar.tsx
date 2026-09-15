import React, { useState } from 'react';
import {
  Activity,
  Blocks,
  Calendar,
  ChevronDown,
  ChevronRight,
  Command,
  CreditCard,
  FolderKanban,
  Globe,
  Hash,
  Inbox,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Terminal,
  Users,
  X,
} from 'lucide-react';

export type NavItemData = {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: number | string;
  shortcut?: string;
  children?: NavItemData[];
};

export type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

const mockNavGroups: NavGroupData[] = [
  {
    items: [
      { id: 'search', title: 'Search', icon: Search, shortcut: '⌘K' },
      { id: 'home', title: 'Home', icon: LayoutDashboard },
      { id: 'inbox', title: 'Inbox', icon: Inbox, badge: 12 },
      { id: 'analytics', title: 'Analytics', icon: Activity },
    ],
  },
  {
    heading: 'Workspace',
    items: [
      {
        id: 'projects',
        title: 'Projects',
        icon: FolderKanban,
        children: [
          { id: 'p-active', title: 'Active', icon: Hash },
          { id: 'p-archived', title: 'Archived', icon: Hash },
        ],
      },
      { id: 'calendar', title: 'Calendar', icon: Calendar },
      {
        id: 'team',
        title: 'Team',
        icon: Users,
        children: [
          { id: 't-design', title: 'Designers', icon: Hash },
          { id: 't-eng', title: 'Engineering', icon: Hash },
          { id: 't-product', title: 'Product', icon: Hash },
        ],
      },
      {
        id: 'customers',
        title: 'Customers',
        icon: Globe,
        children: [
          { id: 'c-enterprise', title: 'Enterprise', icon: Hash },
          { id: 'c-smb', title: 'SMB', icon: Hash },
        ],
      },
      { id: 'finance', title: 'Finance', icon: CreditCard },
    ],
  },
  {
    heading: 'Developers',
    items: [
      { id: 'api', title: 'API Keys', icon: Terminal },
      { id: 'webhooks', title: 'Webhooks', icon: Blocks },
    ],
  },
];

const mockBottomItems: NavItemData[] = [
  { id: 'settings', title: 'Settings', icon: Settings, shortcut: '⌘,' },
  { id: 'logout', title: 'Log out', icon: LogOut },
];

function WorkspaceSwitcher({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect?: (workspace: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState('Acme Corp');
  const current = selected || internalSelected;
  const handleSelect = onSelect || setInternalSelected;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-2 mb-4 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-primary text-[13px] font-semibold text-primary-foreground shadow-sm">
            {current.charAt(0)}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] font-medium leading-none mb-1 text-foreground">{current}</span>
            <span className="text-[11px] leading-none text-muted-foreground">Pro Plan</span>
          </span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground/50" strokeWidth={1.5} />
      </button>

      {isOpen && (
        <>
          <button type="button" className="fixed inset-0 z-40 cursor-default" onClick={() => setIsOpen(false)} aria-label="Close workspace menu" />
          <div className="absolute left-0 top-[52px] z-50 flex w-full flex-col gap-0.5 rounded-lg border border-border/50 bg-card py-1 shadow-xl">
            {['Acme Corp', 'Personal Workspace', 'Client Sandbox'].map((workspace) => (
              <button
                type="button"
                key={workspace}
                onClick={() => {
                  handleSelect(workspace);
                  setIsOpen(false);
                }}
                className={`mx-1 rounded-md px-3 py-2 text-left text-[13px] transition-colors ${current === workspace ? 'bg-primary/10 font-medium text-primary' : 'text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                {workspace}
              </button>
            ))}
            <div className="mx-2 my-1 h-px bg-border/50" />
            <button type="button" className="mx-1 flex items-center gap-2 rounded-md px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:bg-black/5 dark:hover:bg-white/5">
              <span className="text-[16px] leading-none">+</span> Create Workspace
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function NavItem({
  item,
  activeId,
  onSelect,
  level = 0,
}: {
  item: NavItemData;
  activeId: string;
  onSelect: (id: string) => void;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = activeId === item.id;
  const hasChildren = Boolean(item.children?.length);
  const Icon = item.icon;

  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        onClick={() => (hasChildren ? setIsOpen((open) => !open) : onSelect(item.id))}
        className={`group flex w-full items-center justify-between rounded-[6px] py-[7px] pr-2.5 text-left transition-all duration-200 ${isActive ? 'bg-black/5 font-medium text-foreground dark:bg-white/10' : 'text-muted-foreground hover:bg-black/5 hover:text-foreground/90 dark:hover:bg-white/5'}`}
        style={{ paddingLeft: `${level * 12 + 10}px` }}
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-foreground' : 'text-muted-foreground/70'}`} strokeWidth={1.5} />
          <span className="truncate text-[13px] tracking-wide">{item.title}</span>
        </span>
        <span className="flex items-center gap-2">
          {item.shortcut && <kbd className="hidden rounded-[4px] border border-border/50 bg-background/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/60 group-hover:inline-flex">{item.shortcut}</kbd>}
          {item.badge && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-medium text-primary">{item.badge}</span>}
          {hasChildren && <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground/50 transition-transform ${isOpen ? 'rotate-90' : ''}`} strokeWidth={2} />}
        </span>
      </button>

      {hasChildren && isOpen && (
        <div className="relative mt-0.5 flex flex-col gap-0.5">
          <div className="absolute bottom-0 top-0 border-l border-black/5 dark:border-white/5" style={{ left: `${level * 12 + 17.5}px` }} />
          {item.children?.map((child) => <NavItem key={child.id} item={child} activeId={activeId} onSelect={onSelect} level={level + 1} />)}
        </div>
      )}
    </div>
  );
}

export function SidebarNav({
  className = '',
  activeId,
  onSelect,
  activeWorkspace,
  onWorkspaceSelect,
}: {
  className?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
  activeWorkspace?: string;
  onWorkspaceSelect?: (workspace: string) => void;
}) {
  const [internalId, setInternalId] = useState('home');
  const currentId = activeId ?? internalId;
  const handleSelect = onSelect || setInternalId;

  return (
    <div className={`flex h-full w-[260px] flex-col border-r border-border/50 bg-card/50 p-3 font-sans ${className}`}>
      <WorkspaceSwitcher selected={activeWorkspace} onSelect={onWorkspaceSelect} />
      <div className="mt-2 flex flex-1 flex-col gap-4 overflow-y-auto">
        {mockNavGroups.map((group, index) => (
          <div key={group.heading || index} className="flex flex-col gap-0.5">
            {group.heading && <span className="mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">{group.heading}</span>}
            {group.items.map((item) => <NavItem key={item.id} item={item} activeId={currentId} onSelect={handleSelect} />)}
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-0.5 border-t border-border/50 pt-4">
        {mockBottomItems.map((item) => <NavItem key={item.id} item={item} activeId={currentId} onSelect={handleSelect} />)}
      </div>
    </div>
  );
}

const allItems = [...mockNavGroups.flatMap((group) => group.items), ...mockBottomItems];
const flattenItems = (items: NavItemData[]): NavItemData[] => items.reduce<NavItemData[]>((flat, item) => {
  flat.push(item);
  if (item.children) flat.push(...flattenItems(item.children));
  return flat;
}, []);
const flatMockData = flattenItems(allItems);

export default function DashboardSidebarPreview() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState('home');
  const [activeWorkspace, setActiveWorkspace] = useState('Acme Corp');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const activeTitle = flatMockData.find((item) => item.id === activeId)?.title || 'Dashboard';

  const handleSelect = (id: string) => {
    if (id === 'search') {
      setIsSearchOpen(true);
      return;
    }
    setActiveId(id);
  };

  return (
    <div className="flex min-h-[700px] w-full items-center justify-center bg-background p-4 md:p-8">
      <div className="relative flex h-[700px] w-full max-w-5xl overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm ring-1 ring-black/5 dark:ring-white/5">
        <div className={`h-full shrink-0 overflow-hidden border-r border-border/50 bg-card/50 transition-all duration-300 ${isOpen ? 'w-[260px]' : 'w-0 border-none'}`}>
          <SidebarNav className="border-none bg-transparent" activeId={activeId} onSelect={handleSelect} activeWorkspace={activeWorkspace} onWorkspaceSelect={setActiveWorkspace} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col bg-black/[0.02] transition-all dark:bg-white/[0.02]">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/50 bg-card px-4">
            <div className="flex min-w-0 items-center gap-3">
              <button type="button" onClick={() => setIsOpen((open) => !open)} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5" aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}>
                {isOpen ? <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <PanelLeftOpen className="h-[18px] w-[18px]" strokeWidth={1.5} />}
              </button>
              <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                <span className="truncate">{activeWorkspace}</span><span>/</span><span className="truncate font-medium text-foreground">{activeTitle}</span>
              </div>
            </div>
            <div className="flex items-center gap-3"><div className="hidden h-8 w-64 rounded-md bg-black/5 md:block dark:bg-white/5" /><div className="h-8 w-8 rounded-full border border-primary/20 bg-primary/10" /></div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="mb-8 h-8 w-48 rounded-md bg-black/5 dark:bg-white/5" />
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2"><div className="h-32 rounded-xl border border-border/50 bg-card shadow-sm" /><div className="h-32 rounded-xl border border-border/50 bg-card shadow-sm" /></div>
            <div className="w-full rounded-xl border border-border/50 bg-card p-6 shadow-sm"><div className="mb-6 h-5 w-1/3 rounded-md bg-black/5 dark:bg-white/5" /><div className="mb-6 h-px w-full bg-border/50" /><div className="flex flex-col gap-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-12 w-full rounded-lg bg-black/5 dark:bg-white/5" />)}</div></div>
          </div>
        </div>
        {isSearchOpen && (
          <div className="absolute inset-0 z-50 flex items-start justify-center bg-background/40 px-4 pt-[15vh] backdrop-blur-sm">
            <button type="button" className="absolute inset-0 cursor-default" onClick={() => setIsSearchOpen(false)} aria-label="Close search" />
            <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
              <div className="flex items-center border-b border-border/50 px-4"><Search className="mr-3 h-[18px] w-[18px] text-muted-foreground/70" strokeWidth={1.5} /><input autoFocus className="flex-1 bg-transparent py-4 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/50" placeholder="Search projects, docs, or actions..." /><button type="button" onClick={() => setIsSearchOpen(false)} className="ml-3 rounded-md p-1 text-muted-foreground/70 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10" aria-label="Close search"><X className="h-[18px] w-[18px]" strokeWidth={1.5} /></button></div>
              <div className="flex flex-col items-center justify-center gap-2 px-2 py-8"><Command className="h-6 w-6 text-muted-foreground/30" strokeWidth={1.5} /><p className="text-[13px] font-medium text-muted-foreground">Type a command or search...</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
