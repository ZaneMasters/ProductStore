import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dfuomupheqfmacozeznv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdW9tdXBoZXFmbWFjb3plem52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MjQzODUsImV4cCI6MjAzMjAwMDM4NX0.R9R8JX-2LTClAA2ZL-BOWIL5i3R46r6XX-0U78eMNMw';
export const supabase = createClient(supabaseUrl, supabaseKey);
