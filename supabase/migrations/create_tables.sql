-- Create users table
create table if not exists public.users (
    id uuid default auth.uid() primary key,
    email text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on users table
alter table public.users enable row level security;

-- Create policy to allow users to read their own data
create policy "Users can read their own data"
    on public.users
    for select
    using (auth.uid() = id);

-- Create trades table
create table if not exists public.trades (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.users(id) not null,
    symbol text not null,
    side text not null check (side in ('BUY', 'SELL')),
    quantity numeric not null check (quantity > 0),
    price numeric not null check (price >= 0),
    timestamp timestamp with time zone not null,
    broker text not null,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on trades table
alter table public.trades enable row level security;

-- Create policies for trades table
create policy "Users can read their own trades"
    on public.trades
    for select
    using (auth.uid() = user_id);

create policy "Users can insert their own trades"
    on public.trades
    for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own trades"
    on public.trades
    for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own trades"
    on public.trades
    for delete
    using (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- Create triggers for updated_at
create trigger handle_users_updated_at
    before update on public.users
    for each row
    execute procedure public.handle_updated_at();

create trigger handle_trades_updated_at
    before update on public.trades
    for each row
    execute procedure public.handle_updated_at(); 