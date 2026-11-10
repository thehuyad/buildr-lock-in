CREATE TABLE public.lockin_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('register', 'waitlist')),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  building text CHECK (building IS NULL OR char_length(building) <= 1500),
  link text CHECK (link IS NULL OR char_length(link) <= 300),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.lockin_applications TO anon;
GRANT INSERT ON public.lockin_applications TO authenticated;
GRANT ALL ON public.lockin_applications TO service_role;

ALTER TABLE public.lockin_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
ON public.lockin_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);